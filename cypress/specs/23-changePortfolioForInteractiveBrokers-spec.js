const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('23. Change Portfolio for Interactive Brokers', () => {
    let accountNo;

      before(function () {

          ui.login.open_base_url()
              .verify_login_menu(D.user)
              .enter_credentials_and_click_Sign_In(D.ibUser.username, D.ibUser.password)
              .redirect_user_to_the_create_a_new_account_page()
          ui.onboarding.click_create_new_investment_account()
              .click_non_super_type()
              .select_individual_non_super_subtype()
              .click_create_investment_account()
              .go_through_tour_steps(C.investmentStepMessages)
          ui.onboarding.click_self_directed_button()
              .select_all_checkboxes(6)
              .click_Save_and_Continue_button()
          ui.onboarding.answerAllQuestionsWithSameOption(12, 3)
              .enter_financial_info(D.financialInfo)
              .click_Save_and_Continue_button()
              .go_through_tour_steps(C.buildYourPortfolioStepMsgsIB)
          ui.onboarding.expand_card(0)
              .expand_card(1)
              .expand_card(2)
          D.buildYouPortfolioFields.tacticalGrowth2 = '100'
          D.buildYouPortfolioFields.coreInternational2 = '0'
          ui.onboarding.enter_tactical_growth_and_core_international_values(D.buildYouPortfolioFields)
          ui.onboarding.click_Save_and_Continue_button()

              .click_Save_and_Continue_button()
  .click_Save_and_Continue_button()
  .click_Save_and_Continue_button()

          //ui.onboarding.remove_existing_applicant()

          ui.onboarding.add_new_applicant()

          D.applicantsProfileFields.employmentInput = 'Unemployed'
          D.applicantsProfileFields.type = 'Individual-IB'
          ui.onboarding.enter_values_at_create_new_applicant_input_fields(D.applicantsProfileFields)
              .enter_applicant_investment_experience(D.investmentExperience)
              .click_submit_applicant_button()

          ui.onboarding.upload_and_submit_document_for_verification('Upload an ID document', D.documentType.telephoneBill)
              .upload_and_submit_document_for_verification('Upload an ID document', D.documentType.waterBill)
              .click_Save_and_Continue_button()

          ui.onboarding.click_Save_and_Continue_button()

              .enter_Bank_Details(D.bankDetails)
              .click_Save_and_Continue_button()

          ui.onboarding.click_Save_and_Continue_button()

              .enter_compliance_source_type_and_percentage(D.compliancePageInputFields)
          ui.onboarding.click_Save_and_Continue_button()

          ui.onboarding.click_sidebar_option('Investment Choice')
              .go_through_tour_steps(C.investmentStepMessages)
              .verify_investment_choice_page()
              .click_limited_advice_button()
              .select_all_checkboxes(6)
              .click_Save_and_Continue_button()
              .verify_risk_profile_page()
              .verify_sidebar_content_not_exist('Build Your Portfolio')
          ui.onboarding.answerAllQuestionsWithSameOption(13, 2)
              .enter_financial_info(D.financialInfo)
              .click_Save_and_Continue_button()
          ui.app.pause(3)
          ui.onboarding.click_Save_and_Continue_button()
          ui.app.pause(3)
          ui.onboarding.click_Save_and_Continue_button()
          ui.app.pause(3)
              ui.onboarding.click_Save_and_Continue_button()


          ui.onboarding.click_sidebar_option('Final Review')
              .click_Save_and_Continue_button()
              .click_Agree_checkbox()
              .select_all_checkboxes(7)
              .click_Submit_Application_button()
          ui.onboarding.verify_success_page()

          cy.url().then(function (url) {
              let regex = /onboarding\/(\d+)/;
              let match = url.match(regex);
              if (match && match.length > 1) {
                  accountNo = match[1];
                  cy.log('ACCOUNT NUMBER ' + accountNo);
                  cy.saveLocalStorage();
              }
          });
      });

    it('1. Log into user with IB access and direct user to “Your Account(s)” page', function () {

         ui.login.open_base_url()
             .verify_login_menu(D.user)
             .enter_credentials_and_click_Sign_In(D.ibUser.username, D.ibUser.password)
        //cy.visit('https://testwebserver.nucleuswealth.com/client-portal/5483')
        ui.clientPortal.click_your_accounts_link()
            .verify_your_accounts_page()

    })

    it('2. Direct user to “Investment Choice”', function () {
        ui.clientPortal.click_change_portfolio_button(accountNo)
        ui.clientPortal.verify_investment_choice_link()

    })


    it('3. Direct user to “Build Your Portfolio”', function () {
        //cy.visit('https://testwebserver.nucleuswealth.com/client-portal/investment-account/4647/investment-choice')
        ui.onboarding.click_self_directed_button()
        ui.clientPortal.verify_self_directed_icon_is_highlighted()
        ui.onboarding.select_all_checkboxes(6)
            .click_Save_and_Continue_button()
    })

    it('4. Complete Risk Profile', function () {
        ui.onboarding.click_on_next_question_button(12)
            .click_Save_and_Continue_button()
    })

    it('4. Complete Build Your Portfolio', function () {
        ui.onboarding.go_through_tour_steps(C.buildYourPortfolioStepMsgsIB2)
            .expand_card(2)
        ui.clientPortal.verify_build_your_portfolio_link()
            .edit_build_your_portfolio_for_IB()
        ui.clientPortal.check_or_uncheck_nuclear_power()
        ui.onboarding.click_Save_and_Continue_button()
        ui.clientPortal.verify_final_review_link()
    })


    it('5. Check Final Review', function () {
        ui.clientPortal.verify_final_review_page()
            .expand_current_ethics('You have not chosen any ethics to be excluded from your portfolio')
            .expand_new_ethics('Below are the categories you have chosen to exclude from your portfolio')
            .verify_number_of_selected_options_is_different_in_Current_and_New_Ethics()
            .verify_download_button_for_documents(2)
        ui.onboarding.verify_Documents_available_for_download([
            'MDA Brochure and Agreement',
            'Statement of Advice MDA'
        ])
    })
})

