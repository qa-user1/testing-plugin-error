const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Client Portal - Change Portfolio', () => {

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
        try {
            ui.login.open_base_url()
                .verify_login_menu(D.user)
            ui.login.enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            ui.clientPortal.click_your_accounts_link()
                .verify_your_accounts_page()
        } catch (error) {
            if (error.code === 'read ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }
    })



    it('2. Direct user to “Investment Choice”', function () {
        try {
            ui.clientPortal.click_change_portfolio_button()
            ui.onboarding.go_through_tour_steps(C.stepMessages)
            ui.clientPortal.verify_investment_choice_link()
        } catch (error) {
            if (error.code === 'read ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }
    })




    it('3. Direct user to “Build Your Portfolio”', function () {
        try {
            ui.onboarding.click_self_directed_button()
            ui.clientPortal.verify_self_directed_icon_is_highlighted()
            ui.onboarding.select_all_checkboxes(5)
            ui.onboarding.click_Save_and_Continue_button()
        } catch (error) {
            if (error.code === 'ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }

    })


    it('4. Complete Build Your Portfolio', function () {
        try {
            ui.clientPortal.verify_build_your_portfolio_link()
                .complete_build_your_portfolio()
            ui.onboarding.click_Save_and_Continue_button()
            ui.clientPortal.verify_final_review_link()
        } catch (error) {
            if (error.code === 'ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }

    })


    it('5. Check Final Review', function () {
        try {
            ui.clientPortal.verify_final_review_page()
                .verify_download_button_for_documents(2)
            ui.onboarding.verify_Documents_available_for_download([
                'Record of Engagement',
                'Praemium SMA PDS and Investment Guide extract'
            ])
        } catch (error) {
            if (error.code === 'ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }

    })


    it('6. Submit Change', function () {
        try {
            if (Cypress.env('cypressRunnerLocal') === true) {
                ui.app.clear_gmail_inbox()
            }
            ui.clientPortal.click_submit_changes_button()
                .verify_account_dashboard()
            // cy.wait(25000)
            //  ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.accountChanges)

        } catch (error) {
            if (error.code === 'ECONNRESET') {
                cy.log('Skipping test due to ECONNRESET error')
                return;

            }
        }

    })



})
