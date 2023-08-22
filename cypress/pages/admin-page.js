import BasePage from "./base-page";
import S from "../fixtures/settings";
import {currentDate} from "../support/e2e-helper";
import D from "../fixtures/data";

// *************************** ELEMENTS ***************************


let
    adminHeader = e => cy.get('[data-testid="nucleus-header-navbar"]'),
    kanbans = e => cy.contains('Kanbans'),
    stats = e => cy.contains('Stats'),
    sales = e => cy.contains('Sales'),
    trading = e => cy.contains('Trading'),
    data = e => cy.contains('Data'),
    nonClientCertifiedDocs = e => cy.get('[id="nonClientCertifiedDocs"]'),
    investmentAccountSearch = e => cy.get('[id="investmentAccountSearch"]'),
    insuranceKanban = e => cy.get('[href="/crm/insurance-kanban"]'),
    onboardingKanban = e => cy.get('[href="/crm/onboarding-kanban"]'),
    investedKanban = e => cy.get('[href="/crm/invested-kanban"]'),
    cashflowKanban = e => cy.get('[href="/crm/cashflow-kanban"]'),
    kanbanConfig = e => cy.get('[href="/crm/kanban-config"]'),
    propertyCalculator = e => cy.get('[href="/property-calculator"]'),
    ethicalInvestment = e => cy.get('[href="/calculators/ethical-investment"]'),
    investmentSuitability = e => cy.get('[href="/calculators/investment-suitability"]'),
    callStats = option => cy.get(option),
    marketingStats = e => cy.get('[href="/crm/marketing-stats"]'),
    signupStats = e => cy.get('[href="/crm/signup-stats"]'),
    keyProspects = e => cy.get('[href="/crm/key-prospects"]'),
    agileTasks = e => cy.get('[href="/crm/agile-tasks"]'),
    contactClients = e => cy.get('[href="/crm/contact-clients"]'),
    brokerageFreeOffer = e => cy.get('[href="/crm/brokerage-free-offer"]'),
    tradeRecent = e => cy.get('[href="/crm/trade-recent"]'),
    tradeWeights = e => cy.get('[href="/crm/trade-weights"]'),
    importantFollowUps = e => cy.get('[href="/crm/important-follow-ups"]'),
    client = e => cy.get('[href="/crm/data-clients"]'),
    research = e => cy.get('[href="/crm/data-research"]'),
    investor1 = e => cy.contains('Investor 1'),
    investor2 = e => cy.contains('Investor 2'),
    bankDetails = e => cy.contains('Bank Details'),
    accountSettingsHistory = e => cy.contains('Account Settings & History (Data Snapshots)'),
    searchBar = e => cy.get('[placeholder="Search for an investment account, using id, name, email, or SMA"]'),
    resultsTable = e => cy.get('[class="ant-table-container"]').eq(0).find('tbody'),
    viewTableButton = e => resultsTable().children('tr').find('td').eq(7),
    clientsPortal = e => cy.get('[href="https://testwebserver.nucleuswealth.com/client-portal/investment-account/445/account-dashboard"]')


export default class AdminPage extends BasePage {

    constructor() {
        super()
    }

    // *************************** ACTIONS ***************************

    verify_admin_homepage() {
        cy.url().should('include', 'admin');
        return this;
    }

    verify_admin_navbar() {
        adminHeader().should('be.visible');
        adminHeader().should('contain', 'Research Portal')
            .and('contain', 'Onboarding')
            .and('contain', 'CRM')
            .and('contain', 'Calculators')
            .and('contain', 'Logout')
        return this;
    }

    click_CRM_on_header() {
        this.pause(3)
      //  cy.contains('CRM').click();
        cy.get('.submenu-title-wrapper').click();
        this.pause(2)
        return this;
    }

    click_calculators_on_header() {
        cy.contains('Calculators').click();
        this.pause(2)
        return this;
    }

    click_kanbans_submenu() {
        kanbans().should('be.visible')
        kanbans().click();
       // this.pause(2)
        return this;
    }

    click_stats_submenu() {
        stats().should('be.visible')
        cy.contains('span.ant-menu-title-content', 'Stats').click();
      //  this.pause(5)
      //  stats().click();
      //  this.pause(2)
        return this;
    }

    click_sales_submenu() {
        sales().should('be.visible')
        sales().click();
      //  this.pause(2)
        return this;
    }

    click_key_prospects() {
        keyProspects().should('be.visible')
        keyProspects().click({force: true});
       // this.pause(2)
        return this;
    }

    click_agile_tasks() {
        agileTasks().should('be.visible')
        agileTasks().click({force: true});
       // this.pause(2)
        return this;
    }

    click_contact_clients() {
        contactClients().should('be.visible')
        contactClients().click({force: true});
       // this.pause(2)
        return this;
    }

    click_brokerage_free_offer() {
        brokerageFreeOffer().should('be.visible')
        brokerageFreeOffer().click({force: true});
       // this.pause(2)
        return this;
    }

    click_trading_submenu() {
        trading().should('be.visible')
        trading().click();
        //this.pause(2)
        return this;
    }

