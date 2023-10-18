const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');

context('21. Forgot password function', () => {

    before(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })

    it('1. Direct to forgot password page', function () {
        ui.login.open_base_url()
            .verify_login_menu()
            .click_forgot_password_button()
            .verify_text_is_visible('Enter your username')
    })

    it('2. Reset password', function () {
          if (Cypress.env('cypressRunnerLocal') === true) {
              ui.app.clear_gmail_inbox()
          }
        ui.login.enter_email_for_reset_password('testing+forgotpassword@nucleuswealth.com')
            .click_send_code_button()
        ui.app.verify_email_and_save_values(D.gmailAccount,
            'code', 'Your password reset code is', 'You received this message because you are subscribed to the Google Groups')

        cy.getAllLocalStorage().then((result) => {
            D.gmailAccount.code = result['https://testwebserver.nucleuswealth.com'].code
            ui.login.enter_code_for_reset_password(D.gmailAccount.code)
                .enter_and_confirm_new_password(D.gmailAccount.newPass)
                .click_submit_button()
            ui.login.enter_credentials_and_click_Sign_In('testing+forgotpassword@nucleuswealth.com', D.gmailAccount.newPass)
            ui.onboarding.verify_account_selection()
        })

    })


})

