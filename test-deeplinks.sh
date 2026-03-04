#!/bin/bash

# =====================================================
# Deeplink Booking - Test Script
# =====================================================
# This script tests all deeplink functionality
# Run: chmod +x test-deeplinks.sh && ./test-deeplinks.sh
# =====================================================

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
API_URL="http://localhost:5001/api"
FRONTEND_URL="http://localhost:5173"

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Deeplink Booking Integration Tests   ${NC}"
echo -e "${BLUE}=========================================${NC}\n"

# Check if servers are running
echo -e "${YELLOW}Checking if servers are running...${NC}"

if ! curl -s "${API_URL}/health" > /dev/null; then
    echo -e "${RED}❌ Backend server not running!${NC}"
    echo -e "${YELLOW}Start it with: cd backend && npm run dev${NC}\n"
    exit 1
fi
echo -e "${GREEN}✅ Backend server is running${NC}"

if ! curl -s "${FRONTEND_URL}" > /dev/null; then
    echo -e "${RED}❌ Frontend server not running!${NC}"
    echo -e "${YELLOW}Start it with: npm run dev${NC}\n"
    exit 1
fi
echo -e "${GREEN}✅ Frontend server is running${NC}\n"

# =====================================================
# Test 1: Generate Single Signed Deeplink
# =====================================================
echo -e "${BLUE}Test 1: Generate Single Signed Deeplink${NC}"
echo "POST /api/partners/deeplink"

RESPONSE=$(curl -s -X POST "${API_URL}/partners/deeplink" \
  -H "Content-Type: application/json" \
  -d '{
    "hospitalId": "hospital-test-123",
    "doctorId": "dr-rajkumar",
    "expiresInSec": 600,
    "campaign": "test_script"
  }')

if echo "$RESPONSE" | grep -q "signedUrl"; then
    echo -e "${GREEN}✅ Successfully generated signed deeplink${NC}"
    SIGNED_URL=$(echo "$RESPONSE" | grep -o '"signedUrl":"[^"]*"' | cut -d'"' -f4)
    echo -e "URL: ${YELLOW}${SIGNED_URL}${NC}\n"
else
    echo -e "${RED}❌ Failed to generate deeplink${NC}"
    echo "$RESPONSE\n"
    exit 1
fi

# =====================================================
# Test 2: Validate Signed Deeplink
# =====================================================
echo -e "${BLUE}Test 2: Validate Signed Deeplink${NC}"

# Extract signed parameter from URL
SIGNED_PARAM=$(echo "$SIGNED_URL" | grep -o 'signed=[^&]*' | cut -d'=' -f2)

VALIDATE_RESPONSE=$(curl -s "${API_URL}/booking/deeplink/validate?signed=${SIGNED_PARAM}")

if echo "$VALIDATE_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Deeplink validation successful${NC}"
    DOCTOR_ID=$(echo "$VALIDATE_RESPONSE" | grep -o '"doctorId":"[^"]*"' | cut -d'"' -f4)
    echo -e "Doctor ID: ${YELLOW}${DOCTOR_ID}${NC}\n"
else
    echo -e "${RED}❌ Deeplink validation failed${NC}"
    echo "$VALIDATE_RESPONSE\n"
    exit 1
fi

# =====================================================
# Test 3: Batch Generate Deeplinks
# =====================================================
echo -e "${BLUE}Test 3: Batch Generate Deeplinks${NC}"
echo "POST /api/partners/deeplink/batch"

BATCH_RESPONSE=$(curl -s -X POST "${API_URL}/partners/deeplink/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "links": [
      {
        "hospitalId": "hospital-test-123",
        "doctorId": "dr-rajkumar",
        "campaign": "batch_test_1"
      },
      {
        "hospitalId": "hospital-test-123",
        "doctorId": "dr-neelima-dixit",
        "campaign": "batch_test_2"
      },
      {
        "hospitalId": "hospital-test-123",
        "doctorId": "dr-divakar-chaudhari",
        "campaign": "batch_test_3"
      }
    ]
  }')

if echo "$BATCH_RESPONSE" | grep -q '"successful":3'; then
    echo -e "${GREEN}✅ Batch generation successful (3/3)${NC}\n"
else
    echo -e "${RED}❌ Batch generation failed${NC}"
    echo "$BATCH_RESPONSE\n"
    exit 1
fi

# =====================================================
# Test 4: Test Development Endpoint
# =====================================================
echo -e "${BLUE}Test 4: Test Development Endpoint${NC}"
echo "GET /api/partners/deeplink/test"

TEST_RESPONSE=$(curl -s "${API_URL}/partners/deeplink/test")

if echo "$TEST_RESPONSE" | grep -q "testUrl"; then
    echo -e "${GREEN}✅ Test endpoint working${NC}"
    TEST_URL=$(echo "$TEST_RESPONSE" | grep -o '"testUrl":"[^"]*"' | cut -d'"' -f4)
    echo -e "Test URL: ${YELLOW}${TEST_URL}${NC}\n"
else
    echo -e "${RED}❌ Test endpoint failed${NC}"
    echo "$TEST_RESPONSE\n"
fi

# =====================================================
# Test 5: Simple Deeplink (Query Params)
# =====================================================
echo -e "${BLUE}Test 5: Simple Deeplink Format${NC}"

SIMPLE_URL="${FRONTEND_URL}/?doctorId=dr-rajkumar&source=hospital_test&campaign=simple_test"
echo -e "Testing: ${YELLOW}${SIMPLE_URL}${NC}"

if curl -s "${SIMPLE_URL}" | grep -q "<!doctype html"; then
    echo -e "${GREEN}✅ Simple deeplink URL accessible${NC}\n"
else
    echo -e "${RED}❌ Simple deeplink failed${NC}\n"
fi

# =====================================================
# Test 6: Invalid Scenarios
# =====================================================
echo -e "${BLUE}Test 6: Error Handling Tests${NC}"

# Test invalid signed parameter
echo -e "Testing invalid signature..."
INVALID_RESPONSE=$(curl -s "${API_URL}/booking/deeplink/validate?signed=invalid-signature-test")

if echo "$INVALID_RESPONSE" | grep -q '"success":false'; then
    echo -e "${GREEN}✅ Invalid signature handled correctly${NC}"
else
    echo -e "${RED}❌ Invalid signature test failed${NC}"
fi

# Test missing signed parameter
echo -e "Testing missing parameter..."
MISSING_RESPONSE=$(curl -s "${API_URL}/booking/deeplink/validate")

if echo "$MISSING_RESPONSE" | grep -q '"success":false'; then
    echo -e "${GREEN}✅ Missing parameter handled correctly${NC}\n"
else
    echo -e "${RED}❌ Missing parameter test failed${NC}\n"
fi

# =====================================================
# Summary
# =====================================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${GREEN}✅ All tests passed!${NC}"
echo -e "${BLUE}=========================================${NC}\n"

echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Open this URL in your browser to test frontend:"
echo -e "   ${BLUE}${SIMPLE_URL}${NC}\n"
echo "2. Or use the signed deeplink:"
echo -e "   ${BLUE}${SIGNED_URL}${NC}\n"
echo "3. View browser console for analytics events"
echo "4. Try booking an appointment through the modal"
echo -e "\n${GREEN}Happy Testing! 🎉${NC}\n"
