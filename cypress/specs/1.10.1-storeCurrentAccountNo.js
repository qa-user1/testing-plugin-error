const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Client Portal - Account Dashboard', () => {
    let accountNo;

    beforeEach(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()

    })


    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        cy.visit('https://testwebserver.nucleuswealth.com/onboarding/5533/success')
       // ui.onboarding.store_current_account_number(accountNo)
        cy.get('[data-test="onboarding-rightHeader-title"]').invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];

        cy.saveLocalStorage()

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
                .verify_content_of_investment_account_panel()
                .click_view_account_details()
                .verify_account_dashboard()
    });



    xit('4. Check Tactical Panel', function () {

            ui.login.open_base_url()
            ui.clientPortal.click_your_accounts_link()
                .click_view_account_details()
            ui.clientPortal.click_tactical_panel()
                .verify_tactical_headings()
                .click_additional_assets()
                .verify_additional_assets_input_fields()
                .enter_cash_and_own_home_values(D.tacticalAdditionalAssets)
    })

    xit('5. Expand Strategic', function () {

            ui.clientPortal.click_strategic_panel()
                .compare_snapshots()
                .verify_change_portfolio_button()
                .click_strategic_panel()

    })


    xit('6. Expand Ethics/Exclusions', function () {

            ui.clientPortal.click_ethics_panel()
            ui.onboarding.verify_chosen_ethics([
                ['Climate Change', ['No Fossil Fuels (Worst Offenders)', 'No Fossil Fuels (Any)']],
                ['War', ['No Arms (Any)']]
            ])
            ui.clientPortal.verify_change_ethics_button()
                .click_ethics_panel()


    })

    xit('7. Expand Portfolio', function () {

            ui.clientPortal.click_portfolio_panel()
                .verify_change_ethics_button2()
                .verify_change_portfolio_button2()
                .verify_nucleus_portfolio_allocations()
                .verify_security_holdings()
                .verify_security_column()
                .click_portfolio_panel()

    })

    xit('8. Expand Performance', function () {

            ui.clientPortal.click_performance_panel()
                .verify_performance_titles()
                .verify_performance_card('0', '2')
                .verify_performance_card('1', '3')
                .verify_performance_card('2', '4')
                .verify_performance_card('3', '5')

    })

})

