const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const d = D.scenarios[0]

context('Log in to the Nucleus Wealth portal, create an individual account, and complete the onboarding portal', () => {



    beforeEach(function () {
        Cypress.Cookies.debug(true)
        Cypress.Cookies.defaults({
            preserve: /secure|ntercom|XSRF-TOKEN|__hssc|hubspotutk|__hstc|_fbp|cognito|__Secure-next-auth.callback-url|__Secure-next-auth.session-token|__Host-next-auth.csrf-token/,
        })
    });

    it('1. Validate login credentials', function () {

        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_wrong_credentials_and_click_Sign_In(D.user.username, 'wrongPass')
            .verify_error_message()
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
    })

    it('3. Create new Individual investment account', function () {
        ui.onboarding.click_create_new_investment_account()
            .click_non_super_type()
            .verify_non_super_subtypes()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
            .click_limited_advice_button()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
        cy.saveLocalStorage()
    })


    it('10. Complete Risk Profile and navigate to Review', function () {
        // cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4151/risk-profile')
        ui.onboarding
           // .click_Save_and_Continue_button()
            //.verify_validation_message_for_Q_at_risk_profile(D.riskProfileValidationMessages)
            .answerAllQuestionsWithSameOption(13, 2)
            .enter_financial_info(d)
            .click_Save_and_Continue_button()
            .verify_ethical_overlay_page()
            .click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('11. Scrape results from Review and navigate to Applicants', function () {
        ui.onboarding
          //  .save_final_JSON_report('individual_')
            .click_Save_and_Continue_button()
            .verify_applicants_page()
    })

    it('12. Complete Applicants', function () {
        //  cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4153/applicants')
        ui.onboarding.remove_existing_applicant()
            .verify_text_is_visible(D.applicantsProfileValidationMessages.successfullyRemovedApplicant)
        ui.onboarding.add_new_applicant()
            .verify_add_new_applicant_page()
            .click_submit_applicant_button()
            .verify_validation_messages_for_create_new_applicant_input_fields(D.applicantsProfileValidationMessages)
    });

    it('12. Complete Applicants', function () {
        ui.onboarding.enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)
            .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
    });

    it('12. Complete Applicants', function () {
        ui.onboarding.upload_and_submit_document_for_verification(D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .verify_Bank_Details_page()
    });

    it('13. Complete Bank Details', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .verify_validation_messages_for_Bank_Details_fields(D.bankDetailsValidationMessages)
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .verify_Final_Review_page()
    });

    it('14. Complete Final Review', function () {
        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
        ui.onboarding.click_Submit_Application_button()
            .verify_validation_message_for_agree_checkbox(D.finalReviewValidationMessage)
        ui.onboarding.verify_Documents_available_for_download([
            'Investment and Fee Summary',
            'Statement of Advice',
            'Praemium SMA PDS and Investment Guide extract',
        ])
            .click_Agree_checkbox()
            .click_Submit_Application_button()
        ui.onboarding.verify_success_page()
            .card_number()



    });
})

