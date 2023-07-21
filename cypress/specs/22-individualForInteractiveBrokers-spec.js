const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('22. Individual Onboarding for Interactive Brokers', () => {


    before(function () {
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
        /*cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()*/

    })

    it('1. Log into user with IB access', function () {

        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .enter_credentials_and_click_Sign_In(D.ibUser.username, D.ibUser.password)
          .redirect_user_to_the_create_a_new_account_page()
        ui.onboarding.verify_account_selection()
    })

    it('2. Create new Individual account', function () {
        ui.onboarding.click_create_new_investment_account()
            .verify_types_of_investment_account()
            .click_non_super_type()
            .verify_non_super_subtypes()
            .select_individual_non_super_subtype()
            .click_create_investment_account()
            .go_through_tour_steps(C.investmentStepMessages)
            .verify_investment_choice_page()
        cy.saveLocalStorage()
    })

    it('3. Check SideNav', function () {
        ui.onboarding.verify_sidebar_content('Risk Profile')
        ui.onboarding.verify_sidebar_content('Compliance')
    })

    it('4. Navigate to Risk Profile page', function () {
        ui.onboarding.click_self_directed_button()
            .verify_acknowledgment_and_agreement_appear()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
    })

    it('5. Complete Risk Profile', function () {
        ui.onboarding.answerAllQuestionsWithSameOption(12, 3)
            .enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
            .go_through_tour_steps(C.buildYourPortfolioStepMsgsIB)
            .verify_build_your_portfolio_page()

    })

    it('6. Complete Build Your Portfolio', function () {
        ui.onboarding.expand_card(0)
            .expand_card(1)
            .expand_card(2)
        D.buildYouPortfolioFields.tacticalGrowth2 = '100'
        D.buildYouPortfolioFields.coreInternational2 = '0'
        ui.onboarding.enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)


    })

    it('7.Complete Screen and Tilts', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .verify_review_page()
    })

    it('8. Check Review Page', function () {
        ui.onboarding.click('Question Responses')
            //.verify_net_worth_annual_net_income_liquid_net_worth()
            .save_data_object_for_Questions_Responses_Personal_Super_Account()
            .expand_ethical_overlay_panel()
            .verify_text_is_visible('Tactical Growth')
            .save_data_object_for_Your_Portfolio_IB_Profile()
            .save_data_object_for_Strategic_Asset_Allocation()
            .save_data_object_for_Indicative_Portfolio_IB_Cash()
            .save_data_object_for_Indicative_Portfolio_IB_Bonds()
            .save_data_object_for_Indicative_Portfolio_IB_Australian_Shares()
            .save_data_object_for_Indicative_Portfolio_IB_International_Shares()
            //   .verify_text_is_visible('There are currently no securities excluded due to your ethical choices. If you feel a security should have been screened out, please contact us .')
            .click('Fees And Charges')
            .save_data_object_for_Fees_and_Charges_On_Going_Fees()
            .save_data_object_for_Fees_and_Charges_Embedded_Fees()
            .save_data_object_for_Fees_and_Charges_Initial_Costs()
    })

    it('8. Check Review Page', function () {
        ui.onboarding
            .save_final_JSON_report('individual_ib_')
            .click_Save_and_Continue_button()
            .verify_applicants_page()
    })

    it.only('9. Complete Applicants', function () {
        cy.visit('https://testwebserver.nucleuswealth.com/onboarding/5202/applicants')
      //  ui.onboarding.remove_existing_applicant()
        //    .verify_text_is_visible(D.applicantsProfileValidationMessages.successfullyRemovedApplicant)
        ui.onboarding.add_new_applicant()
            .verify_add_new_applicant_page()
            .verify_text_is_visible('Investment Experience')
        D.applicantsProfileFields.employmentInput = 'Unemployed'
        D.applicantsProfileFields.type = 'Individual-IB'
        ui.onboarding.enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
            .enter_applicant_investment_experience(D.investmentExperience)
            .click_submit_applicant_button()
            .verify_your_identity()
        cy.url().should('include', 'applicants')
        ui.onboarding.upload_and_submit_document_for_verification('Upload an ID document', D.documentType.telephoneBill)
            .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
            .upload_and_submit_document_for_verification('Upload an ID document', D.documentType.waterBill)
            .click_Save_and_Continue_button()
            .verify_Bank_Details_page()
    });


    it('10. Complete Bank Details', function () {
        ui.onboarding.click_Save_and_Continue_button()
            .verify_validation_messages_for_Bank_Details_fields(D.bankDetailsValidationMessages)
            .enter_Bank_Details(D.bankDetails)
            .click_Save_and_Continue_button()
            .verify_compliance_page()
    });

    it('11. Complete Compliance', function () {
        ui.app.verify_text_is_visible('Investment Objective')
            .verify_text_is_visible('Trading Permission')
            .verify_text_is_visible('Source of Wealth')
            .verify_text_is_visible('Affiliation Detail')
        ui.onboarding.click_Save_and_Continue_button()
            .verify_validation_messages_for_compliance_page_fields(D.compliancePageValidationMessages)
            .enter_compliance_source_type_and_percentage(D.compliancePageInputFields)
        ui.onboarding.click_Save_and_Continue_button()
            .verify_Final_Review_page()
    });

    it('12. Check Final Review', function () {
        ui.onboarding.verify_Documents_available_for_download([
            'Investment and Fee Summary',
            'MDA Brochure and Agreement',
            'Statement of Advice MDA',
        ])
            .verify_text_is_visible('Nucleus Investment Documents')
            .verify_text_is_visible('Interactive Brokers Agreements')
            .verify_text_is_visible('Financial Services Guides and Privacy:')
            .verify_text_is_visible('Interactive Brokers Trading and Custody Agreements:')
            .verify_text_is_visible('Interactive Brokers Additional Services and Data Agreements:')
            .verify_text_is_visible('Stock Exchange Agreements & Disclosures:')
            .verify_text_is_visible('US Tax form:')
            .verify_text_is_visible('Download all')
        ui.clientPortal.verify_download_button_for_documents(32)
    });

    it('13. Limited Advice Path', function () {
      //  cy.visit('https://testwebserver.nucleuswealth.com/onboarding/4874/investment-choice')
        ui.onboarding.click_sidebar_option('Investment Choice')
            ui.onboarding.go_through_tour_steps(C.investmentStepMessages)
            .verify_investment_choice_page()
            .click_limited_advice_button()
            .select_all_checkboxes(6)
            .click_Save_and_Continue_button()
            .verify_risk_profile_page()
            .verify_sidebar_content_not_exist('Build Your Portfolio')
        ui.onboarding.answerAllQuestionsWithSameOption(13, 3)
            .enter_financial_info(D.financialInfo)
            .click_Save_and_Continue_button()
        ui.onboarding.click_sidebar_option('Review')
       /* ui.app.pause(3)
        ui.onboarding.click_Save_and_Continue_button()
        ui.app.pause(3)
        ui.onboarding.click_Save_and_Continue_button()
        ui.app.pause(3)*/
        ui.onboarding.verify_your_portfolio_content_not_exist('Tactical Growth')
            .click_Save_and_Continue_button()


    });

    it('14. Complete Final Review', function () {
        if (Cypress.env('cypressRunnerLocal') === true) {
            ui.app.clear_gmail_inbox()
        }
        ui.onboarding.click_sidebar_option('Final Review')
            .verify_Final_Review_page()
            .click_Save_and_Continue_button()
            .verify_validation_message_for_agree_checkbox(D.finalReviewValidationMessage)
            .click_Agree_checkbox()
            .select_all_checkboxes(7)
            .click_Submit_Application_button()
        ui.onboarding.verify_success_page()
        // cy.wait(45000)
        ui.onboarding.verify_email_arrives_to_specified_address(D.gmailAccount, C.emailTemplates.individual_IB_AccountCreated)
    });
})

