const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('16. Nucleus Wealth Wordpress Site', () => {



    beforeEach(function () {
        /*Cypress.Cookies.debug(true)
        cy.preserveCookieOnce(
            'secure',
            'ntercom',
            'XSRF-TOKEN',
            '__hssc',
            'hubspotutk',
            '__hstc',
            '_fbp',
            'cognito',
            '__Secure-next-auth.callback-url',
            '__Secure-next-auth.session-token',
            '__Host-next-auth.csrf-token',
        )*/
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })



    it('1. Visit Production Site', function () {
        ui.production.open_production_url()
            .verify_production_home_page()
    })

    it('2. Visit Investment Options', function () {

        ui.production.click_option_from_navbar('Investment Options')
         //   .verify_option_from_navbar('investment-options', 'Investment Options')
    })

    it('3. Visit Ethical Investing', function () {
        ui.production.click_option_from_navbar('Ethical Investing')
            .verify_option_from_navbar('ethical', 'NUCLEUS ETHICAL')
    })

    it('4. Visit Superannuation', function () {
        ui.production.click_option_from_navbar('Superannuation')
            .verify_option_from_navbar('super', 'NUCLEUS SUPER')
    })

    it('5. Visit Direct Indexing', function () {
        ui.production.click_option_from_navbar('Direct Indexing')
            .verify_option_from_navbar('directindexing', 'Nucleus Direct Indexing – ETFs 2.0')
    })

    it('6. Visit Resources', function () {
        ui.production.click_option_from_navbar('Resources')
            .verify_option_from_navbar('content', 'Content')
    })

    it('7. Visit Contact', function () {
        ui.production.click_option_from_navbar('Contact')
            .verify_option_from_navbar('contact', 'Contact')
    })

    it('8. Visit Member Login', function () {
        ui.production.click_option_from_navbar2('Member Login')
        cy.wait(5000)
        ui.login.verify_login_menu()
        cy.go('back')
        cy.go('back')
    })

    it('9. Visit Get Started', function () {
        ui.production.click_option_from_navbar2('Get Started')
        cy.wait(5000)
        ui.login.verify_login_menu()
            .click_sign_up_button()
            .verify_sign_up_login_menu(D.newUser)
    })

    it('10. Check wordpress image uploaded date', function () {
        cy.visit('https://nucleuswealth.com/wp-content/uploads/2022/12/')
        ui.production.verify_uploaded_date_for_documents()
    })


})
