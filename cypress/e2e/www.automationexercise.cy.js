
describe('automationexercise.com', () => {
  beforeEach(() => {
    //Launch browser
    2. //Navigate to url 'http://automationexercise.com'
    cy.visit('/')
    3. //Verify that home page is visible successfully
    cy.contains("Full-Fledged practice website for Automation Engineers").should("be.visible")
  });
  it('Test Case 10: Verify Subscription in home page', () => {
    4. //Scroll down to footer
    //cy.get('#footer').click();
    //cy.scrollTo('bottom');
    5. //Verify text 'SUBSCRIPTION'
    cy.get('#footer').get('.single-widget > h2').should('have.text', 'Subscription')
    6. //Enter email address in input and click arrow button
    cy.get('#susbscribe_email').type('zoo@gmail.com')
    cy.get('#subscribe').click();
    7. //Verify success message 'You have been successfully subscribed!' is visible
    cy.get('.alert-success').contains('You have been successfully subscribed!')

  })
  it('Test Case 12: Add Products in Cart', () => {
    
    //4. Click 'Products' button
    //cy.get('.shop-menu > .nav > :nth-child(2) > a').should('include.text','Products').click();
    cy.get('a[href="/products"]').should('include.text','Products').click();
    //5. Hover over first product and click 'Add to cart'
    cy.PriceSave(0);
    cy.get('.col-sm-4 > .product-image-wrapper > .single-products >').first().trigger('mouseover').find('.add-to-cart').click()
    //6. Click 'Continue Shopping' button
    cy.get('.modal-content > .modal-footer > .btn').click()
    //7. Hover over second product and click 'Add to cart'
    cy.PriceSave(1);
    cy.get('.col-sm-4 > .product-image-wrapper > .single-products >').eq(2).trigger('mouseover').find('.add-to-cart').click()
    //8. Click 'View Cart' button
    cy.get('.modal-content > .modal-body > .text-center >').contains('View Cart').click()
    //9. Verify both products are added to Cart
    cy.get('#cart_info_table > tbody > tr').should('have.length','2')
    //10. Verify their prices, quantity and total price
    cy.CheckPrices()
  })
  it('Test Case 16: Place Order: Login before Checkout',()=>{
    
    // 4. Click 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    // 5. Fill email, password and click 'Login' button
    cy.Authorize();
    // 6. Verify 'Logged in as username' at top
    cy.get(':nth-child(10) > a').contains('zoo')
    // 7. Add products to cart
    cy.get('a[data-product-id="2"]').first().click();
    // 8. Click 'Cart' button
    //cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    cy.get('a[href="/view_cart"]').first().click();
    // 9. Verify that cart page is displayed
    cy.url().should('include', 'view_cart');
    // 10. Click Proceed To Checkout
    //cy.get('.btn > .btn-default > .check_out').should('have.text','Proceed To Checkout').click()
    cy.get('.col-sm-6 > .btn').click()
    // 11. Verify Address Details and Review Your Order
   cy.Verify()
    // 12. Enter description in comment text area and click 'Place Order'
    cy.get('[name="message"]').type("Checkout Description!!!")
    cy.get('a[href="/payment"]').should('have.text','Place Order').click();
    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.Payment()
    // 14. Click 'Pay and Confirm Order' button
    cy.get('[data-qa="pay-button"]').click()
    // 15. Verify success message 'Your order has been placed successfully!'
    //cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
    //cy.get('#success_message').contains('Your order has been placed successfully!')
    //cy.wait(5000)
    //cy.pause();
    //cy.contains('Congratulations! Your order has been confirmed!');

  })
})