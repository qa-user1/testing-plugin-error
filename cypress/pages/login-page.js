import BasePage from "./base-page";
import S from "../fixtures/settings";
import D from "../fixtures/data";

// *************************** ELEMENTS ***************************
let
    mainContainer = e => cy.get('body'),
    mainContainerHome = e => cy.get('.client-portal-content'),
    signUpButton = e => cy.contains('Sign up'),
    visibleModal = e => cy.get('.visible-lg'),
    loginErrorMsg = e => cy.get('#loginErrorMessage'),
    textDescription = e => cy.get('.textDescription-customizable '),
    createNewAccount = e => cy.get('[data-test="clientPortal-createNewAccount-btn"]'),
    usernameInput = e => visibleModal().find('#signInFormUsername'),
    passwordInput = e => visibleModal().find('#signInFormPassword'),
    signInButton = e => visibleModal().find('[name="signInSubmitButton"]'),
    emailInput = e => visibleModal().find('[name="username"]'),
    emailInputResetPass = e => cy.get('[name="username"]'),
    phoneNumberInput = e => visibleModal().find('[name="requiredAttributes[phone_number]"]'),
    givenNameInput = e => visibleModal().find('[name="requiredAttributes[given_name]"]'),
    passwordSignUpInput = e => visibleModal().find('[name="password"]'),
    signUpSubmitButton = e => visibleModal().find('[name="signUpButton"]'),
    authenticationCode = e => cy.get('#verification_code'),
    confirmAccount = e => cy.get(':nth-child(12) > .btn'),
    forgotPassButton = e => cy.get('[class="redirect-customizable"]').eq(2),
    resetPasswordButton = e => cy.get('[name="reset_my_password"]'),
    code = e => cy.get('#forgot_password_code'),
    newPassword = e => cy.get('#new_password'),
    confirmPassword = e => cy.get('#confirm_password'),
    changePasswordButton = e => cy.contains('Change Password')

export default class LoginPage extends BasePage {

    constructor() {
        super()
    }

    // *************************** ACTIONS ***************************

    enter_credentials_and_click_Sign_In(username, pass) {
        let user = {
            username: username,
            password: pass
        }
        this.check_for_Cognito_message_and_perform_login(user)
        return this;
    }

    enter_credentials_for_sign_in(data) {
        let type = data.accountType
        if (type === 'Individual-IB' || type === 'Joint-IB' || type === 'Company-IB' || type === 'Trust-IB' || type === 'Personal Super-IB'|| type === 'SMSF-IB') {
            this.enter_credentials_and_click_Sign_In(data.username, data.password)
        }
        else if (type === 'Personal Super' || type === 'Individual'|| type === 'SMSF' || type === 'Joint' || type === 'Trust' || type === 'Company') {
            this.enter_credentials_and_click_Sign_In(data.username, data.password)
        }
        return this;
    }




    enter_wrong_credentials_and_click_Sign_In(username, pass) {
        let user = {
            username: username,
            password: pass
        }
        usernameInput().type(user.username);
        passwordInput().type(user.password);
        signInButton().click()
        return this;
    }

    enter_credentials_for_sign_up(data) {
       emailInput().type(data.email);
       phoneNumberInput().type(data.phoneNumber);
       givenNameInput().type(data.givenName);
       passwordSignUpInput().type(data.password);
        return this;
    }

    click_sign_up_button() {
        signUpButton().click({force:true});
        return this;
    }

    click_submit_sign_up_button() {
        signUpSubmitButton().click();
        return this;
    }

    check_for_Cognito_message_and_perform_login(user) {
        let self = this
        cy.wait(1000)
        mainContainer().invoke('text').then(function (text) {
            cy.log('text found ' + text)
            if (text.includes('Sign in with your email and password')) {
                usernameInput().type(user.username);
                passwordInput().type(user.password);
                signInButton().click()
            } else {
              //  for (let i = 0; i < 10; i++) {
                    cy.wait(500)
                    mainContainer().invoke('text').then(function (text) {
                        // if (text.includes('Sign in with your email and password')) {
                        //     i = 10
                        //     self.check_for_Cognito_message_and_perform_login(user)
                        // }
                        if (text.includes('Sign in with Cognito')) {
                            cy.contains('Sign in with Cognito').click()
                            self.check_for_Cognito_message_and_perform_login(user)
                        }
                    });
                }
           // }
        });
        return this;
    }

    redirect_user_to_the_create_a_new_account_page() {
                mainContainerHome().should('be.visible');
                createNewAccount().invoke('removeAttr', 'target').click({force:true})
        return this;
    }

    verify_login_menu() {
        let self = this
        cy.wait(1000)
        mainContainer().invoke('text').then(function (text) {
            if (text.includes('Sign in with your email and password')) {
                visibleModal().should('be.visible');
                textDescription().should('be.visible')
                usernameInput().should('be.visible');
                passwordInput().should('be.visible');
                signInButton().should('be.visible');
            } else {
                for (let i = 0; i < 1; i++) {
                    cy.wait(2000)
                    mainContainer().invoke('text').then(function (text) {
                         if (text.includes('Sign in with your email and password')) {
                             i = 10
                             self.verify_login_menu()
                         }
                        if (text.includes('Sign in with Cognito')) {
                            cy.contains('Sign in with Cognito').click()
                            self.verify_login_menu()
                        }
                    });
                }
            }
        });
        return this;
    }

    verify_sign_up_login_menu() {
        let self = this
        mainContainer().invoke('text').then(function (text) {

            if (text.includes('Sign up with a new account')) {
                visibleModal().should('be.visible');
                emailInput().should('be.visible')
                phoneNumberInput().should('be.visible');
                givenNameInput().should('be.visible');
                passwordSignUpInput().should('be.visible');
                signUpButton().should('be.visible');
            } else {
                for (let i = 0; i < 10; i++) {
                //    cy.wait(500)
                    /*mainContainer().invoke('text').then(function (text) {
                        if (text.includes('Sign up with a new account')) {
                            i = 10
                            self.verify_sign_up_login_menu()
                        }*/
                        if (text.includes('Sign in with Cognito')) {
                            cy.contains('Sign in with Cognito').click()
                            self.verify_login_menu()
                            self.click_sign_up_button()
                        }
                   // });
                }
            }
        });
        return this;
    }

    click_Sign_in() {
        signInButton().click();
        return this;
    }

    click_confirm_account() {
confirmAccount().click()
        return this;
    }

    verify_error_message(errorMsg) {
        loginErrorMsg().should('have.text', errorMsg);
        return this;
    }

    enter_authentication_code(otpcode){
        authenticationCode().type(otpcode)
        return this;
    }

    click_forgot_password_button(){
        forgotPassButton().click();
        return this;
    }

    enter_email_for_reset_password(data){
        emailInputResetPass().type(data);
        return this;
    }

    click_reset_password_button(){
        resetPasswordButton().click();
        return this;
    }

    enter_code_for_reset_password(data) {
        code().type(data);
        return this;
    }

    enter_and_confirm_new_password(data){
        newPassword().type(data);
        confirmPassword().type(data);
        return this;
    }

    click_change_password_button(){
        changePasswordButton().click();
        return this;
    }

}
