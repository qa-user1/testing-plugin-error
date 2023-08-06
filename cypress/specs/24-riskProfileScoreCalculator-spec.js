const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');


context('24. Onboarding Portal - Risk Profile Score Calculator', () => {


        /* beforeEach(function () {
             Cypress.Cookies.debug(true)
             Cypress.Cookies.defaults({
                 preserve: /secure|ntercom|XSRF-TOKEN|__hssc|hubspotutk|__hstc|_fbp|cognito|__Secure-next-auth.callback-url|__Secure-next-auth.session-token|__Host-next-auth.csrf-token/,
             })
         });*/

        before(function () {
            /*Cypress.Cookies.debug(true)
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
                .enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
                .redirect_user_to_the_create_a_new_account_page()
            ui.onboarding.verify_account_selection()
        })

        it('2. Create new Personal Super Account', function () {
            ui.onboarding
                .click_create_new_investment_account()
                .click_super_type()
                .click_personal_super_subtype()
                .click_create_investment_account()
                .go_through_tour_steps(C.investmentStepMessages)
                .verify_investment_choice_page()
            cy.saveLocalStorage();
        })

        it('3. Complete Investment Choice', function () {
            ui.onboarding.click_limited_advice_button()
                .select_all_checkboxes(6)
                .click_Save_and_Continue_button()
                .verify_risk_profile_page()


            return cy.request({
                method: 'GET',
                url: 'https://sheets.googleapis.com/v4/spreadsheets/1WXSpFqMGs3-iVP5WtORKnxdki66ZgdvnJCxxTlVEHG8/values/testing_input_output_super_limitedadvice?key=AIzaSyDPfXkZQt0fnJcz5vw26d6kROxWBYVV3gc',
                failOnStatusCode: false
            }).then(response => {

                const firstValueInArray = response.body.values[0][0]

                cy.log('first value in array ' + JSON.parse(firstValueInArray).input)
                cy.log('first question in first array ' + JSON.parse(firstValueInArray).input[0].q)
                cy.log('first answer in first array ' + JSON.parse(firstValueInArray).input[0].a)

                let inputValues = JSON.parse(firstValueInArray).input
                let outputValues = JSON.parse(firstValueInArray).output

                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[0].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[1].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[2].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[3].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[4].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[5].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[6].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[7].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[8].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[9].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[10].a)
                ui.onboarding.answerQuestionsWithSpecificOptionBasedOnText(inputValues[11].a)
                ui.onboarding.enter_financial_info_based_on_text_from_API(JSON.parse(firstValueInArray))
                ui.onboarding.click_Save_and_Continue_button()
                ui.onboarding.verify_screen_and_tilts_page()
                    .select_ethical_option(D.scenarios[0].ethicalOverlay)
                    .click_Save_and_Continue_button()
                    .verify_super_fund_entry_page()
                    .enter_values_on_super_fund_entry(D.scenarios[0].fundEntryInputFields, D.scenarios[0].bankDetails)
                    .click_Save_and_Continue_button()
                    .verify_review_page()
                    .verify_output_values_based_on_response_from_API(outputValues)


              //  cy.writeFile('S3_bucket/' + 'test2.json', values)

            })
        })


        let test = {
            "input": [
                {
                    "q": "What is your primary objective for investing your superannuation with Nucleus Wealth?",
                    "a": "You are seeking a direct share style of superannuation investment"
                },
                {
                    "q": "How would you describe your current investment experience?",
                    "a": "Don't know"
                },
                {
                    "q": "What do you want to achieve from your investment with Nucleus Wealth?",
                    "a": "My focus is on investment growth. I am not interested in generating income"
                },
                {
                    "q": "When will you need to withdraw more than 30% of your superannuation account? For most people this will be age 60 and above.",
                    "a": "25 or more years"
                },
                {
                    "q": "When you think of the word 'risk' in a financial context, which of the following words comes to mind first?",
                    "a": "Don't know"
                },
                {
                    "q": "What degree of risk have you taken with your financial decisions in the past?",
                    "a": "Don't know"
                },
                {
                    "q": "Would you borrow money to make an investment (other than for residential property)?",
                    "a": "Yes"
                },
                {
                    "q": "Investments can go up or down in value and experts often say you should be prepared to weather a downturn. By how much could the total value of all your investments go down in 3 months before you would begin to feel uncomfortable?",
                    "a": "20%"
                },
                {
                    "q": "How would you react if the value of your portfolio fell by more than 15% in any year?",
                    "a": "I would seek more information with a predisposition to investing more if the risks seem manageable"
                },
                {
                    "q": "Which one of the following best describes your attitude to market volatility when choosing an investment?",
                    "a": "I am comfortable including investments with a higher degree of capital fluctuation in my portfolio, but like to maintain a small amount of stable investments to smooth returns over time"
                },
                {
                    "q": "Imagine you just received a $50,000 windfall - what would you look to immediately do with it?",
                    "a": "Leave a portion in cash, say $10,000, and look to invest the rest in a term deposit"
                },
                {
                    "q": "When deciding on your investment composition what would you like?",
                    "a": "I want my assets to be maintained at my target weights; with shares/bonds determined by index weights (known as passive investment) which may have lower fees but also higher volatility"
                },
                {"q": "Birth Year", "a": "1998"}, {"q": "Annual Income", "a": "60000"}, {
                    "q": "Amount Invested",
                    "a": "100000"
                },
                {"q": "Liquid Wealth", "a": "100000"},
                {"q": "Total Wealth", "a": "150000"}],
            "output": {
                "x": 0,
                "y": 10,
                "safety": 3,
                "growth": {"max": 100, "min": 99},
                "income": {"max": 0, "min": -1},
                "accum": {"max": 0, "min": -1}
            }
        }
    }
)
