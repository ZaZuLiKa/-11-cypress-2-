import UserData from '../fixtures/UserInfo.json'
Cypress.Commands.add('Authorize',()=>{
    cy.get('[data-qa="login-email"]').type(UserData.Authorization.email)
    cy.get('[data-qa="login-password"]').type(UserData.Authorization.password)
    cy.get('[data-qa="login-button"]').click()
})
Cypress.Commands.add('Payment',()=>{
    cy.get('[data-qa="name-on-card"]').type(UserData.PaymentCredential.CardHolder)
    cy.get('[data-qa="card-number"]').type(UserData.PaymentCredential.CardNumber)
    cy.get('[data-qa="cvc"]').type(UserData.PaymentCredential.CVC)
    cy.get('[data-qa="expiry-month"]').type(UserData.PaymentCredential.ExpireMonth)
    cy.get('[data-qa="expiry-year"]').type(UserData.PaymentCredential.ExpireYear)
})
Cypress.Commands.add('Verify',()=>{
    //Delivery
    cy.get('#address_delivery > .address_firstname').should('have.text',UserData.PersonalInfo.FullName)
    cy.get('#address_delivery > :nth-child(3)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_delivery > :nth-child(4)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_delivery > :nth-child(5)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_delivery > .address_city').contains(UserData.PersonalInfo.address)
    cy.get('#address_delivery > .address_country_name').should('have.text',UserData.PersonalInfo.country)
    cy.get('#address_delivery > .address_phone').should('have.text',UserData.PersonalInfo.phone)
    //Billing
    cy.get('#address_invoice > .address_firstname').should('have.text',UserData.PersonalInfo.FullName)
    cy.get('#address_invoice > :nth-child(3)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_invoice > :nth-child(4)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_invoice > :nth-child(5)').should('have.text',UserData.PersonalInfo.name)
    cy.get('#address_invoice > .address_city').contains(UserData.PersonalInfo.address)
    cy.get('#address_invoice > .address_country_name').should('have.text',UserData.PersonalInfo.country)
    cy.get('#address_invoice > .address_phone').should('have.text',UserData.PersonalInfo.phone)
})
let prices = [];  // ფასების მასივი
Cypress.Commands.add('PriceSave', (num) => {
    cy.get('.productinfo > h2')
        .eq(num)
        .invoke('text') //ტექსტის ამოღება თეგიდან
        .then(price => {
            //const Temp = price.replace(/[^\d]/g, ''); //სტრინგიდან სიმბოლოების ამოღება და რიცხვის დატოვება
            //prices.push(Temp);//სუფთა რიცხვის ჩამატება
            prices.push(price)
        });

    //cy.log('Prices:', prices);
    //cy.pause();  
});

Cypress.Commands.add('CheckPrices', () => {
    for (let i = 1; i <= prices.length; i++) {
        cy.get(`#product-${i} > .cart_price > p`).should('have.text', prices[i - 1])
        cy.get(`#product-${i} > .cart_quantity > .disabled`).should('have.text', '1')
        cy.get(`#product-${i} > .cart_total > .cart_total_price`).should('have.text', prices[i - 1])
        // let cnt;
        // cy.log(cy.get(`#product-${i} > .cart_quantity > .disabled`).should('have.text', '1'));
        //cy.get(`#product-${i} > .cart_quantity > .disabled`).invoke('text').then((quantity) => {cnt = parseInt(quantity, 10);});
        //cy.get(`#product-${i} > .cart_total > .cart_total_price`).should('have.text', prices[i - 1]*cnt)
        
    }
})

