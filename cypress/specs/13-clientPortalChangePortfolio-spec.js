const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('13. Client Portal - Change Portfolio', () => {
    let accountNo;

    /*beforeEach(function () {
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
    })*/

    before(function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.click_create_new_investment_account()
            .click_non_super_type()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.investmentStepMessages)
        cy.saveLocalStorage()
        ui.onboarding.click_self_directed_button()
            .select_all_checkboxes(5)
            .click_Save_and_Continue_button()
            .go_through_tour_steps(C.buildYourPortfolioStepMsgs)
        ui.onboarding.expand_card(0)
            .expand_card(1)
            .expand_card(2)
            .enter_values_on_BYP_input_fields(D.buildYouPortfolioFields)
            .clear_values_on_BYP_input_fields()
            .enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
            .click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
           // .click_Save_and_Continue_button()


        ui.onboarding.click_sidebar_option('Investment Choice')
            .click_limited_advice_button()
            .go_through_tour_steps(C.investmentStepMessages)
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .answerAllQuestionsWithSameOption(13, 2)
        ui.onboarding.enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
            .verify_screen_and_tilts_page()
            .click_Save_and_Continue_button()
            .verify_review_page()
            .click_Save_and_Continue_button()
            .remove_existing_applicant()
            .add_new_applicant()
            .click_submit_applicant_button()
            .enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            //.verify_your_identity()
            .upload_and_submit_document_for_verification('Upload an ID document', D.documentType.telephoneBill)
            .upload_and_submit_document_for_verification('Upload an ID document', D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .click_Submit_Application_button()
            .click_Agree_checkbox()
            .click_Submit_Application_button()
            .verify_success_page()

        cy.url().then(function (url) {
            let regex = /onboarding\/(\d+)/;
            let match = url.match(regex);
            if (match && match.length > 1) {
                accountNo = match[1];
                cy.log('ACCOUNT NUMBER ' + accountNo);
                cy.saveLocalStorage();
            }
        });
    })

    it('1. Direct user to “Your Account(s)” page', function () {

        ui.login.open_base_url()
            .verify_login_menu(D.user)
       .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
        ui.clientPortal.click_your_accounts_link()
            .verify_your_accounts_page()

    })


    it('2. Direct user to “Investment Choice”', function () {
        ui.clientPortal.click_change_portfolio_button(accountNo)
        ui.clientPortal.verify_investment_choice_link()

    })


    it('3. Direct user to “Build Your Portfolio”', function () {
        ui.onboarding.click_self_directed_button()
        ui.clientPortal.verify_self_directed_icon_is_highlighted()
        ui.onboarding.select_all_checkboxes(5)
        .click_Save_and_Continue_button()
    })


    it('4. Complete Build Your Portfolio', function () {
        ui.onboarding.go_through_tour_steps(C.buildYourPortfolioStepMsgs)
       .expand_card(0)
         //   .expand_card(1)
         //   .expand_card(2)
        ui.clientPortal.verify_build_your_portfolio_link()
            .complete_build_your_portfolio()
        ui.clientPortal.check_or_uncheck_nuclear_power()
        ui.onboarding.click_Save_and_Continue_button()
        ui.clientPortal.verify_final_review_link()
    })


    it('5. Check Final Review', function () {
        ui.clientPortal.verify_final_review_page()
            .expand_current_ethics('Below are the categories you have chosen to exclude from your portfolio')
            .expand_new_ethics('Below are the categories you have chosen to exclude from your portfolio')
            .verify_number_of_selected_options_is_different_in_Current_and_New_Ethics()
            .verify_download_button_for_documents(2)
        ui.onboarding.verify_Documents_available_for_download([
            'Record of Engagement',
            'Praemium SMA PDS and Investment Guide extract'
        ])
    })


    it('6. Submit Change', function () {
          if (Cypress.env('cypressRunnerLocal') === true) {
              ui.app.clear_gmail_inbox()
          }
        ui.clientPortal.click_submit_changes_button()
            .verify_account_dashboard()
        // cy.wait(45000)
          ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.accountChanges)
    })


})
