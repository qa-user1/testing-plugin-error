const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Log in to the Nucleus Wealth portal, create an individual account, and complete the onboarding portal', () => {


    before(function () {
       /* Cypress.Cookies.debug(true)
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
        )*/
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })

    it('1. Validate login credentials', function () {
        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_wrong_credentials_and_click_Sign_In(D.user.username, 'wrongPass')
            .verify_error_message(C.wrongCredentials)
             .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
            // .redirect_user_to_the_create_a_new_account_page()
         ui.onboarding.verify_account_selection()
    })

    it('2.Disclaimer Alert is present', function () {
        ui.onboarding.verify_disclaimer_in_the_footer()
    })

    it('3. Create new Individual investment account', function () {
        ui.onboarding.click_create_new_investment_account()
            .verify_types_of_investment_account()
            .click_super_type()
            .verify_super_subtypes()
            .click_non_super_type()
            .verify_non_super_subtypes()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.stepMessages)
            .verify_investment_choice_page()
        cy.saveLocalStorage()
    })

    xit('4. Check Help Modal in Investment Choice', function () {
        ui.onboarding.click_on_need_help_with_this_page()
            .verify_modal_window()
            .click_and_verify_each_modal_step()
            .click_done_button()

    })

    it('5. Navigate to Risk Profile Page from Investment Choice', function () {
        ui.onboarding.click_self_directed_button()
            .verify_acknowledgment_and_agreement_appear()
            .click_Save_and_Continue_button()
            .verify_text_is_visible(C.errorMsg.checkAllBoxes)
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
    })

    it('6. Complete Risk Profile', function () {
        ui.onboarding.answerAllQuestionsWithSameOption(12, 2)

            ui.onboarding.enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
            .verify_build_your_portfolio_page()
    })

    it('6. Complete Build Your Portfolio', function () {
        ui.onboarding.verify_empty_input_fields_on_BYP_page()
            .enter_values_on_BYP_input_fields(D.buildYouPortfolioFields)
            .verify_validation_messages_for_BYP_input_fields(D.buildYouPortfolioValidationMessages)
            .clear_values_on_BYP_input_fields()
            .enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
           // .click_Save_and_Continue_button()
           // .verify_ethical_overlay_page()
    })

    it('7. Complete Screen and Tilts', function () {
        ui.onboarding.click_climate_change_button()
            .select_checkbox_based_on_label('No Fossil Fuels (Worst Offenders)')
            .select_checkbox_based_on_label('No Fossil Fuels (Any)')
            .click_war_button()
            .select_checkbox_based_on_label('No Arms (Any)')
            .click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('8. Review Review Page', function () {
       /* ui.onboarding.expand_ethical_overlay_panel()
            .verify_chosen_ethics([
                ['Climate Change', ['No Fossil Fuels (Worst Offenders)', 'No Fossil Fuels (Any)']],
                ['War', ['No Arms (Any)']]
            ])
            .verify_your_portfolio_panel(D.yourPortfolioValues)
            .review_indicative_portfolio(D.indicativePortfolio)
            .review_indicative_portfolio_excluded_securities(D.indicativePortfolioExcludedSecurities)*/
            ui.onboarding.click_Save_and_Continue_button()
    })

    it('9. Navigate to Risk Profile', function () {

        ui.onboarding.click_sidebar_option('Investment Choice')
            .go_through_tour_steps(C.stepMessages)
            .click_limited_advice_button()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
    })

    it('10. Complete Risk Profile and navigate to Review', function () {
       cy.wait(3000)
        ui.onboarding.click_Save_and_Continue_button()
        cy.wait(2000)
        ui.onboarding.click_Save_and_Continue_button()
            //.verify_validation_message_for_Q_at_risk_profile(D.riskProfileValidationMessages)

        ui.onboarding.answerAllQuestionsWithSameOption(3, 2)
            .enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
            .verify_screen_and_tilts_page()
            .click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('11. Scrape results from Review and navigate to Applicants', function () {
        ui.onboarding
            .click('Question Responses')
            .save_data_object_for_Questions_Responses()
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

    xit('11. Scrape results from Review and navigate to Applicants', function () {
        ui.onboarding
            .save_final_JSON_report('individual_')
            .click_Save_and_Continue_button()
            .verify_applicants_page()
    })

    xit('12. Complete Applicants', function () {
        ui.onboarding.remove_existing_applicant()
            .verify_text_is_visible(D.applicantsProfileValidationMessages.successfullyRemovedApplicant)
            .add_new_applicant()
            .verify_add_new_applicant_page()
            .click_submit_applicant_button()
            .verify_validation_messages_for_create_new_applicant_input_fields(D.applicantsProfileValidationMessages)
    });

    xit('12. Complete Applicants', function () {
        ui.onboarding.enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .click_submit_applicant_button()
            .verify_your_identity()
            .upload_and_submit_document_for_verification('Upload an ID document', D.documentType.telephoneBill)
            .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
    });

    xit('12. Complete Applicants', function () {
        ui.onboarding.upload_and_submit_document_for_verification('Upload an ID document', D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .verify_Bank_Details_page()
    });

    xit('13. Complete Bank Details', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .verify_validation_messages_for_Bank_Details_fields(D.bankDetailsValidationMessages)
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .verify_Final_Review_page()
    });

    xit('14. Complete Final Review', function () {
        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
        ui.onboarding.click_Submit_Application_button()
            .verify_validation_message_for_agree_checkbox(D.finalReviewValidationMessage)
            .verify_Documents_available_for_download([
                'Investment and Fee Summary',
                'Statement of Advice',
                'Praemium SMA PDS and Investment Guide extract',
            ])
            .click_Agree_checkbox()
            .click_Submit_Application_button()
            .verify_success_page()
      //  cy.wait(55000)
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.individualAccountCreated)
            .store_current_account_number()
    });
})

