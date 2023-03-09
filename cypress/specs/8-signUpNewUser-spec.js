const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const {currentDate} = require("../support/e2e-helper");

context('Sign Up new user', () => {



    beforeEach(function () {
        Cypress.Cookies.debug(true)
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
        )
    })



    it('1. Create a new user', function () {
        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
            ui.login.open_base_url()
                .verify_login_menu(D.user)
                .click_sign_up_button()
                .verify_sign_up_login_menu(D.newUser)
                .enter_credentials_for_sign_up(D.newUser)
                .click_submit_sign_up_button()
        ui.onboarding.verify_account_selection()
        cy.wait(45000)
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.signUpNewUser)

    })

})