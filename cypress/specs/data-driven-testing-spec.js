const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
//const d = D.scenarios[0]
const d1 = D.scenarios[0];
const d2 = D.scenarios[1];


D.scenarios.forEach(data => {

        beforeEach(function () {
                cy.clearAllLocalStorage()
                cy.clearAllCookies()
                cy.clearAllSessionStorage()

        })

        it(data.name + '___ ', () => {
                ui.login.open_base_url()
                    .verify_login_menu(D.user)
                    .enter_credentials_for_sign_in(data)
                    .redirect_user_to_the_create_a_new_account_page()
                ui.onboarding.verify_account_selection()
                ui.onboarding.complete_flow_for_creating_new_account(data)

        })
})

