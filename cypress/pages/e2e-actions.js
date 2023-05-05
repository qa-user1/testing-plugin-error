import OnboardingPage from "./onboarding-page";
import ui from "./ui-spec";
import D from "../fixtures/data";

let app = new OnboardingPage()
const C = require('../fixtures/constants');

module.exports = {
    complete_flow_for_creating_new_account: data => {
        let type = data.accountType
        let option = data.investmentChoice


          cy.visit('https://testwebserver.nucleuswealth.com/onboarding/6718/interactive-broker-compliance')

        /*app.click_create_new_investment_account()
            .select_account_type(type)
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
            .verify_investment_choice_page()
            .select_investment_choice(data.investmentChoice, type)
            .click_Save_and_Continue_button()


        if (type === 'Individual-IB' && option === 'Self Directed') {
            app.verify_risk_profile_page()
                .answerQuestionsWithSpecificOption(data.questionResponse.selectedOptions)
                .enter_financial_info(data.questionResponse)
                .click_Save_and_Continue_button()
            app.verify_build_your_portfolio_page()
                .enter_Portfolio_values(data.buildYourPortfolio)
                .click_Save_and_Continue_button()
        } else if (option === 'Limited Advice' || option === 'Full Advice') {
            app.verify_risk_profile_page()
                .answerQuestionsWithSpecificOption(data.questionResponse.selectedOptions)
                .enter_financial_info(data.questionResponse)
                .click_Save_and_Continue_button()
        } else if (option === 'Self Directed') {
            app.verify_build_your_portfolio_page()
                .enter_Portfolio_values(data.buildYourPortfolio)
                .click_Save_and_Continue_button()
        }
*/

/*        app.verify_ethical_overlay_page()
            .select_ethical_option(data.ethicalOverlay)
            .click_Save_and_Continue_button()

        if (type === 'Personal Super') {
            app.verify_super_fund_entry_page()
                .enter_values_on_super_fund_entry(data.fundEntryInputFields, data.bankDetails)
                .click_Save_and_Continue_button()
        }

        app.verify_review_page()



        if (type === 'Individual-IB') {
            app.verify_review_page()
                .expand_question_responses_panel()
               .verify_question_responses(type, data.reviewResponses)
        } else if (option === 'Limited Advice') {
            app.verify_review_page()
                .expand_question_responses_panel()
               // .verify_question_responses(type, data.reviewResponses)
        }

        app.expand_ethical_overlay_panel()
            .verify_ethics(data.ethicalOverlay)
        //    app.review_portfolio_data(data)
        app.click_Save_and_Continue_button()

        if (type === 'SMSF') {
            app.verify_SMSF_page()
                .enter_SMSF_details(data.SMSFDetails)
                .click_Save_and_Continue_button()
                .enter_values_for_bank_details(data)
                .click_Save_and_Continue_button()
        }

        if (type === 'Trust') {
            app.enter_address(data.trustDetails)
                .enter_all_trust_details(data.trustDetails)
                .enter_Bank_Details(data.bankDetails)
                .click_Save_and_Continue_button()
        }

        if (type === 'Company') {
            app.enter_address(data.companyDetails)
                .enter_all_required_company_details(data.companyDetails)
                .enter_Bank_Details(data.bankDetails)
                .click_Save_and_Continue_button()
        }

        app.verify_applicants_page()
            .remove_existing_applicant()
            .add_new_applicant()
            .enter_values_at_create_new_applicant_input_fields(data.applicants.inputFields, type)
        if (type === 'Individual-IB') {
            app.enter_applicant_investment_experience(data)
        }


        app.click_submit_applicant_button()
            .upload_documents(data)
        if (type === 'Joint') {
            app.add_new_applicant()
                .enter_values_at_create_new_applicant_input_fields(data.applicants.inputFields, type)
            app.click_submit_applicant_button()
                .upload_documents(data)
        }
        app.click_Save_and_Continue_button()


        if (type === 'Individual-IB' || type === 'Individual' || type === 'Joint') {
            app.enter_values_for_bank_details(data)
                .click_Save_and_Continue_button()
        } else if (type === 'Personal Super') {
            app.verify_insurance_quote_page()
                .complete_insurance_quote(data)
                .click_Save_and_Continue_button()
        }*/

        if (type === 'Individual-IB') {
            app.enter_compliance_values(data.compliancePageInputFields)
                .click_Save_and_Continue_button()
        }

        app.verify_Final_Review_page()
            .verify_documents_on_final_review_page(option, type, data.finalReview)


    }
}



