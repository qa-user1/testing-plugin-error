const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const S = require('../fixtures/settings')
const {currentDate} = require("../support/e2e-helper");

context('17.1 Create Test User on Live Portal', () => {

    beforeEach(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })

    it('5. Create a new user for Walk The World', function () {
       // if (Cypress.env('cypressRunnerLocal') === true) {
       //     ui.app.clear_gmail_inbox()
       // }
        S.baseUrl = 'https://walktheworld.nucleuswealth.com/register'
        ui.login.open_base_url()
            .verify_login_menu()
            .click_sign_up_button()
        D.newUserLivePortal.email = 'testing+' + 'walktheworld' + currentDate + '/' + D.getNewRandomNumber() + '@nucleuswealth.com'
        ui.login.enter_credentials_for_sign_up_for_walk_the_world(D.newUserLivePortal)
            .click_sign_up_confirm_button()
        ui.onboarding.verify_account_selection()
      //  cy.wait(55000)
        C.emailTemplates.signUpNewUser.subject = 'Welcome to Nucleus Wealth'
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.signUpNewUser)
    })

})