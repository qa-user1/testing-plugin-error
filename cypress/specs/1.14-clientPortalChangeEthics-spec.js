const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('Client Portal - Change Ethics/Exclusions', () => {


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



    it('1. Direct user to “Your Account(s)” page', function () {
        if (Cypress.env('skipError')) {
            cy.log('Skipping test due to error in config file')
            return;
        }
        ui.login.open_base_url()
            .verify_login_menu(D.user)
        ui.login.enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
        ui.clientPortal.click_your_accounts_link()
            .verify_your_accounts_page()

    })

    it('2. Direct user to “Ethical Overlay”', function () {
        if (Cypress.env('skipError')) {
            cy.log('Skipping test due to error in config file')
            return;
        }

        ui.clientPortal.click_ethics_section()
            ui.onboarding.verify_ethical_overlay_page2()

    })

    it('3. Complete Ethical Overlay', function () {
        if (Cypress.env('skipError')) {
            cy.log('Skipping test due to error in config file')
            return;
        }

        ui.clientPortal.check_or_uncheck_nuclear_power()
        ui.onboarding.click_Save_and_Continue_button()

    })

    it('4. Check Final Review', function () {
        if (Cypress.env('skipError')) {
            cy.log('Skipping test due to error in config file')
            return;
        }

        ui.clientPortal.verify_final_review_page()
            .expand_current_ethics()
            .expand_new_ethics()
            .verify_number_of_selected_options_is_different_in_Current_and_New_Ethics()
            .verify_download_button_for_documents(2)
        ui.onboarding.verify_Documents_available_for_download([
            //'Statement of Advice',
            'Record of Engagement',
            'Praemium SMA PDS and Investment Guide extract'
        ])

    })

    it('5. Submit Change', function () {
        if (Cypress.env('skipError')) {
            cy.log('Skipping test due to error in config file')
            return;
        }

        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
        ui.clientPortal.click_submit_changes_button()
            .verify_account_dashboard()
      //  cy.wait(55000)
      //  ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.changeEthics)

    })


})
