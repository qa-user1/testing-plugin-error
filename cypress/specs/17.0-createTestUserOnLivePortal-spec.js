const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const S = require('../fixtures/settings')
const {currentDate} = require("../support/e2e-helper");

context('17.0 Create Test User on Live Portal', () => {

    beforeEach(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })

    it('1. Create a new user on Live Portal', function () {
      //  if (Cypress.env('cypressRunnerLocal') === true) {
      //      ui.app.clear_gmail_inbox()
      //  }
        S.baseUrl = 'https://portal.nucleuswealth.com/register'
        ui.login.open_base_url()
            .verify_login_menu()
            .click_sign_up_button()
            .enter_credentials_for_sign_up_on_live_portal(D.newUserLivePortal)
            .click_submit_create_account_button()
        ui.onboarding.verify_account_selection()
      //  cy.wait(25000)
        C.emailTemplates.signUpNewUser.subject = 'Welcome to Nucleus Wealth'
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.signUpNewUser)
    })

    it('2. Subscribe to Nucleus Wealth mailing list', function () {
        ui.production.open_production_url()
            .verify_production_home_page()
            .click_subscribe_button()
            .verify_hubspot_form()
            .enter_email_on_HS_form('testing+' + 'website' + currentDate + '@nucleuswealth.com')
            .click_subscribe()
            .verify_text_is_visible('Thanks for subscribing to email updates from nucleus wealth')
    })

    it('3. Subscribe user via Investment Suitability Calculator', function () {
        S.baseUrl = 'https://nucleuswealth.com/investment-suitability-calculator'
        ui.production.open_base_url()
            .verify_calculator_page()
            .answerAllQuestionsWithSpecificOption(7, 1)
            .enter_First_Name('testing')
            .click_OK_on_Calculator_wizard()
            .enter_Last_Name('testing')
            .click_OK_on_Calculator_wizard()
            .enter_email_on_last_question('testing+' + 'suitabilitycalculator' + currentDate + '@nucleuswealth.com')
            .click_submit_on_Calculator_wizard()
            .verify_text_is_visible('Investment Suitability')
    })

    it('4. Subscribe user via Suitability Calculator', function () {
        S.baseUrl = 'https://nucleuswealth.com/ethical-investment-calculator'
        ui.production.open_base_url()
            .verify_ethical_calculator_page()
            .click_get_started_button()
            .click_next()
            .click_next()
            .enter_gender_and_date_of_birth()
            .click_next()
            .enter_First_Name('testing')
            .click_OK_on_Calculator_wizard()
            .enter_Last_Name('testing')
            .click_OK_on_Calculator_wizard()
            .enter_email_on_last_question('testing+' + 'ethicalcalculator' + currentDate + '@nucleuswealth.com')
            .click_submit_on_Calculator_wizard()
            .verify_text_is_visible('How do your ethics compare?')
    })




})