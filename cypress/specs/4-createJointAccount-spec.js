const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
const d = D.scenarios[0]

context('Log in to the Nucleus Wealth portal, create a Joint Account and complete the onboarding portal', () => {


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


    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu()
            .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
    })

    it('2. Create a Joint Account', function () {
        ui.onboarding.click_create_new_investment_account()
            .verify_types_of_investment_account()
            .click_non_super_type()
            .verify_non_super_subtypes()
            .select_joint_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
            .verify_investment_choice_page()
        cy.saveLocalStorage();

    })

    it('3. Complete Investment Choice', function () {
        ui.onboarding.click_limited_advice_button()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
    })

    it('4. Complete Risk Profile', function () {
        ui.onboarding.answerAllQuestionsWithSameOption(13, 2)
            .enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
            .verify_ethical_overlay_page()
    })

    it('5. Complete Ethical Overlay', function () {
        ui.onboarding.click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('6. Review Review Page', function () {
        ui.onboarding.expand_question_responses_panel()
            .verify_question_responses(D.reviewQuestionsSMSF, D.reviewResponsesSMSF)
            .save_data_object_for_Questions_Responses_Personal_Super_Account()
            .expand_ethical_overlay_panel()
            .save_data_object_for_Ethical_Overlay()
            .click_Ethical_Overlay()
            .save_data_object_for_Your_Portfolio()
            .save_data_object_for_Strategic_Asset_Allocation()
            .save_data_object_for_Indicative_Portfolio_Cash()
            .save_data_object_for_Indicative_Portfolio_Bonds()
            .save_data_object_for_Indicative_Portfolio_Australian_Shares()
            .save_data_object_for_Indicative_Portfolio_International_Shares()
            .save_data_object_for_Indicative_Portfolio_Excluded_securities()
            .save_data_object_for_Fees_and_Charges_On_Going_Fees()
            .save_data_object_for_Fees_and_Charges_Embedded_Fees()
            .save_data_object_for_Fees_and_Charges_Initial_Costs()
    })

    it('6. Review Review Page', function () {
        ui.onboarding
            .save_final_JSON_report('joint_')
            .click_Save_and_Continue_button()
            .verify_applicants_page()
    })

    it('7. Complete Applicants', function () {
        ui.onboarding.verify_2_investitors_required_message()
            .remove_existing_applicant()
            .verify_text_is_visible(D.applicantsProfileValidationMessages.successfullyRemovedApplicant)
            .add_new_applicant()
            .verify_add_new_applicant_page()
            .enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)
            .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
            .upload_and_submit_document_for_verification(D.documentType.waterBill)
            .verify_applicants_page()
            .click_Save_and_Continue_button()


    });

    it('8. Navigate from Applicants to Bank Details', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .verify_Bank_Details_page()
    });

    it('9. Complete Bank Details', function () {
        ui.onboarding.enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .verify_Final_Review_page()
    });

    it('10. Review Final Review', function () {
        ui.onboarding.verify_Documents_available_for_download([
            'Investment and Fee Summary',
            'Statement of Advice',
            'Praemium SMA PDS and Investment Guide extract'
        ])
            .verify_alert_msg_final_review_page()
            .redirect_to_applicants_page()
            .verify_applicants_page()
    });

    it('11. Add another investor in Applicants', function () {
        ui.onboarding.add_new_applicant()
            .verify_add_new_applicant_page()
            .enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification(D.documentType.telephoneBill)
            .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
            .upload_and_submit_document_for_verification(D.documentType.waterBill)
            .verify_applicants_page()
            .verify_two_applicants_are_visible()
            .click_Save_and_Continue_button()
            .verify_Bank_Details_page()
            .click_Save_and_Continue_button()
    });

    it('12. Review Final Review', function () {
        ui.onboarding.verify_no_alert_msg_final_review_page()
    });
})

