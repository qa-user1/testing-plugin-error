const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Client Portal - Account Dashboard', () => {
    let accountNo;

    beforeEach(function () {
        /*   cy.clearAllLocalStorage()
           cy.clearAllCookies()
           cy.clearAllSessionStorage()*/

    })


    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_wrong_credentials_and_click_Sign_In(D.user.username, 'wrongPass')
            .verify_error_message()
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
        //cy.visit('https://testwebserver.nucleuswealth.com/onboarding/5538/success')
        // ui.onboarding.store_current_account_number(accountNo)
        cy.get('[data-test="onboarding-rightHeader-title"]').invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.saveLocalStorage()
        })
    })

    it('3. Create new Individual investment account', function () {
        ui.onboarding.click_create_new_investment_account()
            .click_non_super_type()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
        //cy.saveLocalStorage()
    })



    it('5. Navigate to Build Your Portfolio Page from Investment Choice', function () {
        ui.onboarding.click_self_directed_button()
        ui.onboarding.select_all_checkboxes(5)
            .click_Save_and_Continue_button()
    })

    it('6. Complete Build Your Portfolio', function () {
        ui.onboarding.clear_values_on_BYP_input_fields()
        ui.onboarding.enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
            .click_Save_and_Continue_button()

    })

    it('7. Complete Ethical Overlay', function () {
        //cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4146/ethical-overlay')
        ui.onboarding.click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
    })

    it('8. Review Review Page', function () {
        // cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4150/review')
        ui.onboarding
            .click_Save_and_Continue_button()
    })

    it('9. Navigate to Risk Profile', function () {
        ui.onboarding.click_sidebar_option('Investment Choice')
            .click_limited_advice_button()
            .go_through_tour_steps(C.stepMessages)
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()

    })

    it('10. Complete Risk Profile and navigate to Review', function () {
        // cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4151/risk-profile')
        ui.onboarding
            .click_Save_and_Continue_button()
            .verify_validation_message_for_Q_at_risk_profile(D.riskProfileValidationMessages)
            .answerAllQuestionsWithSameOption(13, 2)
            .enter_financial_info(d)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
    })


    it('11. Scrape results from Review and navigate to Applicants', function () {
        ui.onboarding

            .click_Save_and_Continue_button()

    })

    it('12. Complete Applicants', function () {
        //  cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4153/applicants')
        ui.onboarding.remove_existing_applicant()

        ui.onboarding.add_new_applicant()

            .click_submit_applicant_button()

    });

    it('12. Complete Applicants', function () {
        ui.onboarding.enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()

            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)

    });

    it('12. Complete Applicants', function () {
        ui.onboarding.upload_and_submit_document_for_verification(D.documentType.waterBill)
            .click_Save_and_Continue_button()

    });

    it('13. Complete Bank Details', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()

    });

    it('14. Complete Final Review', function () {

        ui.onboarding.click_Submit_Application_button()
        ui.onboarding.verify_Documents_available_for_download([
            'Investment and Fee Summary',
            'Statement of Advice',
            'Praemium SMA PDS and Investment Guide extract',
        ])
            .click_Agree_checkbox()
            .click_Submit_Application_button()

        ui.onboarding.store_current_account_number()
    });
    
    it('1. Direct user to “Your Accounts” page', () => {


        ui.login.open_base_url()
            .verify_login_menu(D.user)
        ui.login.enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
        ui.clientPortal.click_your_accounts_link()
            .verify_your_accounts_page()
    })


    it('2. Overall asset summary panel', function () {
        ui.clientPortal.verify_overall_asset_summary_panel('0')

    })


    it('3. Direct user to Account Dashboard', function () {

        ui.clientPortal.check_investment_account_panel()
            .verify_target_weight_total(accountNo)
            .verify_content_of_investment_account_panel(accountNo)
            .click_view_account_details(accountNo)
            .verify_account_dashboard()
    });



    it('4. Check Tactical Panel', function () {

        ui.login.open_base_url()
        ui.clientPortal.click_your_accounts_link()
            .click_view_account_details(accountNo)
        ui.clientPortal.click_tactical_panel()
            .verify_tactical_headings()
            .click_additional_assets()
            .verify_additional_assets_input_fields()
            .enter_cash_and_own_home_values(D.tacticalAdditionalAssets)
    })

    it('5. Expand Strategic', function () {

        ui.clientPortal.click_strategic_panel()
            .compare_snapshots()
            .verify_change_portfolio_button()
            .click_strategic_panel()

    })


    it('6. Expand Ethics/Exclusions', function () {

        ui.clientPortal.click_ethics_panel()
        ui.onboarding.verify_chosen_ethics([
            ['Climate Change', ['No Fossil Fuels (Worst Offenders)', 'No Fossil Fuels (Any)']],
            ['War', ['No Arms (Any)']]
        ])
        ui.clientPortal.verify_change_ethics_button()
            .click_ethics_panel()


    })

    it('7. Expand Portfolio', function () {

        ui.clientPortal.click_portfolio_panel()
            .verify_change_ethics_button2()
            .verify_change_portfolio_button2()
            .verify_nucleus_portfolio_allocations()
            .verify_security_holdings()
            .verify_security_column()
            .click_portfolio_panel()

    })

    it('8. Expand Performance', function () {

        ui.clientPortal.click_performance_panel()
            .verify_performance_titles()
            .verify_performance_card('0', '2')
            .verify_performance_card('1', '3')
            .verify_performance_card('2', '4')
            .verify_performance_card('3', '5')

    })

})

