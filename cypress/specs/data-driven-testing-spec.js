const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const d = D.scenarios[0]

context('Log in to the Nucleus Wealth portal, create an individual account, and complete the onboarding portal', () => {

    before(() => {
        ui.app.clear_gmail_inbox()
    })

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

    it('1. Log in to Portal', function () {
        D.user.username = 'testing+ib@nucleuswealth.com'
        D.user.password = 'Testing1234!'
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
        ui.onboarding.verify_account_selection()
    })

    it('2. Select account type', function () {
        ui.onboarding.click_create_new_investment_account()
            .select_account_type(d.accountType)
            .click_create_investment_account()
            .verify_investment_choice_page()
        //cy.saveLocalStorage()
    })

    it('3. Navigate to Risk Profile from Investment Choice', function () {
        ui.onboarding.select_investment_choice(d.investmentChoice)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()

    })

    it('4. Complete Risk Profile and navigate to Build Your Portfolio', function () {
        ui.onboarding.answer_questions_with_first_option(d.questionResponse)
            .enter_financial_info(d)
            .click_Save_and_Continue_button()
            .verify_build_your_portfolio_page()
    })

    it('5. Complete Build Your Portfolio', function () {
        ui.onboarding.enter_Portfolio_values(d)
        .click_Save_and_Continue_button()
            .verify_ethical_overlay_page()
    })

    it('6. Complete Ethical Overlay', function () {
        ui.onboarding.click_climate_change_button()
            .select_climate_change_option(d)
            .click_war_button()
            .click_Save_and_Continue_button()
            .verify_review_page()
    })

    xit('7. Review Review Page', function () {
        ui.onboarding.review_indicative_portfolio_data(d)

            /*.review_indicative_portfolio(D.indicativePortfolio)
            .review_indicative_portfolio_security(D.indicativePortfolioSecurity)*/
    })

})

