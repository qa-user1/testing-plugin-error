const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const S = require('../fixtures/settings')
const {currentDate} = require("../support/e2e-helper");

context('Create Test User on Live Portal', () => {

    beforeEach(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })

    it('6. Create a new user for Macro business', function () {
        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
        S.baseUrl = 'https://mb.nucleuswealth.com/register'
        ui.login.open_base_url()
            .verify_login_menu()
            .click_sign_up_button()
        D.newUserLivePortal.email = 'testing+' + 'macrobusiness' + currentDate + '/' + D.getNewRandomNumber() + '@nucleuswealth.com'
        ui.login.enter_credentials_for_sign_up(D.newUserLivePortal)
            .click_submit_sign_up_button()
        ui.onboarding.verify_account_selection()
        //cy.wait(35000)
        C.emailTemplates.signUpNewUser.subject = 'Welcome to Nucleus Wealth'
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.signUpNewUser)
    })
})