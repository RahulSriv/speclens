# Checkout Flow — Product Specification

## Overview
Users can purchase items from their cart using a streamlined checkout process. The system supports multiple payment methods and delivers order confirmations after purchase.

## Cart
Users can add items to their cart while browsing. The cart persists between sessions. If an item goes out of stock after being added to the cart, the user is notified.

## Checkout Steps

### Step 1: Address
The user enters or selects a shipping address. Returning users can choose from saved addresses. The system validates the address before proceeding.

### Step 2: Shipping
Available shipping options are displayed with estimated delivery times and costs. The user selects one before continuing.

### Step 3: Payment
Users can pay with credit card, debit card, or saved payment methods. Payment details are validated before the order is placed. Failed payments show an error.

### Step 4: Confirmation
After a successful payment, the user sees an order confirmation and receives a confirmation email. The order appears in their order history.

## Pricing
Prices are shown in the user's local currency. Discounts are applied automatically if the user has a valid promo code. Tax is calculated at checkout.

## Returns
Users can return items within a reasonable period. Refunds are processed to the original payment method.