    click_trade_recent() {
        tradeRecent().should('be.visible')
        tradeRecent().click({force: true});
      //  this.pause(2)
        return this;
    }

    click_trade_weights() {
        tradeWeights().should('be.visible')
        tradeWeights().click({force: true});
       // this.pause(2)
        return this;
    }

    click_important_follow_ups() {
        importantFollowUps().should('be.visible')
        importantFollowUps().click({force: true});
       // this.pause(2)
        return this;
    }

    click_data_submenu() {
        data().click();
        return this;
    }

    click_client() {
        client().should('be.visible')
        client().click({force: true});
        //this.pause(2)
        return this;
    }

    click_research() {
        research().should('be.visible')
        research().click({force: true});
      //  this.pause(2)
        return this;
    }

    click_non_client_certified_docs() {
        nonClientCertifiedDocs().should('be.visible')
        nonClientCertifiedDocs().click();
       // this.pause(2)
        return this;
    }

    click_investment_account_search() {
        investmentAccountSearch().should('be.visible')
        investmentAccountSearch().click();
       // this.pause(2)
        return this;
    }

    click_property_calculator() {
        propertyCalculator().should('be.visible')
        propertyCalculator().click();
        //this.pause(2)
        return this;
    }

    click_ethical_investment() {
        ethicalInvestment().should('be.visible')
        ethicalInvestment().click();
       // this.pause(2)
        return this;
    }

    click_investment_suitability() {
        investmentSuitability().should('be.visible')
        investmentSuitability().click();
      //  this.pause(2)
        return this;
    }


    click_insurance_kanban() {
        insuranceKanban().should('be.visible')
        insuranceKanban().click({force: true});
       // this.pause(2)
        return this;
    }

    click_onboarding_kanban() {
        onboardingKanban().should('be.visible')
        onboardingKanban().click({force: true});
       // this.pause(2)
        return this;
    }

    click_invested_kanban() {
        investedKanban().click({force: true});
        this.pause(2)
        return this;
    }

    click_cashflow_kanban() {
        cashflowKanban().click({force: true});
        this.pause(2)
        return this;
    }

    click_kanban_config() {
        kanbanConfig().click({force: true});
        this.pause(3)
        return this;
    }

    click_call_stats(option) {
        callStats(option).click({force: true});
        this.pause(2)
        return this;
    }

    click_marketing_stats() {
        marketingStats().should('be.visible');
        marketingStats().click();
        this.pause(2)
        return this;
    }

    click_signup_stats() {
        signupStats().click({force: true});
        this.pause(2)
        return this;
    }

    verify_link(value1, value2) {
        this.pause(2)
        cy.url().should('include', value1).and('include', value2)
        this.pause(2)
        return this;
    }

    search_account_id(id){
        searchBar().type(id)
        this.pause(2)
        return this;
    }

    click_view_table_button(){
viewTableButton().click();
return this;
    }

    verify_account_details_on_admin_page(){
        this.verify_text_is_visible('Investor 1');
        this.verify_text_is_visible('Investor 2');
        this.verify_text_is_visible('Bank Details');
        this.verify_text_is_visible('Account Settings & History (Data Snapshots)');
        this.verify_text_is_visible('Administration Settings');
        this.verify_text_is_visible('Snoozes/Kanban Comments');
        this.verify_text_is_visible('Third Party Authority');
        this.verify_text_is_visible('Update to MTS Standard In Prae');
return this;
    }

    click_clients_portal(){
        clientsPortal().invoke('removeAttr', 'target').click()
        return this;
    }

    click_investor_1(){
        investor1().click();
        return this;
    }

    verify_investor_1_panel(){
        this.verify_text_is_visible('General Details');
        this.verify_text_is_visible('Verifications');
        this.verify_text_is_visible('Certified Document');
        this.verify_text_is_visible('Employment Details');
        return this;
    }

    click_account_settings_and_history(){
        accountSettingsHistory().click();
        return this;
    }

    verify_account_settings_and_history_panel(){
        this.verify_text_is_visible('Platform Transactions');
        this.verify_text_is_visible('Current Settings');
        this.verify_text_is_visible('Initial Onboarding Settings');
        this.verify_text_is_visible('Pending Change - Not submitted');
        this.verify_text_is_visible('Submitted: Jun 27, 2022 6:22 AM');
        this.verify_text_is_visible('Submitted: Feb 28, 2022 7:15 AM');
        this.verify_text_is_visible('Submitted: Feb 25, 2022 7:12 AM');
        this.verify_text_is_visible('Submitted: Feb 8, 2022 5:54 AM');
        this.verify_text_is_visible('Submitted: Dec 31, 2021 8:29 AM');
return this;
    }

    click_current_settings(){
        cy.contains('Current Settings').click();
        return this;
    }
    verify_current_settings(data){
        this.verify_text_is_visible(data.snapshotDetails);
        this.verify_text_is_visible(data.portfolioWeights);
        this.verify_text_is_visible(data.ethicsSettings);
        this.verify_text_is_visible(data.securitiesExcluded);
        this.verify_text_is_visible(data.securitiesSubstituted);
        return this;
    }
}