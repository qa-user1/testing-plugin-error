import BasePage from "./base-page";
import S from "../fixtures/settings";
import D from "../fixtures/data";

// *************************** ELEMENTS ***************************
let
    mainContainer = e => cy.get('body'),
    mainContainerHome = e => cy.get('.client-portal-content'),
    createAccountButton = e => cy.contains('Create Account'),
    signUpButton = e => cy.contains('Sign up'),
    //visibleModal = e => cy.get('.visible-lg'),
    visibleModal = e => cy.get('[data-amplify-authenticator=""]'),
    loginErrorMsg = e => cy.get('.amplify-alert'),
    //textDescription = e => cy.get('.textDescription-customizable '),
    textDescription = e => cy.get('.amplify-heading'),
    createNewAccount = e => cy.get('[data-test="clientPortal-createNewAccount-btn"]'),
    //usernameInput = e => visibleModal().find('#signInFormUsername'),
    usernameInput = e => visibleModal().find('#amplify-id-0'),
    emailInputafterResetPassword = e => visibleModal().find('#amplify-id-18'),
    passwordInput = e => visibleModal().find('#amplify-id-2'),
    passwordInputafterResetPassword = e => visibleModal().find('#amplify-id-20'),
    signInButton = e => visibleModal().find('.amplify-button--primary'),
    emailInput = e => visibleModal().find('#amplify-id-6'),
    emailInputLivePortal = e => cy.get('#amplify-id-0'),
    emailInputWalkTheWorld = e => cy.get('[placeholder="name@host.com"]').eq(0),
    emailInputResetPass = e => cy.get('[name="username"]'),
    phoneNumberInput = e => visibleModal().find('#amplify-id-9'),
    phoneNumberInputLivePortal = e => cy.get('#amplify-id-3'),
    phoneNumberInputWalkTheWorld = e => cy.get('[name="requiredAttributes[phone_number]"]').eq(0),
    //givenNameInput = e => visibleModal().find('#amplify-id-11'),
    givenNameInput = e => visibleModal().find('[name="given_name"]'),
    givenNameInputLivePortal = e => cy.get('#amplify-id-5'),
    givenNameInputWalkTheWorld = e => cy.get('[name="requiredAttributes[given_name]"]').eq(0),
    //passwordSignUpInput = e => visibleModal().find('#amplify-id-13'),
    passwordSignUpInput = e => visibleModal().find('[name="password"]'),
    passwordSignUpInputLivePortal = e => cy.get('#amplify-id-7'),
    passwordSignUpInputWalkTheWorld = e => cy.get('[placeholder="Password"]').eq(0),
    //passwordSignUpConfirmInput = e => visibleModal().find('#amplify-id-15'),
    passwordSignUpConfirmInput = e => visibleModal().find('[name="confirm_password"]'),
    passwordSignUpConfirmInputLivePortal = e => cy.get('#amplify-id-9'),
    createAccountSubmitButton = e => visibleModal().find('.amplify-button--primary'),
    //authenticationCode = e => cy.get('#verification_code'),
    authenticationCode = e => cy.get('#amplify-id-23'),
    forgotPassButton = e => cy.get('[class="amplify-button amplify-field-group__control amplify-button--link amplify-button--small"]'),
    sendCodeButton = e => cy.contains('Send code'),
    code = e => cy.get('#amplify-id-9'),
    newPassword = e => cy.get('#amplify-id-11'),
    confirmPassword = e => cy.get('#amplify-id-13'),
    submitButton = e => cy.contains('Submit'),
    signUpConfirmButton = e => cy.get('[name="signUpButton"]').eq(0)


export default class LoginPage extends BasePage {

    constructor() {
        super()
    }

    // *************************** ACTIONS ***************************

    enter_credentials_and_click_Sign_In(username, pass) {
        usernameInput().clear();
        passwordInput().clear();
        let user = {
            username: username,
            password: pass
        }
        this.check_for_Cognito_message_and_perform_login(user)
        return this;
    }

    enter_credentials_and_click_Sign_In_after_reset_password(username, pass) {
        emailInputafterResetPassword().type(username);
        passwordInputafterResetPassword().type(pass);
        signInButton().click()
        return this;
    }


    enter_credentials_for_sign_in(data) {
        let type = data.accountType
        if (type === 'Individual-IB' || type === 'Joint-IB' || type === 'Company-IB' || type === 'Trust-IB' || type === 'Personal Super-IB' || type === 'SMSF-IB') {
            this.enter_credentials_and_click_Sign_In(data.username, data.password)
        } else if (type === 'Personal Super' || type === 'Individual' || type === 'SMSF' || type === 'Joint' || type === 'Trust' || type === 'Company') {
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
        passwordSignUpConfirmInput().type(data.password)
        return this;
    }

    enter_credentials_for_sign_up_on_live_portal(data) {
        emailInputLivePortal().type(data.email);
        phoneNumberInputLivePortal().type(data.phoneNumber);
        givenNameInputLivePortal().type(data.givenName);
        passwordSignUpInputLivePortal().type(data.password);
        passwordSignUpConfirmInputLivePortal().type(data.password)
        return this;
    }

    change_area_code() {
        cy.get('select').select('+1')
        return this;
    }

    click_create_account_button() {
        createAccountButton().click({force: true});
        return this;
    }

    click_sign_up_button() {
        signUpButton().click({force: true});
        return this;
    }

    click_sign_up_confirm_button() {
        signUpConfirmButton().click();
        return this;
    }

    click_submit_create_account_button() {
        createAccountSubmitButton().click();
        return this;
    }

    check_for_Cognito_message_and_perform_login(user) {
        let self = this
        cy.wait(1000)
        mainContainer().invoke('text').then(function (text) {
            cy.log('text found ' + text)
            if (text.includes('Sign in to your account')) {
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
        createNewAccount().invoke('removeAttr', 'target').click({force: true})
        return this;
    }

    verify_login_menu() {
        let self = this
        cy.wait(1000)
        mainContainer().invoke('text').then(function (text) {
            if (text.includes('Sign in to your account')) {
                visibleModal().should('be.visible');
                textDescription().should('be.visible')
                usernameInput().should('be.visible');
                passwordInput().should('be.visible');
                signInButton().should('be.visible');
            } else {
                for (let i = 0; i < 1; i++) {
                    cy.wait(2000)
                    mainContainer().invoke('text').then(function (text) {
                        if (text.includes('Sign in to your account')) {
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

            if (text.includes('Sign up new account')) {
                visibleModal().should('be.visible');
                emailInputResetPass().should('be.visible')
                phoneNumberInput().should('be.visible');
                givenNameInput().should('be.visible');
                passwordSignUpInput().should('be.visible');
                createAccountButton().should('be.visible');
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
                        self.click_create_account_button()
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
        createAccountSubmitButton().click()
        return this;
    }

    verify_error_message(errorMsg) {
        loginErrorMsg().should('have.text', errorMsg);
        return this;
    }

    enter_authentication_code(otpcode) {
        authenticationCode().type(otpcode)
        return this;
    }

    click_forgot_password_button() {
        forgotPassButton().click();
        return this;
    }

    enter_email_for_reset_password(data) {
        emailInputResetPass().type(data);
        return this;
    }

    click_send_code_button() {
        sendCodeButton().click();
        return this;
    }

    enter_code_for_reset_password(data) {
        code().type(data);
        return this;
    }

    enter_and_confirm_new_password(data) {
        newPassword().type(data);
        confirmPassword().type(data);
        return this;
    }

    click_submit_button() {
        submitButton().click();
        return this;
    }

}
