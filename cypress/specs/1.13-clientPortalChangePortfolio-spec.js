const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Client Portal - Change Portfolio', () => {
    let accountNo;
   /* beforeEach(function () {
      /!*  Cypress.Cookies.debug(true)
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
        )*!/
    })*/

    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        cy.visit('https://testwebserver.nucleuswealth.com/onboarding/5538/success')
        // ui.onboarding.store_current_account_number(accountNo)
        cy.get('[data-test="onboarding-rightHeader-title"]').invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.saveLocalStorage()
        })
    })
    it('1. Direct user to “Your Account(s)” page', function () {

            ui.login.open_base_url()
                .verify_login_menu(D.user)
            ui.login.enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            ui.clientPortal.click_your_accounts_link()
                .verify_your_accounts_page()

    })



    it('2. Direct user to “Investment Choice”', function () {

            ui.clientPortal.click_change_portfolio_button(accountNo)
          //  ui.onboarding.go_through_tour_steps(C.stepMessages)
            ui.clientPortal.verify_investment_choice_link()

    })




    it('3. Direct user to “Build Your Portfolio”', function () {

            ui.onboarding.click_self_directed_button()
            ui.clientPortal.verify_self_directed_icon_is_highlighted()
            ui.onboarding.select_all_checkboxes(5)
            ui.onboarding.click_Save_and_Continue_button()

    })


    it('4. Complete Build Your Portfolio', function () {

            ui.clientPortal.verify_build_your_portfolio_link()
                .complete_build_your_portfolio()
            ui.onboarding.click_Save_and_Continue_button()
            ui.clientPortal.verify_final_review_link()


    })


    it('5. Check Final Review', function () {

            ui.clientPortal.verify_final_review_page()
                .verify_download_button_for_documents(2)
            ui.onboarding.verify_Documents_available_for_download([
                'Record of Engagement',
                'Praemium SMA PDS and Investment Guide extract'
            ])

    })


    it('6. Submit Change', function () {

          /*  if (Cypress.env('cypressRunnerLocal') === true) {
                ui.app.clear_gmail_inbox()
            }*/
            ui.clientPortal.click_submit_changes_button()
                .verify_account_dashboard()
            // cy.wait(25000)
            //  ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.accountChanges)


    })



})
