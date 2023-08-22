const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
let dataSets


before(function () {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.clearAllSessionStorage()

    return cy.request({
        method: 'GET',
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1WXSpFqMGs3-iVP5WtORKnxdki66ZgdvnJCxxTlVEHG8/values/testing_input_output_super_limitedadvice?key=AIzaSyDPfXkZQt0fnJcz5vw26d6kROxWBYVV3gc',
        failOnStatusCode: false
    }).then(response => {
        dataSets = response.body.values[0]
    })

})

context('24. Onboarding Portal - Risk Profile Score Calculator -- data set #', () => {

  //  for (let i = 0; i < dataSets.length; i++) {
    for (let i = 0; i < 19; i++) {
        it('24. Onboarding Portal - Risk Profile Score Calculator -- data set #' + i, () => {

            function removeLastComma(str) {
                const lastIndex = str.lastIndexOf(',');

                if (lastIndex !== -1) {
                    return str.slice(0, lastIndex) + str.slice(lastIndex + 1);
                }

                return str;
            }


            const dataSet = removeLastComma(dataSets[i])
           const inputOutputValues_object = JSON.parse(dataSet)
            let inputValues = inputOutputValues_object.input
            let outputValues = inputOutputValues_object.output

            cy.writeFile('S3_bucket/' + 'test' + i + '.json', inputOutputValues_object)

            ui.login.open_base_url()
                .verify_login_menu(D.user)
                .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
                .redirect_user_to_the_create_a_new_account_page()
            ui.onboarding.verify_account_selection()
                .click_create_new_investment_account()
                .click_super_type()
                .click_personal_super_subtype()
                .click_create_investment_account()
                .go_through_tour_steps(C.investmentStepMessages)
                .verify_investment_choice_page()
                .click_limited_advice_button()
                .select_all_checkboxes(6)
                .click_Save_and_Continue_button()
                .verify_risk_profile_page()

            for (let i = 0; i < 12; i++) {
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[i].a)
            }

            ui.onboarding.enter_financial_info_based_on_text_from_API(inputOutputValues_object)
                .click_Save_and_Continue_button()
                .verify_screen_and_tilts_page()
                .select_ethical_option(D.scenarios[0].ethicalOverlay)
                .click_Save_and_Continue_button()
                .verify_super_fund_entry_page()
                .enter_values_on_super_fund_entry(D.scenarios[0].fundEntryInputFields, D.scenarios[0].bankDetails)
                .click_Save_and_Continue_button()
                .verify_review_page()
                .verify_output_values_based_on_response_from_API(outputValues)

        })
    }
})



