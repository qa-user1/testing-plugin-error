const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const d = D.scenarios[0]

context('Data driven testing', () => {

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
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
    })

    it('2. Select account type', function () {
        ui.onboarding.click_create_new_investment_account()
            .select_account_type(d.accountType)
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
            .verify_investment_choice_page()
        //cy.saveLocalStorage()
    })

    it('3. Navigate to Risk Profile from Investment Choice', function () {
        ui.onboarding.select_investment_choice(d.investmentChoice.choice1)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()

    })

    it('4. Complete Risk Profile and navigate to Build Your Portfolio', function () {
        ui.onboarding.answer_questions_with_third_option(d.questionResponse)
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
        ui.onboarding.click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('7. Review Review Page', function () {
        // cy.visit('https://testwebserver.nucleuswealth.com/onboarding/6017/review')
        //need to check should we include save data methods here
        ui.onboarding.click('Question Responses')
            .review_net_worth_annual_net_income_liquid_net_worth(d)

            //I saw that we put this method below here, but on Doc where are scenarios there is no step related to this, so
            // I wonder should we include this here or not
            //.review_indicative_portfolio_data(d)

            .click_Save_and_Continue_button()
            .verify_applicants_page()
    })

    it('9. Complete Applicants', function () {
        ui.onboarding.remove_existing_applicant()
        ui.onboarding.add_new_applicant()
            .enter_ib_applicant_values(d)
            .enter_applicant_investment_experience(d)
            .click_submit_applicant_button()
            .upload_documents(d)
            .click_Save_and_Continue_button()
            .verify_Bank_Details_page()
    });

    it('10. Complete Bank Details', function () {
        // cy.visit('https://testwebserver.nucleuswealth.com/onboarding/6017/bank-details')
        ui.onboarding
            .enter_values_for_bank_details(d)
            .click_Save_and_Continue_button()
            .verify_compliance_page()
    });

    it('11. Complete Compliance', function () {
        ui.onboarding
            .enter_values_on_compliance_input_fields(d)
            .click_Save_and_Continue_button()
            .verify_Final_Review_page()
    });

    it('12. Check Final Review', function () {
        //  cy.visit('https://testwebserver.nucleuswealth.com/onboarding/6017/final-review')
        ui.onboarding.verify_documents_on_final_review_page(d)


    });

    it('13. Limited Advice Path', function () {
        //  cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4240/risk-profile')
        ui.onboarding.click_sidebar_option('Investment Choice')
            .go_through_tour_steps(C.stepMessages)
            .verify_investment_choice_page()
            .select_investment_choice(d.investmentChoice.choice2)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
            .click_Save_and_Continue_button()
    });

    it('14. Complete Final Review', function () {
        ui.onboarding.click_sidebar_option('Final Review')
            .verify_Final_Review_page()
            .click_Save_and_Continue_button()
            .click_Agree_checkbox()
            .click_Submit_Application_button()
        ui.onboarding.verify_success_page()
    });
})

