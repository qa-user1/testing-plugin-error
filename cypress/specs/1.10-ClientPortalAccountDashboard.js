const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const d = D.scenarios[0]

context('Client Portal - Account Dashboard', () => {
    let accountNo;

    before(function () {
          /* cy.clearAllLocalStorage()
           cy.clearAllCookies()
           cy.clearAllSessionStorage()*/

        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.click_create_new_investment_account()
            .click_non_super_type()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
        cy.saveLocalStorage()
        ui.onboarding.click_self_directed_button()
            .select_all_checkboxes(5)
            .click_Save_and_Continue_button()
            .enter_values_on_BYP_input_fields(D.buildYouPortfolioFields)
            .clear_values_on_BYP_input_fields()
            .enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
            .click_Save_and_Continue_button()
            .click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()

        ui.onboarding.click_sidebar_option('Investment Choice')
            .click_limited_advice_button()
            .go_through_tour_steps(C.stepMessages)
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .answerAllQuestionsWithSameOption(13, 2)
            .enter_financial_info(d)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .remove_existing_applicant()
            .add_new_applicant()
            .click_submit_applicant_button()
            .enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)
            .upload_and_submit_document_for_verification(D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .click_Submit_Application_button()
            .click_Agree_checkbox()
            .click_Submit_Application_button()
            .verify_success_page()
        cy.get('[data-test="onboarding-rightHeader-title"]').invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.saveLocalStorage()
        })
    })


    xit('Precondition part 1', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.click_create_new_investment_account()
            .click_non_super_type()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
        cy.saveLocalStorage()
        ui.onboarding.click_self_directed_button()
            .select_all_checkboxes(5)
            .click_Save_and_Continue_button()
            .enter_values_on_BYP_input_fields(D.buildYouPortfolioFields)
            .clear_values_on_BYP_input_fields()
            .enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
            .click_Save_and_Continue_button()
            .click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
    })


    xit('Precondition part 2', function () {

        ui.onboarding.click_sidebar_option('Investment Choice')
            .click_limited_advice_button()
            .go_through_tour_steps(C.stepMessages)
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .answerAllQuestionsWithSameOption(13, 2)
            .enter_financial_info(d)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .remove_existing_applicant()
            .add_new_applicant()
            .click_submit_applicant_button()
            .enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)
            .upload_and_submit_document_for_verification(D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .click_Save_and_Continue_button()
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .click_Submit_Application_button()
            .click_Agree_checkbox()
            .click_Submit_Application_button()
            .verify_success_page()
        cy.get('[data-test="onboarding-rightHeader-title"]').invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.saveLocalStorage()
        })

    })


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

