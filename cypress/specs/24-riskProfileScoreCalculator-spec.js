const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('24. Onboarding Portal - Risk Profile Score Calculator', () => {


    /* beforeEach(function () {
         Cypress.Cookies.debug(true)
         Cypress.Cookies.defaults({
             preserve: /secure|ntercom|XSRF-TOKEN|__hssc|hubspotutk|__hstc|_fbp|cognito|__Secure-next-auth.callback-url|__Secure-next-auth.session-token|__Host-next-auth.csrf-token/,
         })
     });*/

    before(function () {
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

    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
    })

    it('2. Create new Personal Super Account', function () {
        ui.onboarding
            .click_create_new_investment_account()
            .click_super_type()
            .click_personal_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.investmentStepMessages)
            .verify_investment_choice_page()
        cy.saveLocalStorage();
    })

    it('3. Complete Investment Choice', function () {
        ui.onboarding.click_limited_advice_button()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
    })

    
})
