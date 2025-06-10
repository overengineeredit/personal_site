#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to log with color
log() {
    echo -e "${GREEN}$1${NC}"
}

error() {
    echo -e "${RED}$1${NC}"
}

# Function to cleanup
cleanup() {
    log "🧹 Cleaning up..."
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null || true
    fi
    exit
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

log "🚀 Starting build validation tests..."

# Setup environment
log "📝 Setting up test environment..."

# Create test environment file
log "Creating .env file..."
cat > .env << EOL
PORT=3000
SITE_NAME="Personal Site"
FOOTER_NAME="Your Name"
NODE_ENV="test"
GTM_ID="GTM-TEST123"
EOL

# Clean install
log "📦 Cleaning node_modules and installing dependencies..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
fi
if [ -f "package-lock.json" ]; then
    rm package-lock.json
fi

# Install only production dependencies
npm install --only=prod --no-audit --no-fund || {
    error "❌ Failed to install dependencies"
    exit 1
}

# Start server for testing
log "🌐 Starting server..."
npm start &
SERVER_PID=$!

# Wait for server to start and check if it's running
log "⏳ Waiting for server to start..."
for i in {1..10}; do
    if curl -s http://localhost:3000 >/dev/null; then
        break
    fi
    if [ $i -eq 10 ]; then
        error "❌ Server failed to start"
        exit 1
    fi
    sleep 1
done

log "🔎 Testing page accessibility..."
for page in "/" "/resume" "/blog"; do
    log "  Testing $page..."
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page")
    if [ "$STATUS" != "200" ]; then
        error "❌ Error: Page $page returned status $STATUS"
        exit 1
    fi
    log "  ✅ $page returned 200"
done

# Test 404 handling
log "  Testing 404 handling..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/nonexistent")
if [ "$STATUS" != "404" ]; then
    error "❌ Error: 404 page not working correctly"
    exit 1
fi
log "  ✅ 404 handling works correctly"

log "🏷️ Validating GTM implementation..."
# Check GTM head code
if ! grep -q "googletagmanager.com/gtm.js" views/partials/google-tag-manager-head.mustache; then
    error "❌ Error: GTM head code not found"
    exit 1
fi
log "  ✅ GTM head code found"

# Check GTM body code
if ! grep -q "googletagmanager.com/ns.html" views/partials/google-tag-manager-body.mustache; then
    error "❌ Error: GTM body code not found"
    exit 1
fi
log "  ✅ GTM body code found"

log "📱 Validating meta tags and SEO..."
RESPONSE=$(curl -s "http://localhost:3000")

# Check required meta tags
for TAG in "viewport" "description" "og:type" "og:title" "og:description" "twitter:card"; do
    log "  Checking $TAG..."
    if ! echo "$RESPONSE" | grep -q "<meta.*$TAG"; then
        error "❌ Error: Missing meta tag: $TAG"
        exit 1
    fi
    log "  ✅ $TAG found"
done

log "📁 Validating content structure..."
# Check required template files
for FILE in "views/index.mustache" "views/resume.mustache" "views/blog.mustache" "views/error.mustache" "views/404.mustache"; do
    log "  Checking $FILE..."
    if [ ! -f "$FILE" ]; then
        error "❌ Error: Missing template file: $FILE"
        exit 1
    fi
    log "  ✅ $FILE exists"
done

# Check required partial files
for FILE in "views/partials/google-tag-manager-head.mustache" "views/partials/google-tag-manager-body.mustache" "views/partials/header.mustache" "views/partials/footer.mustache"; do
    log "  Checking $FILE..."
    if [ ! -f "$FILE" ]; then
        error "❌ Error: Missing partial file: $FILE"
        exit 1
    fi
    log "  ✅ $FILE exists"
done

log "🔗 Validating navigation structure..."
# Check navigation links in header
HEADER=$(cat views/partials/header.mustache)
for LINK in "href=\"/\"" "href=\"/resume\"" "href=\"/blog\""; do
    log "  Checking $LINK..."
    if ! echo "$HEADER" | grep -q "$LINK"; then
        error "❌ Error: Missing navigation link: $LINK"
        exit 1
    fi
    log "  ✅ $LINK found"
done

log "✨ All build validation tests passed!" 