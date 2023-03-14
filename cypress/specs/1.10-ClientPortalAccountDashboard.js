const ui = require('../pages/ui-spec');
const D = require('../fixtures/data');
const C = require('../fixtures/constants');

context('Client Portal - Account Dashboard', () => {


    beforeEach(function () {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
    })


    it.only('1. Direct user to “Your Accounts” page', () => {
        cy.log('Attempt #1')
        ui.login.open_base_url()
            .verify_login_menu(D.user)
        ui.login.enter_credentials_and_click_Sign_In(D.user.username, D.user.password)
        ui.clientPortal.click_your_accounts_link()
            .verify_your_accounts_page()
        ui.clientPortal.verify_your_accounts_page()
            .catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    cy.log('Retrying...')
                    cy.wait(5000) // Wait for 5 seconds before retrying
                    cy.retry()
                } else {
                    throw error
                }
            })
    })


    it('2. Overall asset summary panel', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.clientPortal.verify_overall_asset_summary_panel('0')
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })


    it('3. Direct user to Account Dashboard', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.clientPortal.check_investment_account_panel()
                    .verify_target_weight_total()
                    .verify_content_of_investment_account_panel()
                    .click_view_account_details()
                    .verify_account_dashboard()
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })

    it('4. Check Tactical Panel', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.login.open_base_url()
                ui.clientPortal.click_your_accounts_link()
                    .click_view_account_details()
                ui.clientPortal.click_tactical_panel()
                    .verify_tactical_headings()
                    .click_additional_assets()
                    .verify_additional_assets_input_fields()
                    .enter_cash_and_own_home_values(D.tacticalAdditionalAssets)
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })

    it('5. Expand Strategic', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.clientPortal.click_strategic_panel()
                    .compare_snapshots()
                    .verify_change_portfolio_button()
                    .click_strategic_panel()
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })


    it('6. Expand Ethics/Exclusions', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.clientPortal.click_ethics_panel()
                ui.onboarding.verify_chosen_ethics([
                    ['Climate Change', ['No Fossil Fuels (Worst Offenders)', 'No Fossil Fuels (Any)']],
                    ['War', ['No Arms (Any)']]
                ])
                ui.clientPortal.verify_change_ethics_button()
                    .click_ethics_panel()
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })

    it('7. Expand Portfolio', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
                ui.clientPortal.click_portfolio_panel()
                    .verify_change_ethics_button2()
                    .verify_change_portfolio_button2()
                    .verify_nucleus_portfolio_allocations()
                    .verify_security_holdings()
                    .verify_security_column()
                    .click_portfolio_panel()
                cy.saveLocalStorage()
                    .then(() => {
                        resolve();
                    })
                /*.catch((error) => {
                    reject(error);
                });*/
            });
        }

        function runTestWithRetry(retries = 3) {
            if (retries <= 0) {
                throw new Error('Maximum number of retries reached');
            }
            return runTest().catch((error) => {
                if (error.message.includes('ECONNRESET')) {
                    return runTestWithRetry(retries - 1);
                } else {
                    throw error;
                }
            });
        }

        return runTestWithRetry();
    })

    it('8. Expand Performance', function () {
        function runTest() {
            return new Promise((resolve, reject) => {
            ui.clientPortal.click_performance_panel()
                .verify_performance_titles()
                .verify_performance_card('0', '2')
                .verify_performance_card('1', '3')
                .verify_performance_card('2', '4')
                .verify_performance_card('3', '5')
            cy.saveLocalStorage()
                .then(() => {
                    resolve();
                })
            /*.catch((error) => {
                reject(error);
            });*/
        }

    )
        ;
    }

    function runTestWithRetry(retries = 3) {
        if (retries <= 0) {
            throw new Error('Maximum number of retries reached');
        }
        return runTest().catch((error) => {
            if (error.message.includes('ECONNRESET')) {
                return runTestWithRetry(retries - 1);
            } else {
                throw error;
            }
        });
    }

    return runTestWithRetry();
})

})

