const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');
//const ACCOUNT_SID = process.env.ACCOUNT_SID;
const accountSid = "ACffe191b22bc5c5e79bc4cbbe35fabec8";
//const AUTH_TOKEN = process.env.AUTH_TOKEN;
const authToken = "5d9cdeb50ae78b2e5df7868ac201afae";

context('15. Test 2 Factor Login is working', () => {

    beforeEach(function () {
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

        D.newUser.email = 'testing+mfa' + D.getNewRandomNumber() + '@nucleuswealth.com'
        D.newUser.password = 'Testing1234!'
        D.newUser.phoneNumber = '4178052843'

        ui.login.open_base_url()
            .verify_login_menu(D.user)
            .click_create_account_button()
            .verify_sign_up_login_menu(D.newUser)
            .enter_credentials_for_sign_up(D.newUser)
            .change_area_code()
            .click_submit_create_account_button()
    });



    it('Get SMS and apply it in 2FA form', () => {
        cy.wait(10000)
        cy.request({
            method: 'GET',
            url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            auth: {
                username: accountSid,
                password: authToken,
                AuthMethod: 'BasicAuth',
            }
        })
            .its('body').then((res) => {
            cy.wait(10000) //wait for SMS
            const otpcode = res.messages[0].body.substring(26, 32)
            ui.login.enter_authentication_code(otpcode)
           // cy.wait(5000)
            ui.login.click_confirm_account()
            ui.onboarding.verify_account_selection()
        })
    });

})