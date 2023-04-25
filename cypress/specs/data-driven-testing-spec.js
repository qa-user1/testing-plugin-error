const D = require('../fixtures/data');
const ui = require('../pages/ui-spec');
const e2e = require('../pages/e2e-actions');

D.scenarios.forEach(data => {

        beforeEach(function () {
                cy.clearAllLocalStorage()
                cy.clearAllCookies()
                cy.clearAllSessionStorage()

        })

        it(data.accountType + '___ ', () => {
                ui.login.open_base_url()
                    .verify_login_menu(D.user)
                    .enter_credentials_for_sign_in(data)
                    .redirect_user_to_the_create_a_new_account_page()
                ui.onboarding.verify_account_selection()
                e2e.complete_flow_for_creating_new_account(data)

        })
})

