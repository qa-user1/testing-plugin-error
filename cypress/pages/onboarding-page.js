import BasePage from "./base-page";
import D, {SMSFDetails} from "../fixtures/data";

// *************************** ELEMENTS ***************************

let answer = (questionNumber, answerNumber) => cy.get('.ant-col-xxl-12').eq(questionNumber).find('.ant-radio-button-wrapper').eq(answerNumber),
    investmentAmountInput = e => cy.get('[data-test="questions-investment-input"]'),
    expendedSectionOnReviewPage = e => cy.get('.ant-collapse-content-active'),
    questionsOnReviewPage = index => cy.get('[data-test="review-questionResponses-question"]').eq(index),
    answersOnReviewPage = index => cy.get('[data-test="review-questionResponses-answer"]').eq(index),
    ethicalOverlaySubsectionTitle = e => expendedSectionOnReviewPage().find('[data-test="review-ethicGroup-selectedTitle"]'),
    sideMenu = e => cy.get('.ant-menu ant-menu-dark ant-menu-root ant-menu-inline'),
    sideMenuInvestmentChoice = e => sideMenu().find('[href="/onboarding/2999/investment-choice"]'),
    limitedAdvice = e => cy.get(':nth-child(2) > .ant-radio-button-wrapper'),
    investmentChoice = e => cy.get('[href="/onboarding/2999/investment-choice"]'),
    documentType = e => cy.get('#greenid_upload_filetype'),
    dateInputField2 = e => cy.get('[data-test="applicants-dob-input"]'),
    bsbInput = e => cy.get('[data-test="bankDetails-bsb-input"]'),
    accountNumberInput = e => cy.get('[data-test="bankDetails-accountNumber-input"]'),
    financialInstitutionInput = e => cy.get('[data-test="bankDetails-financialInstitution-input"]'),
    accountNameInput = e => cy.get('[data-test="bankDetails-accountName-input"]'),
    ethicalOverlayButtonOnReview = e => cy.get('.review-ethicalOverlay-btn'),
    yourPortfolioButtonOnReview = e => cy.get('.ant-collapse-header').eq(2),
    individualAccountNumber = e => cy.get('[data-test="onboarding-rightHeader-title"]'),
    strategicAssetAllocationSection_firstParagraph = e => cy.contains('Based on the above products'),
    strategicAssetAllocationSection_thirdParagraph = e => cy.contains('The chance of a negative return'),
    cashColumns = e => cy.contains('AUDCASH').parent('tr').find('td'),
    indicativePortfolio_table1_rows = e => cy.contains('AUDCASH').parent('tr').parent('tbody').find('tr'),
    excludedSecurityTable_rows = e => cy.contains('Volkswagen (VOW3)').parent('tr').parent('tbody').find('tr'),
    feesTable_rows = e => cy.contains('On Going Fees').parent('tr').parent('tbody').find('tr'),
    disclaimer = e => cy.get('.ant-alert-content'),
    disclaimerBox = e => cy.get('.ant-alert-with-description'),
    disclaimerDescription = e => cy.get('.ant-alert-description'),
    newInvestmentButton = e => cy.get('[data-test="accountSelection-createNewApp-btn"]'),
    createInvestmentButton = e => cy.get('[data-test="accountTypeChoice-create-btn"]'),
    investmentLayout = e => cy.get('.jsx-3291860312'),
    investmentSuperType = e => cy.get(':nth-child(1) > .ant-radio-button-wrapper > :nth-child(2) > :nth-child(1)'),
    investmentNonSuperType = e => cy.get(':nth-child(2) > .ant-radio-button-wrapper > :nth-child(2) > :nth-child(1)'),
    personalSuperType = e => cy.get('.ant-card-body > .ant-row > :nth-child(1) > .ant-radio-button-wrapper'),
    SMSFSuperType = e => cy.get('.ant-card-body > .ant-row > :nth-child(2) > .ant-radio-button-wrapper'),
    agreementBox = e => cy.get('.ant-alert-message'),
    // saveContinueButton = e => cy.contains('Save and Continue'),
    saveContinueButton = e => cy.get('[data-test="next-btn"]'),
    submitApplicationButton = e => cy.contains('Submit Application'),
    tacticalGrowthField = e => cy.get('#portfolios_1'),
    tacticalIncomeField = e => cy.get('#portfolios_2'),
    tacticalAccumulationField = e => cy.get('#portfolios_3'),
    coreInternationalField = e => cy.get('#portfolios_6'),
    Q1 = e => cy.contains('You have identified the following reasons for your interest in investing in our models:'),
    Q1PersonalSuperAccount = e => cy.contains('What is your primary objective for investing your superannuation with Nucleus Wealth?'),
    Q1_validationMessage = e => cy.contains('You have identified the following reasons for your interest in investing in our models:').parent().parent().parent().find('[role="alert"]'),
    coreInternationalValidationMessage = e => cy.contains('Core International').parent().parent().parent().find('[role="alert"]'),
    coreAustraliaValidationMessage = e => cy.contains('Core Australia').parent().parent().parent().find('[role="alert"]'),
    globalLeadersValidationMessage = e => cy.contains('Global Leaders').parent().parent().parent().find('[role="alert"]'),
    australianLeadersValidationMessage = e => cy.contains('Australian Leaders').parent().parent().parent().find('[role="alert"]'),
    governmentBondLadderValidationMessage = e => cy.contains('Government Bond Ladder').parent().parent().parent().find('[role="alert"]'),
    multiAssetValidationMessage = e => cy.contains('Multi-asset Portfolios').parent().parent().parent().parent().parent().parent().find('[role="alert"]'),
    bsbValidationMessage = e => cy.contains('BSB').parent().parent().parent().find('[role="alert"]'),
    accountNumberValidationMessage = e => cy.contains('Account Number').parent().parent().parent().find('[role="alert"]'),
    financialInstitutionValidationMessage = e => cy.contains('Financial Institution').parent().parent().parent().find('[role="alert"]'),
    accountNameValidationMessage = e => cy.contains('Account Name').parent().parent().parent().find('[role="alert"]'),
    sourceTypeValidationMessage = e => cy.contains('Source Type').parent().parent().parent().parent().find('[role="alert"]'),
    sourceType = e => cy.get('#ib-details-form_sourceOfWealthList_0_sourceTypeId'),
    allowance = e => cy.get('[title="Allowance"]'),
    percentageValidationMessage = e => cy.contains('Percentage').parent().parent().parent().find('[role="alert"]'),
    percentage = e => cy.get('[id="ib-details-form_sourceOfWealthList_0_percentage"]'),
    statementOfInquiryValidationMessage = e => cy.contains('Statement of inquiry').parent().parent().parent().find('[role="alert"]'),
    statementOfInquiry = e => cy.get('[id="ib-details-form_financialInfo_soi_questionnaire"]'),
    australianLeadersField = e => cy.get('#portfolios_7'),
    multiAssetPortfolios = e => cy.get(':nth-child(2) > .ant-col-lg-24').first(),
    globalLeadersField = e => cy.get('#portfolios_8'),
    coreAustraliaField = e => cy.get('#portfolios_5'),
    governmentBondLadderField = e => cy.get('#portfolios_9'),
    stocksGlobalLeaders = e => cy.get('.ant-select-selection-item').eq(2),
    stocksAustralianLeaders = e => cy.get('.ant-select-selection-item').eq(1),
    investmentStyleFactors = e => cy.contains('Investment Style Factors'),
    qualityStocks = e => cy.get('[data-test="byp-qualityStocks-input"]'),
    valueStocks = e => cy.get('[data-test="byp-valueStocks-input"]'),
    growthStocks = e => cy.get('[data-test="byp-growthStocks-input"]'),
    defensives = e => cy.get('[data-test="byp-Defensives-input"]'),
    cleanEnergy = e => cy.get('[data-test="byp-cleanEnergy-input"]'),
    batterySupplyChain = e => cy.get('[data-test="byp-batterySupplyChain-input"]'),
    nuclearPower = e => cy.get('[data-test="byp-nuclearPower-input"]'),
    largeTechonologyStocks = e => cy.get('[data-test="byp-largeTechnologyStocks-input"]'),
    cloudComputingStocks = e => cy.get('[data-test="byp-cloudComputingStocks-input"]'),
    roboticsArtificialIntelligence = e => cy.get('[data-test="byp-robotics/ArtificialIntelligence-input"]'),
    cybersecurity = e => cy.get('[data-test="byp-Cybersecurity-input"]'),
    videoGaming = e => cy.get('[data-test="byp-videoGaming-input"]'),
    travel = e => cy.get('[data-test="byp-Travel-input"]'),
    luxuryGoods = e => cy.get('[data-test="byp-luxuryGoods-input"]'),
    logistics = e => cy.get('[data-test="byp-Logistics-input"]'),
    oilGasStocks = e => cy.get('[data-test="byp-oilGasStocks-input"]'),
    goldStocks = e => cy.get('[data-test="byp-goldStocks-input"]'),
    globalCommunicationServices = e => cy.get('[data-test="byp-globalCommunicationServices-input"]'),
    globalConsumerDiscretionary = e => cy.get('[data-test="byp-globalConsumerDiscretionary-input"]'),
    globalConsumerStaples = e => cy.get('[data-test="byp-globalConsumerStaples-input"]'),
    globalEnergy = e => cy.get('[data-test="byp-globalEnergy-input"]'),
    globalFinancials = e => cy.get('[data-test="byp-globalFinancials-input"]'),
    globalHealthCare = e => cy.get('[data-test="byp-globalHealthCare-input"]'),
    globalIndustrials = e => cy.get('[data-test="byp-globalIndustrials-input"]'),
    globalInformationTechnology = e => cy.get('[data-test="byp-globalInformationTechnology-input"]'),
    globalMaterials = e => cy.get('[data-test="byp-globalMaterials-input"]'),
    globalRealEstate = e => cy.get('[data-test="byp-globalRealEstate-input"]'),
    globalUtilities = e => cy.get('[data-test="byp-globalUtilities-input"]'),
    agribusiness = e => cy.get('[data-test="byp-Agribusiness-input"]'),
    defenseContractors = e => cy.get('[data-test="byp-defenseContractors-input"]'),
    technology = e => cy.contains('Technology'),
    consumption = e => cy.contains('Consumption'),
    commodities = e => cy.contains('Commodities'),
    military = e => cy.contains('Military'),
    gicsSector = e => cy.contains('GICS Sectors'),
    climateChangeTiltsButton = e => cy.get('[class="ant-radio-button-wrapper radio-btn-card css-86j49d"]').eq(8),
    technologyTiltsButton = e => cy.get('[class="ant-radio-button-wrapper radio-btn-card css-86j49d"]').eq(9),
    allocateCash = e => cy.get('[class="ant-switch-inner"]'),
    cash = e => cy.get('[data-test="byp-Cash-input"]'),
    investmentTotalField = e => cy.get('#investment_total'),
    alertBYPpage = e => cy.get('[data-test="byp-alert"]'),
    pageTitle = e => cy.get('[data-test="onboarding-leftHeader-title"]', {timeout: 85000}),
    pageTitle2 = e => cy.get('[data-test="clientPortal-ethicalOverlay-title"]', {timeout: 55000}),
    selectedMenuOption = e => cy.get('.ant-menu-item-selected'),
    applicantsTabSideMenu = e => cy.get('[data-test="navigation-Applicants-link"]'),
    //climateChangeButton = e => cy.get(':nth-child(1) > .ant-radio-button-wrapper'),
    climateChangeButton = e => cy.get('[class="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 css-86j49d"]').eq(0),
    ethicalOverlayBox = e => cy.get('.ant-collapse-content-box').first(),
    ethicalOverlayForm = e => cy.get('#ethical-overlay-form'),
    chosenEthicsContainer = ethicsTitle => cy.contains(ethicsTitle).parents('.ant-row'),
    climateChangeBox = e => ethicalOverlayBox().find(':nth-child(1) > .ant-card-body > :nth-child(1) > .ant-col-xs-6 > .ant-space'),
    warBox = e => ethicalOverlayBox().find(':nth-child(2) > .ant-card-body > :nth-child(1) > .ant-col-xs-6 > .ant-space'),
    ethicalOverlayPanel = e => cy.get('.review-ethicalOverlay-btn'),
    questionResponsesPanel = e => cy.get('.review-questionResponses-btn'),
    feesAndChargesPanel = e => cy.get('.review-questionResponses-btn'),
    climateChangeRow = e => cy.get(':nth-child(1) > .ant-card-body'),
    warChangeRow = e => cy.get(':nth-child(2) > .ant-card-body'),
    totalAmountAtTheTop = e => cy.get('[data-test="review-investmentAmount-text"]'),
    totalAmount = e => cy.get('[data-test="review-portfolioAmountTotal-text"]'),
    coreInternationalAmount = e => cy.get('[data-test="review-coreInternationalAmount-text"]'),
    coreInternationalPercentage = e => cy.get('[data-test="review-coreInternationalWeighting-text"]'),
    tacticalGrowthAmount = e => cy.get('[data-test="review-tacticalGrowthAmount-text"]'),
    tacticalGrowthPercentage = e => cy.get('[data-test="review-tacticalGrowthWeighting-text"]'),
    //warButton = e => cy.get(':nth-child(2) > .ant-radio-button-wrapper'),
    warButton = e => cy.contains('War'),
    removeApplicantButton = e => cy.get('[data-test="applicants-userCardRemove-btn"]'),
    userCardFirst = e => cy.get('[data-test="applicants-userCard-card"]').first(),
    userCardLast = e => cy.get('[data-test="applicants-userCard-card"]').last(),
    applicantCardMenuButton = e => cy.get('[data-test="applicants-userCardMenu-btn"]'),
    popUpWindowRemoveApplicant = e => cy.contains('Yes').parent().parent().parent().parent().parent().find('.ant-btn-primary'),
    employmentStatusHeader = e => cy.contains('Employment Status').parent().find('.ant-typography'),
    addNewApplicantCard = e => cy.get('[data-test="applicants-addApplicant0-btn"]'),
    createNewApplicantButton = e => cy.get('[data-test="applicants-createApplicant-btn"]'),
    applicantForm = e => cy.get('#theForm'),
    button = e => cy.get('[role="button"]'),
    yourPortfolioButton = e => button().contains('Your Portfolio'),
    //submitApplicantButton = e => cy.get('.ant-col ant-col-xs-12 ant-col-sm-11 ant-col-md-8 ant-col-lg-6 ant-col-xl-5 ant-col-xxl-3'),
    // submitApplicantButton = e => cy.contains('Submit Applicant'),
    submitApplicantButton = e => cy.get('[data-test="applicants-submitApplicant-btn"]'),
    titleInputField = e => cy.get('[data-test="applicants-title-input"]'),
    titleDropdownOptions = option => cy.get('.rc-virtual-list-holder-inner').contains(option),
    tiltsDropdownOptions = option => cy.get('[class="ant-select-dropdown css-86j49d ant-select-dropdown-placement-bottomLeft "]').contains(option),
    nameInputField = e => cy.get('#givenNames'),
    middleNameInputField = e => cy.get('#middleNames'),
    surnameInputField = e => cy.get('#surname'),
    emailInputField = e => cy.get('#email'),
    mobileInputField = e => cy.get('#phone'),
    dateField = e => cy.get('.ant-picker'),
    dateInputField = e => cy.get('[data-test="applicants-dob-input"]'),
    driverLicenseExpiry = e => cy.get('#theForm_driver_license_expiry'),
    yearInputField = e => cy.get('.ant-picker-year-btn'),
    todayButton = e => cy.get('.ant-picker-today-btn'),
    dropdownOption = option => cy.get('.rc-virtual-list-holder-inner').find('[title="' + option + '"]'),
    dropdownOptionStock = option => cy.get('[class="ant-select-selector"]').eq(1),
    politicalMilitaryDiplomaticDropdownOption = option => cy.get('#ib-details-form_affiliationDetail_hasAffiliation_list').parent('div').parent('div').find('[title="' + option + '"]'),
    stockIncludedDropdownOption = option => cy.get('[class="ant-select-selection-item"]').eq(2).find('[title="' + option + '"]'),
    controllerDropdownOption = option => cy.get('#ib-details-form_controllerDetail_hasController_list').parent('div').find('[title="' + option + '"]'),
    politicalMilitaryDiplomatic = e => cy.get('[class="ant-select-selector"]').eq(1),
    controller = e => cy.get('[id="ib-details-form_controllerDetail_hasController"]'),
    exchangeCode = e => cy.get('[id="ib-details-form_controllerDetail_exchangeCode"]'),
    descriptionOtherSourceType = e => cy.get('[id="ib-details-form_sourceOfWealthList_0_description"]'),
    affiliationDetailName = e => cy.get('[id="ib-details-form_affiliationDetail_name"]'),
    affiliationRelationship = e => cy.get('#ib-details-form_affiliationDetail_relationship'),
    companyEmail = e => cy.get('[id="ib-details-form_affiliationDetail_companyEmail"]'),
    employmentInputField = e => cy.get('#theForm_employmentDetail_employmentTypeId'),
    occupationInputField = e => cy.get('#theForm_employmentDetail_occupation'),
    employerNameInputField = e => cy.get('#theForm_employmentDetail_employerName'),
    employerAddressInputField = e => cy.get('#theForm_employmentDetail_employerCountry'),
    employerBusinessInputField = e => cy.get('#theForm_employmentDetail_employerBusiness'),
    employmentStatusAnnualNetIncomeInputField = e => cy.get('[id="theForm_person_annual_net_income"]'),
    employmentStatusNetWorthInputField = e => cy.get('[id="theForm_person_net_worth"]'),
    citizenshipInputField = e => cy.get('#theForm_citizenship'),
    maritalStatus = e => cy.get('#theForm_marital_status'),
    countryOfBirth = e => cy.get('#theForm_country_of_birth'),
    taxInputField = e => cy.get('[data-test="applicants-tfn-input"]'),
    genderInputField = e => cy.get('[data-test="applicants-gender-input"] > .ant-select-selector'),
    numberOfDependentsInputField = e => cy.get('#theForm_num_dependents'),
    residentialAddressInputField = e => cy.get('[data-test="applicants-residentialAddress-input"]'),
    residentialAddressTypeaheadOption = e => cy.get('[data-test="applicants-addressSuggestion-0-input"]'),
    knowledgeLevel = e => cy.get('#theForm_investmentExperience_0_knowledgeLevel'),
    tradesPerYear = e => cy.get('#theForm_investmentExperience_0_tradesPerYear'),
    numberOfYearsTrading = e => cy.get('#theForm_investmentExperience_0_yearsTrading'),
    titleInputValidationMsg = e => cy.contains('Title').parent().parent().find('[role="alert"]'),
    surnameInputValidationMsg = e => cy.contains('Surname').parent().parent().find('[role="alert"]'),
    emailInputValidationMsg = e => cy.contains('Email').parent().parent().find('[role="alert"]'),
    mobileInputValidationMsg = e => cy.contains('Mobile Phone').parent().parent().find('[role="alert"]'),
    genderInputValidationMsg = e => cy.contains('Gender').parent().parent().find('[role="alert"]'),
    birthDateInputValidationMsg = e => cy.contains('Date Of Birth').parent().parent().find('[role="alert"]'),
    citizenshipInputValidationMsg = e => cy.contains('Citizenship').parent().parent().find('[role="alert"]'),
    employmentInputValidationMsg = e => cy.contains('Employment Type').parent().parent().find('[role="alert"]'),
    taxInputValidationMsg = e => cy.contains('Australian Tax File Number').parent().parent().find('[role="alert"]'),
    givenNameValidationMsg = e => cy.contains('Given Name').parent().parent().find('[role="alert"]'),
    agreementCheckboxValidationMsg = e => cy.contains('Please check this box to proceed').parent().parent().find('[role="alert"]'),
    fundNameValidationMsg = e => cy.contains('Please select fund name').parent().parent().find('[role="alert"]'),
    transferAmountValidationMsg = e => cy.contains('Please enter a transfer amount').parent().parent().find('[role="alert"]'),
    memberNumberValidationMsg = e => cy.contains('Please enter your member number').parent().parent().find('[role="alert"]'),
    personalSuperAccountTypeValidationMsg = e => cy.contains('\'Personal Super Account Type\' field is required').parent().parent().find('[role="alert"]'),
    //identity = e => cy.get('#greenid-intro-content > h1'),
    identity = e => cy.get('#greenid-source-title-heading'),
    noEthicsSelectedMessage = e => cy.get('[data-test="review-noEthicSelected-text"]'),
    idOptionList = e => cy.contains('Choose a different ID option'),
    documentsSection = e => cy.contains('Documents').parents('.ant-collapse-item'),
    agreementSection = e => cy.contains('Agreements and Disclosures').parents('.ant-collapse-item'),
    specificDocumentSection = title => cy.contains(title).parents('[data-test="review-document-link"]'),
    uploadId = e => cy.get('#uploadifive-greenid_file_upload'),
    agreementCheckbox = e => cy.get('#submit-application-form_data_snapshot_digital_signature'),
    uploadedFileValidationMsg = e => cy.get('#greenid-intro-content > .greenid-alert'),
    fundNameInputField = e => cy.get('[data-test="superFundEntry-fundName0-select"]'),
    customFundNameInputField = e => cy.get('[data-test="superFundEntry-customFundName0-input"]'),
    transferAmountInputField = e => cy.get('[data-test="superFundEntry-transferAmount0-input"]'),
    memberNumberInputField = e => cy.get('[data-test="superFundEntry-memberNumber0-input"]'),
    personalSuperAccountTypeInputField = e => cy.get('[data-test="superDetails-personalSuperAccountType-input"]'),
    platformAdministration = e => cy.get('[data-test="superFundEntry-platformAdministration0-input"]'),
    investmentManagement = e => cy.get('[data-test="superFundEntry-investmentManagement0-input"]'),
    ETFfees = e => cy.get('[data-test="superFundEntry-eTFFeesOther0-input"]'),
    performance = e => cy.get('[data-test="superFundEntry-Performance0-input"]'),
    advice = e => cy.get('[data-test="superFundEntry-Advice0-input"]'),
    accumulationChoice = e => cy.get('[data-test="superDetails-personalSuperAccountType-input-accumulation"]'),
    manuallyEnterFeesButton = e => cy.get('[data-test="superFundEntry-manuallyEnterFees0-btn"]'),
    ttrChoice = e => cy.get('[data-test="superDetails-personalSuperAccountType-input-ttr"]'),
    pensionChoice = e => cy.get('[data-test="superDetails-personalSuperAccountType-input-pension"]'),
    questionResponses = e => cy.get('[data-test="review-questionResponses-question"]'),
    answerResponses = e => cy.get('[data-test="review-questionResponses-answer"]'),
    lifeCoverInputField = e => cy.get('[data-test="insuranceQuote-lifeCover-input"]'),
    TPDCoverInputField = e => cy.get('[data-test="insuranceQuote-TPD-input"]'),
    getQuoteButton = e => cy.get('[data-test="insuranceQuote-getQuote-btn"]'),
    corporationNameInputField = e => cy.get('[data-test="smsf-corporationName-input"]'),
    corporate = e => cy.get('[data-test="smsf-corporate-radio"]'),
    steppedLifeCoverAmount = e => cy.get('[data-test="insuranceQuote-SteppedLifeCover-td"]'),
    steppedTPDAmount = e => cy.get('[data-test="insuranceQuote-SteppedTPDCover-td"]'),
    levelTo65LifeCoverAmount = e => cy.get('[data-test="insuranceQuote-Level65LifeCover-td"]'),
    levelTo65TPDCoverAmount = e => cy.get('[data-test="insuranceQuote-Level65TPDCover-td"]'),
    premiumType = e => cy.get('[type="radio"]'),
    occupation = e => cy.get('#insurance-form_person_occupation'),
    height = e => cy.get('[data-test="insuranceQuote-height-input"]'),
    weight = e => cy.get('[data-test="insuranceQuote-weight-input"]'),
    superFundName = e => cy.get('[data-test="smsf-superFundName-input"]'),
    SMSFAustralianBusinessNumber = e => cy.get('[data-test="smsf-abn-input"]'),
    SMSFAustralianTaxFileNumber = e => cy.get('[data-test="applicants-tfn-input"]'),
    SMSFAddress = e => cy.get('[data-test="applicants-residentialAddress-input"]'),
    applicantFullName = e => cy.get('[data-test="applicants-userCardFullName-text"]'),
    investitorsRequiredMsg = e => cy.get('[data-test="applicants-minInvestors-text"]'),
    alertMsgFinalReviewPage = e => cy.get('.ant-alert-content'),
    superFundNameValidationMsg = e => cy.contains('Super Fund Name').parent().parent().find('[role="alert"]'),
    trustTypeValidationMsg = e => cy.contains('What type of trustees does this structure have?').parent().parent().find('[role="alert"]'),
    SMSFAustralianTaxFileNumberValidationMsg = e => cy.contains('SMSF Australian Tax File Number').parent().parent().find('[role="alert"]'),
    TrustAustralianTaxFileNumberValidationMsg = e => cy.contains('Trust Australian Tax File Number').parent().parent().find('[role="alert"]'),
    SMSFAustralianBusinessNumberValidationMsg = e => cy.contains('SMSF Australian Business Number').parent().parent().find('[role="alert"]'),
    trustNameInputField = e => cy.get('[data-test="trust-trustName-input"]'),
    companyNameInputField = e => cy.get('#company-details-form_investment_account_identifier_company_name'),
    trustNameValidationMsg = e => cy.contains('Trust Name').parent().parent().find('[role="alert"]'),
    trustTypeValidationMsg2 = e => cy.contains('Trust Type').parent().parent().find('[role="alert"]'),
    trustTypeInputField = e => cy.get('[data-test="trust-trustType-select"]'),
    unitTrustType = e => cy.get('[title="Unit"]'),
    netWorth = e => cy.get('#risk-profile-form_financialInfo_net_worth'),
    annualNetIncome = e => cy.get('#risk-profile-form_financialInfo_annual_net_income'),
    liquidNetWorth = e => cy.get('#risk-profile-form_financialInfo_liquid_net_worth'),
    birthYear = e => cy.get('#risk-profile-form_financialInfo_birth_year'),
    investmentTotal = e => cy.get('#risk-profile-form_investment_total'),
    sideBar = e => cy.get('[class="ant-layout-sider ant-layout-sider-dark"]'),
    tourWindow = e => cy.get('.ant-tour-inner'),
    modalButton = e => cy.contains('Need help with this page?'),
    modalWindow = e => cy.get('[role="dialog"]'),
    videoTutorial = e => cy.get('#widget2'),
    qualityStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_35'),
    valueStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_36'),
    growthStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_37'),
    defensivesTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_64'),
    batterySupplyChainTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_32'),
    cleanEnergyTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_61'),
    nuclearPowerTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_62'),
    largeTechnologyStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_34'),
    roboticsArtificialIntelligenceTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_58'),
    cybersecurityTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_60'),
    videoGamingTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_63'),
    luxuryGoodsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_65'),
    travelTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_66'),
    logisticsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_67'),
    cloudComputingStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_38'),
    goldStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_43'),
    oilGasStocksTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_39'),
    agribusinessTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_59'),
    defenseContractorsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_64'),
    globalConsumerDiscretionaryTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_52'),
    globalConsumerStaplesTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_49'),
    globalCommunicationServicesTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_51'),
    globalEnergyTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_54'),
    globalMaterialsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_55'),
    globalIndustrialsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_48'),
    globalHealthCareTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_47'),
    globalFinancialsTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_50'),
    globalInformationTechnologyTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_57'),
    globalRealEstateTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_56'),
    globalUtilitiesTypeOfTilt = e => cy.get('#ethical-overlay-form_portfolio_tilt_53'),
    chat = e => cy.get('[id="hubspot-conversations-inline-iframe"]'),
    meetings = e => cy.get('.meetings-iframe-container > iframe'),
    nextButtonTourWindow = e => cy.get('[class="ant-btn css-86j49d ant-btn-primary ant-btn-sm ant-tour-next-btn"]'),
    nextQuestionButton = e => cy.get('[data-test="questions-nextQuestion-btn"]'),
    investmentChoiceSideBar = e => cy.get('[class="ant-layout-sider ant-layout-sider-dark"]'),
    companyNameValidationMsg = e => cy.contains('Company Name').parent().parent().find('[role="alert"]'),
    companyAustralianBusinessNumberValidationMsg = e => cy.contains('Company Australian Business Number').parent().parent().find('[role="alert"]'),
    companyAustralianBusinessNumberInputField = e => cy.get('#company-details-form_investment_account_identifier_australian_business_number'),
    companyAustralianTaxFileNumberInputField = e => cy.get('#company-details-form_investment_account_identifier_tax_file_number'),
    companyAustralianTaxFileNumberValidationMsg = e => cy.contains('Company Australian Tax File Number').parent().parent().find('[role="alert"]')

export default class OnboardingPage extends BasePage {

    constructor() {
        super()
    }

    // *************************** ACTIONS ***************************

    verify_account_selection() {
        cy.url().should('include', 'account-selection');
        cy.get('h1').should('be.visible');
        cy.get('h1').should('have.text', 'Account Selection');
        return this;
    }

    verify_disclaimer_in_the_footer() {
        disclaimerBox().should('be.visible');
        disclaimer().should('be.visible');
        disclaimerDescription().should('be.visible');
        return this;
    }


    verify_empty_input_fields_on_BYP_page() {
        investmentTotalField().should('be.empty');
        tacticalGrowthField().should('be.empty');
        tacticalIncomeField().should('be.empty');
        tacticalAccumulationField().should('be.empty');
        coreInternationalField().should('be.empty');
        coreAustraliaField().should('be.empty');
        australianLeadersField().should('be.empty');
        globalLeadersField().should('be.empty');
        governmentBondLadderField().should('be.empty');
        alertBYPpage().should('be.visible');
        investmentTotalField().clear();
        saveContinueButton().should('not.exist');
        return this;
    }

    redirect_to_applicants_page() {
        applicantsTabSideMenu().click();
        return this;
    }

    enter_values_on_BYP_input_fields(data) {
        investmentTotalField().type(data.investmentTotal);
        tacticalGrowthField().type(data.tacticalGrowth);
        tacticalIncomeField().type(data.tacticalIncome);
        tacticalAccumulationField().type(data.tacticalAccumulation);
        coreInternationalField().type(data.coreInternational);
        coreAustraliaField().type(data.coreAustralia);
        australianLeadersField().type(data.australianLeaders);
        globalLeadersField().type(data.globalLeaders);
        governmentBondLadderField().type(data.governmentBondLadder);
        return this;
    }

    enter_investment_value_and_core_international_value(data) {
        investmentTotalField().type(data.investmentTotal);
        coreInternationalField().type(data.coreInternational);
        return this;
    }

    verify_no_ethics_selected_message(message) {
        noEthicsSelectedMessage().should('contain.text', message);
        return this;
    }

    enter_values_on_super_fund_entry(fundEntryValues, bankDetails) {

        personalSuperAccountTypeInputField().click();
        if (fundEntryValues.personalSuperAccountType === 'Accumulation') {
            accumulationChoice().click();
        } else if (fundEntryValues.personalSuperAccountType === 'Transition to retirement') {
            ttrChoice().click();
            this.enter_Bank_Details(bankDetails)
        } else if (fundEntryValues.personalSuperAccountType === 'Pension') {
            pensionChoice().click();
            this.enter_Bank_Details(bankDetails)
        }

        fundNameInputField().type(fundEntryValues.fundName).type('{enter}');
        transferAmountInputField().clear();
        transferAmountInputField().type(fundEntryValues.transferAmount);


        if (fundEntryValues.fundName === 'Other' || fundEntryValues.fundName === 'SMSF') {
            customFundNameInputField().type(fundEntryValues.customFundName)
        }
        if (fundEntryValues.fundName !== 'SMSF') {
            memberNumberInputField().clear();
            memberNumberInputField().type(fundEntryValues.memberNumber);
        }
        return this;
    }

    manually_enter_fee(fundEntryValues) {
        if (fundEntryValues.platformAdministration !== '') {
            manuallyEnterFeesButton().click();
            platformAdministration().clear();
            platformAdministration().type(fundEntryValues.platformAdministration);
            investmentManagement().clear();
            investmentManagement().type(fundEntryValues.investmentManagement);
            ETFfees().clear();
            ETFfees().type(fundEntryValues.ETFfees);
            performance().clear();
            performance().type(fundEntryValues.Performance);
            advice().clear();
            advice().type(fundEntryValues.advice)
        }
        return this;
    }

    enter_values_on_super_fund_entry_input_fields(data) {
        fundNameInputField().type(data.fundName1);
        cy.contains('Other').click();
        customFundNameInputField().should('be.visible');
        fundNameInputField().type(data.fundName2).type('{enter}');
        customFundNameInputField().should('not.exist');
        transferAmountInputField().type(data.transferAmount);
        memberNumberInputField().type(data.memberNumber);
        personalSuperAccountTypeInputField().click();
        accumulationChoice().click();
        return this;
    }

    enter_tactical_growth_and_core_international_values(data) {
        tacticalGrowthField().type(data.tacticalGrowth2);
        coreInternationalField().type(data.coreInternational2);
        return this;
    }

    clear_values_on_BYP_input_fields() {
        tacticalGrowthField().clear();
        tacticalIncomeField().clear();
        tacticalAccumulationField().clear();
        coreInternationalField().clear();
        coreAustraliaField().clear();
        australianLeadersField().clear();
        globalLeadersField().clear();
        governmentBondLadderField().clear();
        return this;
    }

    verify_validation_messages_for_BYP_input_fields(data) {
        this.verify_text_on_multiple_elements([
            [coreInternationalValidationMessage, data.coreInternational],
            [coreAustraliaValidationMessage, data.coreAustralia],
            [globalLeadersValidationMessage, data.globalLeaders],
            [multiAssetValidationMessage, data.multiAssetPortfolios],
            [australianLeadersValidationMessage, data.australianLeaders],
            [governmentBondLadderValidationMessage, data.governmentBondLadder]
        ])
        return this;
    }

    verify_validation_messages_for_fund_entry_input_fields(data) {
        this.verify_text_on_multiple_elements([
            [fundNameValidationMsg, data.fundName],
            [transferAmountValidationMsg, data.transferAmount],
            [memberNumberValidationMsg, data.memberNumber],
            [personalSuperAccountTypeValidationMsg, data.personalType]
        ])
        return this;
    }

    verify_validation_messages_for_Bank_Details_fields(data) {
        this.verify_text_on_multiple_elements([
            [bsbValidationMessage, data.bsb],
            [accountNumberValidationMessage, data.accountNumber],
            [financialInstitutionValidationMessage, data.financialInstitution],
            [accountNameValidationMessage, data.accountName]
        ])
        return this;
    }

    verify_validation_messages_for_compliance_page_fields(data) {
        this.verify_text_on_multiple_elements([
            //  [statementOfInquiryValidationMessage, data.statementOfInquiry],
            [sourceTypeValidationMessage, data.sourceType],
            [percentageValidationMessage, data.percentage]
        ])
        return this;
    }

    verify_validation_messages_for_create_new_applicant_input_fields(data) {
        this.verify_text_on_multiple_elements([
            [titleInputValidationMsg, data.titleInput],
            [givenNameValidationMsg, data.nameInput],
            [surnameInputValidationMsg, data.surnameInput],
            [emailInputValidationMsg, data.emailInput],
            [mobileInputValidationMsg, data.mobileInput],
            [genderInputValidationMsg, data.genderInput],
            [birthDateInputValidationMsg, data.birthInput],
            // [citizenshipInputValidationMsg, data.citizenshipInput],
            [employmentInputValidationMsg, data.employmentInput],
            [taxInputValidationMsg, data.taxInput]
        ])
        return this;
    }

    enter_values_at_create_new_applicant_input_fields(data, type) {
        titleInputField().click()
        titleDropdownOptions(data.titleInput).click()

        nameInputField().type(data.nameInput)
        nameInputField().should('have.value', data.nameInput)

        middleNameInputField().clear();
        middleNameInputField().type(data.middleName)

        surnameInputField().type(data.surnameInput);
        surnameInputField().should('have.value', data.surnameInput)

        emailInputField().type(data.emailInput);
        emailInputField().should('have.value', data.emailInput)

        mobileInputField().type(data.mobileInput);
        mobileInputField().should('have.value', data.mobileInput)

        genderInputField().click();
        genderInputField().type(data.genderInput).type('{enter}');

        numberOfDependentsInputField().clear();
        numberOfDependentsInputField().type(data.numberOfDependents)

        dateInputField2().click();
        //dateField().click();
        // this.enterValue(dateInputField, data.dateOfBirth)
        todayButton().click()

        citizenshipInputField().click({force: true})
        citizenshipInputField().type(data.citizenshipInput).type('{enter}');

        countryOfBirth().click({force: true})
        countryOfBirth().type(data.countryOfBirth).type('{enter}')

        employmentInputField().click();
        dropdownOption(data.employmentInput).click()

        if (data.employmentInput === 'Employed' || data.employmentInput === 'Selfemployed') {
            occupationInputField().type(data.occupation).type('{enter}');
            employerNameInputField().type(data.employerName);
            employerAddressInputField().type(data.employerAddress).type('{enter}');
            employerBusinessInputField().click();
            employerBusinessInputField().type(data.employerBusiness).type('{enter}');
        }
        if (type === 'Joint-IB' || type === 'Individual-IB') {
            employmentStatusAnnualNetIncomeInputField().clear()
            employmentStatusAnnualNetIncomeInputField().type(data.annualNetIncome)
            employmentStatusNetWorthInputField().clear()
            employmentStatusNetWorthInputField().type(data.netWorth)
        }

        taxInputField().type(data.taxInput)

        residentialAddressInputField().click();
        residentialAddressInputField().type(data.residentialAddress).type('{enter}')
        // this.enterValue(residentialAddressInputField, data.residentialAddress)
        // residentialAddressInputField().type('{backspace}')
        residentialAddressTypeaheadOption().should('be.visible')
        cy.contains(data.residentialAddress).click()
        residentialAddressInputField().should('have.value', data.residentialAddress)


        if (type === 'Individual-IB' || type === 'Joint-IB' || data.type === 'Individual-IB') {
            driverLicenseExpiry().click();
            driverLicenseExpiry().type(data.licenseExpiryDate).type('{enter}');
        }
        return this;
    }

    enter_investment_experience_values(data) {
        knowledgeLevel().type(data.knowledgeLevel).type('{enter}')
        tradesPerYear().type(data.tradesPerYear)
        numberOfYearsTrading().type(data.numberOfYearsTrading)
        return this;
    }

    click_submit_applicant_button() {
        submitApplicantButton().should('be.visible');
        //    cy.wait(5000)
        //    this.scroll_and_click(submitApplicantButton)
        submitApplicantButton().click().click();
        return this;
    }

    verify_your_identity() {
        //this.pause(7)
        // identity().should('have.text', "Driver's licence");
        cy.wait(8000)
        cy.contains('h1', 'Verify your identity');
        return this;
    }

    upload_and_submit_document_for_verification(idOption, type) {
        this.pause(3)
        idOptionList().should('be.visible')
        this.pause(3)
        this.select_id_option(idOption)
        this.pause(1)
        this.select_document_type(type)
        this.pause(1)
        this.upload_file('1', D.documentType.id)
        this.pause(1)
            .click_Upload_and_Submit_button()
        return this;
    }

    select_id_option(idOption) {
        idOptionList().should('be.visible')
        //this.pause(3)
        idOptionList().click();
        // this.pause(3)
        cy.contains(idOption).click();
        return this;
    }

    click_upload_and_submit() {
        cy.contains('Upload and Submit').click();
        return this;
    }

    verify_successfully_uploaded_file(data) {
        this.verify_text(uploadedFileValidationMsg, data.uploadedFileMsg);
        return this;
    }

    verify_validation_message_for_Q_at_risk_profile(data) {
        this.verify_text(Q1_validationMessage, data.requiredQuestion);
        return this;
    }

    select_account_type(option) {
        if (option.includes('Individual-IB')) {
            this.click_non_super_type()
            this.select_individual_non_super_subtype()
        } else if (option.includes('Personal Super')) {
            this.click_super_type()
                .click_personal_super_subtype()
        } else if (option.includes('Individual')) {
            this.click_non_super_type()
            this.select_individual_non_super_subtype()
        } else if (option.includes('SMSF')) {
            this.click_super_type()
            this.click_SMSF_super_subtype()
        } else if (option.includes('Joint')) {
            this.click_non_super_type()
                .select_joint_non_super_subtype()
        } else if (option.includes('Trust')) {
            this.click_non_super_type()
                .select_trust_non_super_subtype()
        } else if (option.includes('Company')) {
            this.click_non_super_type()
                .select_company_non_super_subtype()
        }
        return this;
    }

    select_investment_choice(option, type) {
        if (option === 'Self Directed' && type === 'Individual-IB' || type === 'Joint-IB') {
            this.click_self_directed_button()
                .select_all_checkboxes(6)
        } else if (type === 'Individual-IB' && option === 'Limited Advice') {
            this.click_limited_advice_button()
                .select_all_checkboxes(6)
        } else if (option === 'Self Directed') {
            this.click_self_directed_button()
                .select_all_checkboxes(5)

        } else if (option === 'Limited Advice') {
            this.click_limited_advice_button()
                .select_all_checkboxes(6)

        } else if (option === 'Full Advice') {
            this.click_full_advice_button()
                .select_all_checkboxes(6)
        }

        return this;
    }

    complete_insurance_quote(data) {
        this.click_yes_insurance_button()
            .clear_all_required_insurance_values()
            .enter_values_for_life_and_tpd_cover(data.insurance)
            .enter_all_required_insurance_values(data.insurance)
        return this;
    }

    enter_financial_info(data) {
        investmentTotal().clear()
        investmentTotal().type(data.investmentTotal);
        netWorth().clear();
        netWorth().type(data.netWorth);
        annualNetIncome().clear();
        annualNetIncome().type(data.annualNetIncome);
        liquidNetWorth().clear();
        liquidNetWorth().type(data.liquidNetWorth);
        birthYear().click();
        birthYear().clear();
        birthYear().type(data.birthYear).type('{enter}');
        return this;
    }

    turn_on_allocate_cash() {
        allocateCash().click();
        return this;
    }

    enter_cash(data) {
        if (data.cash !== '') {
            cash().type(data.cash)
        }
        return this;
    }

//working on this
    enter_Portfolio_values(data, type) {
        investmentTotalField().clear()
        investmentTotalField().type(data.investmentTotal);
        tacticalGrowthField().type(data.tacticalGrowth);
        coreInternationalField().type(data.coreInternational);
        if (data.tacticalIncome !== '') {
            tacticalIncomeField().type(data.tacticalIncome);
        }
        if (data.tacticalAccumulation !== '') {
            tacticalAccumulationField().type(data.tacticalAccumulation);
        }
        if (data.coreAustralia !== '') {
            coreAustraliaField().type(data.coreAustralia);
        }
        if (data.australianLeaders15 !== '') {
            australianLeadersField().type(data.australianLeaders15);
        }
        if (data.globalLeaders !== '') {
            globalLeadersField().type(data.globalLeaders);
        }
        if (data.governmentBondLadder !== '') {
            governmentBondLadderField().type(data.governmentBondLadder);
        }
        /*if (type === 'Individual-IB' && data.stocksAustralianLeaders === '15') {
            stocksAustralianLeaders().click()
            cy.get('[title="15"]').click()
        }
        if (type === 'Individual-IB' && data.stocksAustralianLeaders === '25') {
            stocksAustralianLeaders().click()
            politicalMilitaryDiplomaticDropdownOption = option => cy.get('#ib-details-form_affiliationDetail_hasAffiliation_list').parent('div').parent('div').find('[title="' + option + '"]'),
                class="ant-select-selection-item"
                cy.get('[title="25"]').click()
        }
        if (type === 'Individual-IB' && data.stocksAustralianLeaders === '40') {
            stocksAustralianLeaders().click()
            cy.get('[title="40"]').click()
        }
        if (type === 'Individual-IB' && data.stocksAustralianLeaders === '75') {
            stocksAustralianLeaders().click()
            cy.get('[title="75"]').click()
        }
        if (type === 'Individual-IB' && data.stocksGlobalLeaders === '15') {
            stocksGlobalLeaders().click()
            cy.get('[title="15"]').click()
        }
        if (type === 'Individual-IB' && data.stocksGlobalLeaders === '25') {
            stocksGlobalLeaders().click()
            cy.get('[title="25"]').click()
        }
        if (type === 'Individual-IB' && data.stocksGlobalLeaders === '40') {
            stocksGlobalLeaders().click()
            cy.get('[title="40"]').click()
        }
        if (type === 'Individual-IB' && data.stocksGlobalLeaders === '75') {
            stocksGlobalLeaders().click()
            cy.get('[title="75"]').click()
        }
*/
        if (type === 'Individual-IB' && data.stocksAustralianLeaders !== '') {
            stocksAustralianLeaders().click()
            dropdownOption(data.stocksAustralianLeaders).click()
        }
        if (type === 'Individual-IB' && data.stocksGlobalLeaders !== '') {
            stocksGlobalLeaders().click()
            dropdownOption(data.stocksGlobalLeaders).click();
        }
        return this;
    }

// working on this
    enter_portfolio_tilts(data) {
        investmentStyleFactors().click()
        if (data.qualityStocks !== '') {
            qualityStocks().type(data.qualityStocks)
        }
        if (data.valueStocks !== '') {
            valueStocks().type(data.valueStocks)
        }
        if (data.growthStocks !== '') {
            growthStocks().type(data.growthStocks)
        }
        if (data.defensives !== '') {
            defensives().type(data.defensives)
        }

        cy.contains('Climate Change').eq(0).click();
        if (data.cleanEnergy !== '') {
            cleanEnergy().type(data.cleanEnergy)
        }
        if (data.batterySupplyChain !== '') {
            batterySupplyChain().type(data.batterySupplyChain)
        }
        if (data.nuclearPower !== '') {
            nuclearPower().type(data.nuclearPower)
        }
        cy.contains('Climate Change').eq(0).click();

        technology().click();
        if (data.largeTechnologyStocks !== '') {
            largeTechonologyStocks().type(data.largeTechnologyStocks)
        }
        if (data.cloudComputingStocks !== '') {
            cloudComputingStocks().type(data.cloudComputingStocks)
        }
        if (data.roboticsArtificialIntelligence !== '') {
            roboticsArtificialIntelligence().type(data.roboticsArtificialIntelligence)
        }
        if (data.cybersecurity !== '') {
            cybersecurity().type(data.cybersecurity)
        }

        consumption().click();
        if (data.videoGaming !== '') {
            videoGaming().type(data.videoGaming)
        }
        if (data.travel !== '') {
            travel().type(data.travel)
        }
        if (data.luxuryGoods !== '') {
            luxuryGoods().type(data.luxuryGoods)
        }
        if (data.logistics !== '') {
            logistics().type(data.logistics)
        }

        commodities().click();
        if (data.oilGasStocks !== '') {
            oilGasStocks().type(data.oilGasStocks)
        }
        if (data.goldStocks !== '') {
            goldStocks().type(data.goldStocks)
        }
        if (data.agribusiness !== '') {
            agribusiness().type(data.agribusiness)
        }

        military().click();
        if (data.defenseContractors !== '') {
            defenseContractors().type(data.defenseContractors)
        }

        gicsSector().click();
        if (data.globalCommunicationServices !== '') {
            globalCommunicationServices().type(data.globalCommunicationServices)
        }
        if (data.globalConsumerDiscretionary !== '') {
            globalConsumerDiscretionary().type(data.globalConsumerDiscretionary)
        }
        if (data.globalConsumerStaples !== '') {
            globalConsumerStaples().type(data.globalConsumerStaples)
        }
        if (data.globalEnergy !== '') {
            globalEnergy().type(data.globalEnergy)
        }
        if (data.globalFinancials !== '') {
            globalFinancials().type(data.globalFinancials)
        }
        if (data.globalHealthCare !== '') {
            globalHealthCare().type(data.globalHealthCare)
        }
        if (data.globalIndustrials !== '') {
            globalIndustrials().type(data.globalIndustrials)
        }
        if (data.globalInformationTechnology !== '') {
            globalInformationTechnology().type(data.globalInformationTechnology)
        }
        if (data.globalMaterials !== '') {
            globalMaterials().type(data.globalMaterials)
        }
        if (data.globalRealEstate !== '') {
            globalRealEstate().type(data.globalRealEstate)
        }
        if (data.globalUtilities !== '') {
            globalUtilities().type(data.globalUtilities)
        }
        return this;
    }


    select_ethical_option(data) {
        this.select_checkboxes_based_on_labels(data.climateChange)
            .click_war_button()
            .select_checkbox_based_on_label(data.war)

        if (data.humanRights !== '') {
            cy.contains('Human Rights').click();
            this.select_checkboxes_based_on_labels(data.humanRights)
        }
        if (data.health !== '') {
            cy.contains('Health').click()
            this.select_checkboxes_based_on_labels(data.health)
        }
        if (data.vices !== '') {
            cy.contains('Vices').click()
            this.select_checkboxes_based_on_labels(data.vices)
        }
        if (data.animalRights !== '') {
            cy.contains('Animal Rights').click()
            this.select_checkboxes_based_on_labels(data.animalRights)
        }
        if (data.religion !== '') {
            cy.contains('Religion').click()
            this.select_checkboxes_based_on_labels(data.religion)
        }
        if (data.assetClass !== '') {
            cy.contains('Asset Class').click()
            this.select_checkboxes_based_on_labels(data.assetClass)
        }
        if (data.thematic !== '') {
            cy.contains('Thematic').click()
            this.select_checkboxes_based_on_labels(data.thematic)
        }
        return this;
    }

    climateChange = 'Climate Change';

    select_tilts_option(data) {
        //   if (data.investmentChoice === 'Full Advice'){
        if (data.qualityStocks !== '') {
            qualityStocksTypeOfTilt().click()
            tiltsDropdownOptions(data.qualityStocks).click();
        }
        if (data.valueStocks !== '') {
            valueStocksTypeOfTilt().click()
            tiltsDropdownOptions(data.valueStocks).click();
        }
        if (data.growthStocks !== '') {
            growthStocksTypeOfTilt().click()
            tiltsDropdownOptions(data.growthStocks).click();
        }
        if (data.defensives !== '') {
            defensivesTypeOfTilt().click()
            tiltsDropdownOptions(data.defensives).click();
        }

        climateChangeTiltsButton().click()
        if (data.batterySupplyChain !== '') {
            batterySupplyChainTypeOfTilt().click()
            tiltsDropdownOptions(data.batterySupplyChain).click();
        }
        if (data.cleanEnergy !== '') {
            cleanEnergyTypeOfTilt().click()
            tiltsDropdownOptions(data.cleanEnergy).click();
        }
        if (data.nuclearPower !== '') {
            nuclearPowerTypeOfTilt().click();
            tiltsDropdownOptions(data.nuclearPower).click();
        }

        technologyTiltsButton().click()
        if (data.largeTechnologyStocks !== '') {
            largeTechnologyStocksTypeOfTilt().click();
            tiltsDropdownOptions(data.largeTechnologyStocks).click();
        }
        if (data.cloudComputingStocks !== '') {
            cloudComputingStocksTypeOfTilt().click()
            tiltsDropdownOptions(data.cloudComputingStocks).click();
        }
        if (data.roboticsArtificialIntelligence !== '') {
            roboticsArtificialIntelligenceTypeOfTilt().click()
            tiltsDropdownOptions(data.roboticsArtificialIntelligence).click();
        }
        if (data.cybersecurity !== '') {
            cybersecurityTypeOfTilt().click()
            tiltsDropdownOptions(data.cybersecurity).click();
        }

        consumption().click()
        if (data.videoGaming !== '') {
            videoGamingTypeOfTilt().click()
            tiltsDropdownOptions(data.videoGaming).click();
        }
        if (data.luxuryGoods !== '') {
            luxuryGoodsTypeOfTilt().click();
            tiltsDropdownOptions(data.luxuryGoods).click();
        }
        if (data.travel !== '') {
            travelTypeOfTilt().click();
            tiltsDropdownOptions(data.travel).click();
        }
        if (data.logistics !== '') {
            logisticsTypeOfTilt().click();
            tiltsDropdownOptions(data.logistics).click();
        }

        commodities().click()
        if (data.goldStocks !== '') {
            goldStocksTypeOfTilt().click();
            tiltsDropdownOptions(data.goldStocks).click();
        }
        if (data.oilGasStocks !== '') {
            oilGasStocksTypeOfTilt().click()
            tiltsDropdownOptions(data.oilGasStocks).click();
        }
        if (data.agribusiness !== '') {
            agribusinessTypeOfTilt().click();
            tiltsDropdownOptions(data.agribusiness).click();
        }
        military().click()
        if (data.defenseContractors !== '') {
            defenseContractorsTypeOfTilt().click();
            tiltsDropdownOptions(data.defenseContractors).click();
        }

        gicsSector().click()
        if (data.globalConsumerDiscretionary !== '') {
            globalConsumerDiscretionaryTypeOfTilt().click();
            tiltsDropdownOptions(data.globalConsumerDiscretionary).click();
        }
        if (data.globalConsumerStaples !== '') {
            globalConsumerStaplesTypeOfTilt().click();
            tiltsDropdownOptions(data.globalConsumerStaples).click();
        }
        if (data.globalCommunicationServices !== '') {
            globalCommunicationServicesTypeOfTilt().click();
            tiltsDropdownOptions(data.globalCommunicationServices).click();
        }
        if (data.globalEnergy !== '') {
            globalEnergyTypeOfTilt().click();
            tiltsDropdownOptions(data.globalEnergy).click();
        }
        if (data.globalMaterials !== '') {
            globalMaterialsTypeOfTilt().click();
            tiltsDropdownOptions(data.globalMaterials).click();
        }
        if (data.globalIndustrials !== '') {
            globalIndustrialsTypeOfTilt().click();
            tiltsDropdownOptions(data.globalIndustrials).click();
        }
        if (data.globalHealthCare !== '') {
            globalHealthCareTypeOfTilt().click();
            tiltsDropdownOptions(data.globalHealthCare).click();
        }
        if (data.globalFinancials !== '') {
            globalFinancialsTypeOfTilt().click();
            tiltsDropdownOptions(data.globalFinancials).click();
        }
        if (data.globalInformationTechnology !== '') {
            globalInformationTechnologyTypeOfTilt().click();
            tiltsDropdownOptions(data.globalInformationTechnology).click();
        }
        if (data.globalRealEstate !== '') {
            globalRealEstateTypeOfTilt().click();
            tiltsDropdownOptions(data.globalRealEstate).click();
        }
        if (data.globalUtilities !== '') {
            globalUtilitiesTypeOfTilt().click();
            tiltsDropdownOptions(data.globalUtilities).click();
        }
        // }

        return this;
    }

    review_portfolio_data(data) {
        this.review_indicative_portfolio(data.review.indicativePortfolio)
        this.verify_your_portfolio_panel(data.review.yourPortfolioValues)
        if (data.accountType === 'Individual' || data.accountType === 'SMSF' || data.accountType === 'Joint' || data.accountType === 'Trust') {
            this.review_fees_and_charges(data.review.feesAndCharges, '4')
        } else if (data.accountType === 'Personal Super' && data.investmentChoice === 'Limited Advice') {
            this.review_fees_and_charges(data.review.feesAndCharges, '3')
        } else if (data.accountType === 'Personal Super' && data.investmentChoice === 'Self Directed') {
            this.review_fees_and_charges(data.review.feesAndCharges, '4')
        }
        if (data.ethicalOverlay) {
            this.review_indicative_portfolio_excluded_securities(data.review.indicativePortfolioExcludedSecurities)
        }

        return this;
    }

    enter_applicant_investment_experience(data) {
        this.enter_investment_experience_values(data)
            .upload_file('0', D.documentType.id)
            .upload_file('1', D.documentType.id)
        return this;
    }

    upload_documents(data) {
        if (data.applicants.documentType.idOption === 'Upload an ID document') {
            this.upload_and_submit_document_for_verification('Upload an ID document', data.applicants.documentType.type1)
                .verify_text_is_present_on_main_container('Your document was uploaded successfully and will be reviewed by an administrator.')
                .upload_and_submit_document_for_verification('Upload an ID document', data.applicants.documentType.type2)
        }
        return this;
    }

    enter_values_for_bank_details(data) {
        //if (data.bankDetails["bsb"]) {
        this.enter_Bank_Details(data.bankDetails)
        // }
        return this;
    }

    enter_values_on_compliance_input_fields(data) {
        if (data.compliancePageInputFields["statementOfInquiry"]) {
            this.enter_compliance_values(D.compliancePageInputFields)
        }
        return this;
    }

    verify_documents_on_final_review_page(option, type, data) {
        this.verify_Documents_available_for_download(data.Documents)
        if (option === 'Full Advice' && type === 'Individual-IB') {
            this.verify_agreements_and_disclosures_available_for_download(data.agreementsAndDisclosures)
        }
        /*if (data.accountType === 'Individual-IB' || data.accountType === 'Individual' ) {
            this.verify_Documents_available_for_download([
                'Investment and Fee Summary',
                'Letter of Engagement',
                'Praemium SMA PDS and Investment Guide extract',
            ])
        }
        if (data.accountType === 'Individual-IB' ) {
            this.verify_Documents_available_for_download([
                'Investment and Fee Summary',
                'MDA Brochure and Agreement',
                'Statement of Advice MDA',
            ])
        } else if (data.accountType === 'SMSF' || data.accountType === 'Joint') {
            this.verify_Documents_available_for_download([
                'Investment and Fee Summary',
                'Statement of Advice',
                'Praemium SMA PDS and Investment Guide extract',
            ])
        } else if (data.accountType === 'Personal Super') {
            this.verify_Documents_available_for_download([
                'Investment and Fee Summary',
                'Statement of Advice',
                'Praemium SuperSMA PDS and Investment Guide extract',
                'MetLife - Protect Product Disclosure Statement'
            ])
        }*/
        return this;
    }

    verify_number_of_all_documents(data) {
        if (data.finalReview["numberOfAllDocuments"]) {
            this.verify_download_button_for_documents(32)
        }
        return this;
    }

    click_create_new_investment_account() {
        newInvestmentButton().should('be.visible')
        newInvestmentButton().click()
        return this;
    }

    click_create_investment_account() {
        createInvestmentButton().click()
        this.wait_until_loader_disappears()
        return this;
    }

    click_climate_change_button() {
        climateChangeButton().click();
        return this;
    }

    click_war_button() {
        warButton().click();
        return this;
    }

    verify_types_of_investment_account() {
        investmentLayout().should('be.visible');
        this.verify_text_is_visible('What type of investment account would you like to open?');
        this.verify_text_is_visible('Super');
        this.verify_text_is_visible('Non-Super');
        return this;
    }

    click_super_type() {
        investmentSuperType().click()
        return this;
    }

    click_non_super_type() {
        cy.contains('Non-Super').click()
        return this;
    }

    click_personal_super_subtype() {
        cy.contains('Personal Super').click()
        return this;
    }

    click_SMSF_super_subtype() {
        cy.contains('SMSF').click()
        return this;
    }

    click_self_directed_button() {
        cy.contains('Self Directed').click();
        return this;
    }

    click_limited_advice_button() {
        // cy.get('[type="radio"]').check('Limited Advice');
        cy.contains('Limited Advice').click();
        return this;
    }

    click_full_advice_button() {
        cy.contains('Full Advice').click();
        return this;
    }

    verify_acknowledgment_and_agreement_appear() {
        agreementBox().should('be.visible');
        return this;
    }

    click_Save_and_Continue_button() {
        saveContinueButton().should('not.have.attr', 'disabled')
        this.scroll_and_click(saveContinueButton)
        return this;
    }

    click_Submit_Application_button() {
        submitApplicationButton().should('not.have.attr', 'disabled')
        this.scroll_and_click(submitApplicationButton)
        return this;
    }

    click_Upload_and_Submit_button() {
        cy.contains('Upload and Submit').click({force: true})
        return this;
    }

    remove_existing_applicant() {
        applicantCardMenuButton().should('be.visible');
        applicantCardMenuButton().click();
        removeApplicantButton().should('be.visible');
        removeApplicantButton().click();
        popUpWindowRemoveApplicant().click();
        return this;
    }

    add_new_applicant() {
        addNewApplicantCard().should('be.enabled');
        addNewApplicantCard().click();
        createNewApplicantButton().should('be.enabled');
        createNewApplicantButton().click()
        return this;
    }

    verify_alert_msg_final_review_page(alertMsg) {
        alertMsgFinalReviewPage().should('be.visible');
        alertMsgFinalReviewPage().should('contain', alertMsg);
        return this;
    }

    verify_no_alert_msg_final_review_page() {
        alertMsgFinalReviewPage().should('not.exist');
        return this;
    }

    verify_add_new_applicant_page() {
        //    applicantForm().should('be.visible');
        this.verify_text_is_visible('General Details');
        this.verify_text_is_visible('Tax Details');
        this.verify_text_is_visible('Residential Address');
        employmentStatusHeader().should('be.visible');
        return this;
    }

    click_submit_applicant() {
        submitApplicantButton().click();
        return this;
    }

    select_document_type(option) {
        documentType().should('be.visible')
        documentType().select(option);
        return this;
    }

    enter_Bank_Details(data) {
        bsbInput().type(data.bsb);
        accountNumberInput().type(data.accountNumber);
        financialInstitutionInput().type(data.financialInstitution);
        accountNameInput().type(data.accountName);
        this.verify_value(accountNameInput, data.accountName)
        return this;
    }

    verify_Documents_available_for_download(documentTitles) {
        this.verify_multiple_text_values_in_one_container(documentsSection, documentTitles)

        documentTitles.forEach(function (title) {
            specificDocumentSection(title).should('contain', 'Download');
        });

        return this;
    }

    verify_agreements_and_disclosures_available_for_download(agreementsTitles) {
        this.verify_multiple_text_values_in_one_container(agreementSection, agreementsTitles)

        agreementsTitles.forEach(function (title) {
            specificDocumentSection(title).should('contain', 'Download');
        });

        return this;
    }

    select_individual_non_super_subtype() {
        cy.contains('Individual').click()
        return this;
    }

    select_joint_non_super_subtype() {
        cy.contains('Joint').click()
        return this;
    }

    select_trust_non_super_subtype() {
        cy.contains('Trust').click()
        return this;
    }

    select_company_non_super_subtype() {
        cy.contains('Company').click()
        return this;
    }

    click_Agree_checkbox() {
        agreementCheckbox().click()
        this.pause(1)
        return this;
    }

    verify_validation_message_for_agree_checkbox(data) {
        this.verify_text(agreementCheckboxValidationMsg, data.agreeCheckbox);
        return this;
    }

    verify_super_subtypes() {
        personalSuperType().should('have.text', 'Personal Super ');
        SMSFSuperType().should('have.text', 'SMSF ');
        return this;
    }

    verify_non_super_subtypes() {
        cy.contains('Individual').should('be.visible');
        cy.contains('Joint').should('be.visible');
        cy.contains('Company').scrollIntoView()
        cy.contains('Company').should('be.visible');
        cy.contains('Trust').should('be.visible');
        return this;
    }

    verify_investment_choice_page() {
        cy.url().should('include', 'investment-choice');
        pageTitle().should('have.text', 'Investment Choice');
        return this;
    }

    verify_build_your_portfolio_page() {
        //investmentTotalField().should('be.visible');
        cy.url().should('include', 'build-your-portfolio');
        pageTitle().should('have.text', 'Build Your Portfolio');
        return this;
    }

    verify_ethical_overlay_page() {
        climateChangeButton().should('be.visible')
        cy.url().should('include', 'ethical-overlay');
        pageTitle().should('have.text', 'Screen and tilts');
        this.verify_text(selectedMenuOption, 'Ethical Overlay')
        this.verify_text_is_present_on_main_container('Vices')
        return this;
    }

    verify_ethical_overlay_page2() {
        climateChangeButton().should('be.visible')
        cy.url().should('include', 'ethical-overlay');
        pageTitle2().should('have.text', 'Ethical Overlay');
        return this;
    }

    verify_screen_and_tilts_page() {
        climateChangeButton().should('be.visible')
        cy.url().should('include', 'ethical-overlay');
        pageTitle().should('have.text', 'Screen and tilts');
        return this;
    }

    verify_applicants_page() {
        applicantCardMenuButton().should('be.visible')
        cy.url().should('include', 'applicants');
        pageTitle().should('have.text', 'Applicants');
        return this;
    }

    verify_SMSF_page() {
        cy.url().should('include', 'smsf-details');
        pageTitle().should('have.text', 'SMSF Details');
        return this;
    }

    verify_insurance_quote_page() {
        cy.url().should('include', 'insurance-quote');
        pageTitle().should('have.text', 'Insurance Quote');
        return this;
    }

    verify_super_fund_entry_page() {
        cy.url().should('include', 'super-fund-entry');
        pageTitle().should('have.text', 'Super Fund Entry');
        return this;
    }

    verify_review_page() {
        ethicalOverlayForm().should('not.exist');
        cy.contains('Your Portfolio').should('be.visible')
        pageTitle().should('have.text', 'Review');
        return this;
    }

    verify_trust_details_page() {
        cy.url().should('include', 'trust-details');
        pageTitle().should('have.text', 'Trust Details');
        return this;
    }

    verify_company_details_page() {
        cy.url().should('include', 'company-details');
        pageTitle().should('have.text', 'Company Details');
        return this;
    }

    verify_risk_profile_page() {
        pageTitle().should('not.have.text', 'Review');
        cy.url().should('include', 'risk-profile');
        pageTitle().should('have.text', 'Risk Profile');
        return this;
    }

    verify_Bank_Details_page() {
        pageTitle().should('be.visible');
        pageTitle().should('have.text', 'Bank Details');
        cy.url().should('include', 'bank-details');
        bsbInput().should('be.visible')
        accountNumberInput().should('be.visible')
        return this;
    }

    verify_Final_Review_page() {
        pageTitle().should('have.text', 'Final Review');
        cy.url().should('include', 'final-review');
        return this;
    }

    verify_compliance_page() {
        pageTitle().should('have.text', 'Compliance');
        cy.url().should('include', 'interactive-broker-compliance');
        return this;
    }

    verify_success_page() {
        pageTitle().should('be.visible');
        cy.contains('Success', {timeout: 850000})
        pageTitle(60).should('have.text', 'Success');
        cy.url().should('include', 'success');
        return this;
    }

    verify_applicant_is_visible() {
        userCardFirst().should('be.visible');
        return this;
    }

    verify_two_applicants_are_visible() {
        this.pause(3)
        userCardFirst().should('be.visible');
        userCardLast().should('be.visible');
        return this;
    }

    click_yes_insurance_button() {
        cy.contains('Yes I would').click();
        return this;
    }

    expand_card(index) {
        cy.get('[class="ant-card-extra"]').eq(index).click()
        return this;
    }

    expand_ethical_overlay_panel() {
        cy.get('body').invoke('text').then(function (text) {
            if (!text.includes('Below are the categories you have chosen to exclude from your portfolio')) {
                ethicalOverlayPanel().click();
            }
        })
        return this;
    }

    expand_question_responses_panel() {
        this.pause(3)
        cy.get('body').invoke('text').then(function (text) {
            if (!text.includes('How would you describe your current investment experience?')) {
                questionResponsesPanel().click();
            }
        })
        return this;
    }

    expand_fees_and_charges_panel() {
        cy.get('body').invoke('text').then(function (text) {
            if (!text.includes('The below fee table is an estimate based on your investment amount of')) {
                feesAndChargesPanel().click();
            }
        })
        return this;
    }

    verify_ethics(data) {

        const label_values__stacks = [
            ['Climate Change', data.climateChange],
            ['War', data.war]
        ];

        this.verify_chosen_ethics(label_values__stacks);
        return this;
    }

    verify_chosen_ethics(label_values__stacks) {
        label_values__stacks.forEach(function (stack) {
            if (stack[1]) {
                if (Array.isArray(stack[1])) {
                    stack[1].forEach(function (value) {
                        chosenEthicsContainer(stack[0]).invoke('text').should('contain', value)
                    })
                } else {
                    chosenEthicsContainer(stack[0]).invoke('text').should('contain', stack[0])
                }
            }
        });
        return this;
    }

    verify_your_portfolio_panel(object) {
        this.verify_text_on_multiple_elements([
            [totalAmountAtTheTop, object.totalAmount],
            [totalAmount, object.totalAmount],
            [coreInternationalAmount, object.coreInternationalAmount],
            [coreInternationalPercentage, object.coreInternationalPercentage],
            [tacticalGrowthAmount, object.tacticalGrowthAmount],
            [tacticalGrowthPercentage, object.tacticalGrowthPercentage],
        ])
        return this;
    }

    verify_validation_messages_for_SMSF_details(data) {
        this.verify_text_on_multiple_elements([
            [superFundNameValidationMsg, data.superFundName],
            [SMSFAustralianBusinessNumberValidationMsg, data.SMSFAustralianBusinessNumber],
            [SMSFAustralianTaxFileNumberValidationMsg, data.SMSFAustralianTaxFileNumber],
            [trustTypeValidationMsg, data.trustType],
        ])
        return this;
    }

    verify_validation_messages_for_trust_details(data) {
        this.pause(4)
        this.verify_text_on_multiple_elements([
            [trustNameValidationMsg, data.trustName],
            [trustTypeValidationMsg2, data.trustType],
            [TrustAustralianTaxFileNumberValidationMsg, data.trustAustralianTaxFileNumber],
            [trustTypeValidationMsg, data.trusteesType],
        ])
        return this;
    }

    verify_validation_messages_for_company_details(data) {
        this.verify_text_on_multiple_elements([
            [companyNameValidationMsg, data.companyName],
            [companyAustralianBusinessNumberValidationMsg, data.companyAustralianBusinessNumber],
            [companyAustralianTaxFileNumberValidationMsg, data.companyAustralianTaxFileNumber],
        ])
        return this;
    }


    review_question_responses_(type, arrayOfResponses) {
        let arrayOfQuestions = D.reviewQuestions
        if (type === 'Personal Super') {
            arrayOfQuestions = D.reviewQuestionsPersonalSuper
        }
        this.pause(3)
        for (let i = 0; i < arrayOfResponses.length; i++) {
            questionsOnReviewPage(i).invoke('text').should('contain', arrayOfQuestions[i])
            answersOnReviewPage(i).invoke('text').should('contain', arrayOfResponses[i])
        }
        return this;
    }

    verify_question_responses(arrayOfQuestions, arrayOfResponses) {

        for (let i = 0; i < arrayOfResponses.length; i++) {
            questionsOnReviewPage(i).invoke('text').should('contain', arrayOfQuestions[i])
            answersOnReviewPage(i).invoke('text').should('contain', arrayOfResponses[i])
        }
        return this;
    }

    enter_all_required_insurance_values(data) {
        occupation().type(data.occupation);
        height().type(data.height);
        weight().type(data.weight);
        return this;
    }

    clear_all_required_insurance_values() {
        occupation().clear();
        height().clear();
        weight().clear();
        return this;
    }

    enter_values_for_life_and_tpd_cover(data) {
        lifeCoverInputField().type(data.lifeCover);
        TPDCoverInputField().type(data.tpdCover);
        return this;
    }

    enter_all_required_SMSF_details(data) {
        superFundName().type(data.superFundName);
        SMSFAustralianBusinessNumber().type(data.SMSFAustralianBusinessNumber);
        SMSFAustralianTaxFileNumber().type(data.SMSFAustralianTaxFileNumber);
        SMSFAddress().clear();
        SMSFAddress().type(data.address)
        cy.get('[type="radio"]').check('individual');
        return this;
    }

    enter_SMSF_details(data) {
        superFundName().type(data.superFundName);
        SMSFAustralianBusinessNumber().type(data.SMSFAustralianBusinessNumber);
        SMSFAustralianTaxFileNumber().type(data.SMSFAustralianTaxFileNumber);
        SMSFAddress().clear();
        SMSFAddress().type(data.address).type('{enter}')
        if (data.typeOfTrustees === 'Individual') {
            cy.get('[type="radio"]').check('individual');
        } else if (data.typeOfTrustees === 'Corporate') {
            corporate().click();
            corporationNameInputField().type(data.corporationName);
        }

        return this;
    }

    enter_all_required_trust_details(data) {
        trustNameInputField().type(data.trustName);
        trustTypeInputField().click();
        cy.wait(2000)
        unitTrustType().click();
        SMSFAustralianTaxFileNumber().type(data.SMSFAustralianTaxFileNumber);
        cy.get('[type="radio"]').check('individual');
        return this;
    }

    enter_all_trust_details(data) {
        trustNameInputField().type(data.trustName);
        trustTypeInputField().click();
        unitTrustType().should('be.visible');
        unitTrustType().click();
        SMSFAustralianTaxFileNumber().type(data.SMSFAustralianTaxFileNumber);
        if (data.typeOfTrustees === 'Individual') {
            cy.get('[type="radio"]').check('individual');
        }
        return this;
    }

    enter_all_required_company_details(data) {
        companyNameInputField().type(data.companyName);
        companyAustralianBusinessNumberInputField().type(data.companyAustralianBusinessNumber);
        companyAustralianTaxFileNumberInputField().type(data.companyAustralianTaxFileNumber);
        return this;
    }


    enter_address(data) {
        residentialAddressInputField().type(data.address);
        return this;
    }


    click_get_quote_button() {
        getQuoteButton().click();
        return this;
    }

    verify_2_investitors_required_message() {
        investitorsRequiredMsg().should('be.visible');
        return this;
    }

    verify_stepped_and_level_to_65_amount(object) {
        this.verify_text_on_multiple_elements([
            [steppedLifeCoverAmount, object.steppedLifeCoverAmount],
            [steppedTPDAmount, object.steppedTPDAmount],
            [levelTo65LifeCoverAmount, object.levelTo65LifeCoverAmount],
            [levelTo65TPDCoverAmount, object.levelTo65TPDCoverAmount],
        ])
        return this;
    }

    select_premium_type() {
        premiumType().check('Stepped');
        return this;
    }

    review_indicative_portfolio(object) {
        this.verify_amount_on_multiple_rows_referenced_by_label_in_first_column(object, 4)
        return this;
    }

    review_indicative_portfolio_excluded_securities(object) {
        this.verify_amount_on_multiple_rows_referenced_by_label_in_first_column(object, 2)
        return this;
    }

    review_fees_and_charges(object, columnNumber) {
        this.verify_amount_on_multiple_rows_referenced_by_label_in_first_column(object, columnNumber)
        return this;
    }

    click_investment_choice() {
        cy.contains('Investment Choice').click();
        return this;
    }

    answerAllQuestionsWithSameOption(numberOfQuestions, optionToSelect) {
        for (let i = 0; i < numberOfQuestions; i++) {
            answer(i, optionToSelect - 1).click()
        }
        return this;
    }

    answerQuestionsWithSpecificOption(arrayOfOptionsToSelect) {
        for (let i = 0; i < arrayOfOptionsToSelect.length; i++) {
            answer(i, arrayOfOptionsToSelect[i] - 1).click()
        }
        return this;
    }

    enter_investment_amount(value) {
        investmentAmountInput().type(value)
        return this;
    }

    save_data_object_for_Questions_Responses() {
        for (let i = 0; i < 17; i++) {
            expendedSectionOnReviewPage().find('[data-test="review-questionResponses-question"]').eq(i).invoke('text').then(function (q) {
                expendedSectionOnReviewPage().find('[data-test="review-questionResponses-answer"]').eq(i).invoke('text').then(function (a) {
                    D.dataForExport.questionsResponses[q] = a
                })
            })
            cy.log('Object is ' + JSON.stringify(D.dataForExport))

        }
        return this;
    }

    save_data_object_for_Questions_Responses_Personal_Super_Account() {
        for (let i = 0; i < 16; i++) {
            expendedSectionOnReviewPage().find('[data-test="review-questionResponses-question"]').eq(i).invoke('text').then(function (q) {
                expendedSectionOnReviewPage().find('[data-test="review-questionResponses-answer"]').eq(i).invoke('text').then(function (a) {
                    D.dataForExport.questionsResponses[q] = a
                })
            })
            cy.log('Object is ' + JSON.stringify(D.dataForExport))

        }
        return this;
    }

    save_report_for_Questions_Responses() {
        for (let i = 0; i < 13; i++) {
            expendedSectionOnReviewPage().find('[data-test="review-questionResponses-question"]').eq(i).invoke('text').then(function (q) {
                expendedSectionOnReviewPage().find('[data-test="review-questionResponses-answer"]').eq(i).invoke('text').then(function (a) {
                    questions[i] = q
                    answers[i] = a
                })
            })
            if (i === 12) {
                cy.log('QUESTIONS=====' + questions)
                cy.log(answers)
                cy.generate_excel_file('Question responses', [questions, answers])
            }
        }
        return this;
    }

    click_Ethical_Overlay() {
        ethicalOverlayButtonOnReview().click()
        return this;
    }

    click_Your_Portfolio() {
        yourPortfolioButtonOnReview().click()
        return this;
    }

    save_report_for_Ethical_Overlay() {
        let questions = []
        let answers = []
        ethicalOverlaySubsectionTitle().its('length').then(function (length) {
            for (let i = 0; i < length; i++) {
                ethicalOverlaySubsectionTitle().eq(i).invoke('text').then(function (q) {
                    expendedSectionOnReviewPage().find('.ant-row-center').eq(i).find('[data-test="review-ethicGroup-selected"]').invoke('text').then(function (a) {
                        questions[i] = q
                        answers[i] = a
                    })
                })
                if (i === 1) {
                    cy.generate_excel_file('Ethical Overlay', [questions, answers])
                }
            }

        })
        return this;
    }

    save_data_object_for_Ethical_Overlay() {
        ethicalOverlaySubsectionTitle().its('length').then(function (length) {
            for (let i = 0; i < length; i++) {
                ethicalOverlaySubsectionTitle().eq(i).invoke('text').then(function (q) {
                    expendedSectionOnReviewPage().find('.ant-row-center').eq(i).find('[data-test="review-ethicGroup-selected"]').invoke('text').then(function (a) {
                        D.dataForExport.ethicalOverlay[q] = []

                        expendedSectionOnReviewPage().find('.ant-row-center').eq(i).find('.ant-row-middle').its('length').then(function (length2) {
                            cy.log('length is ' + length2)
                            for (let j = 0; j < length2; j++) {
                                expendedSectionOnReviewPage().find('.ant-row-center').eq(i).find('.ant-row-middle').eq(j).invoke('text').then(function (subsection) {
                                    D.dataForExport.ethicalOverlay[q].push(subsection)
                                })
                            }

                        })
                    })
                })
            }
        })
        return this;
    }

    save_report_for_Your_Portfolio() {
        let headers = [
            'Core Australia- Amount',
            'Core International- Amount',
            'Government Bond Ladder',
            'Core Australia- Percentage',
            'Core International- Percentage',
            'Government Bond Percentage',
            'Total Amount'
        ]
        let values = []
        expendedSectionOnReviewPage().find('[data-test="review-coreAustraliaAmount-text"]').invoke('text').then(function (text) {
            values[0] = text
        })
        expendedSectionOnReviewPage().find('[data-test="review-coreInternationalAmount-text"]').invoke('text').then(function (text) {
            values[1] = text
        })
        expendedSectionOnReviewPage().find('[data-test="review-governmentBondLadderAmount-text"]').invoke('text').then(function (text) {
            values[2] = text
        })

        expendedSectionOnReviewPage().find('[data-test="review-coreAustraliaWeighting-text"]').invoke('text').then(function (text) {
            values[3] = text
        })
        expendedSectionOnReviewPage().find('[data-test="review-coreInternationalWeighting-text"]').invoke('text').then(function (text) {
            values[4] = text
        })
        expendedSectionOnReviewPage().find('[data-test="review-governmentBondLadderWeighting-text"]').invoke('text').then(function (text) {
            values[5] = text
        })
        expendedSectionOnReviewPage().find('[data-test="review-portfolioAmountTotal-text"]').invoke('text').then(function (text) {
            values[6] = text
        })

        cy.generate_excel_file('Your Portfolio', [headers, values])
        return this;
    }

    save_data_object_for_Your_Portfolio() {
        cy.get('[data-test="review-coreAustraliaAmount-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core Australia'].amount = text
        })
        cy.get('[data-test="review-coreInternationalAmount-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core International'].amount = text
        })
        cy.get('[data-test="review-governmentBondLadderAmount-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Government Bond Ladder'].amount = text
        })
        cy.get('[data-test="review-coreAustraliaWeighting-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core Australia'].percentage = text
        })
        cy.get('[data-test="review-coreInternationalWeighting-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core International'].percentage = text
        })
        cy.get('[data-test="review-governmentBondLadderWeighting-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Government Bond Ladder'].percentage = text
        })
        cy.get('[data-test="review-portfolioAmountTotal-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Total'].amount = text
        })

        return this;
    }

    save_data_object_for_Your_Portfolio_Trust_Profile() {

        cy.get('[data-test="review-coreInternationalAmount-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core International'].amount = text
        })
        cy.get('[data-test="review-coreInternationalWeighting-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Core International'].percentage = text
        })
        cy.get('[data-test="review-portfolioAmountTotal-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Total'].amount = text
        })
        return this;
    }

    save_data_object_for_Your_Portfolio_IB_Profile() {

        cy.get('[data-test="review-tacticalGrowthAmount-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Tactical Growth'].amount = text
        })

        cy.get('[data-test="review-tacticalGrowthWeighting-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Tactical Growth'].percentage = text
        })

        cy.get('[data-test="review-portfolioAmountTotal-text"]').invoke('text').then(function (text) {
            D.dataForExport.yourPortfolio['Total'].amount = text
        })

        return this;
    }

    save_report_for_Strategic_Asset_Allocation() {
        let headers = [
            'Assets in growth producing assets (like shares) ',
            'Assets in income generating assets (like cash or bonds)',
            'The chance of a negative return'
        ]
        let values = []
        strategicAssetAllocationSection_firstParagraph().invoke('text').then(function (text) {
            values[0] = text.match(' we expect you will have ' + "(.*)" + ' of your assets in growth')[1];
        })
        strategicAssetAllocationSection_firstParagraph().invoke('text').then(function (text) {
            values[1] = text.match('and ' + "(.*)" + ' of your assets in income')[1];
        })
        strategicAssetAllocationSection_thirdParagraph().invoke('text').then(function (text) {
            values[2] = '1 year in every' + text.match('1 year in every ' + "(.*)" + 'year')[1] + 'year(s)';
        })

        cy.generate_excel_file('Strategic_Asset_Allocation', [headers, values])
        return this;
    }

    save_data_object_for_Strategic_Asset_Allocation() {
        strategicAssetAllocationSection_firstParagraph().invoke('text').then(function (text) {
            D.dataForExport.strategicAssetAllocation['Assets in growth producing assets (like shares) '] = text.match(' we expect you will have ' + "(.*)" + ' of your assets in growth')[1];
        })
        strategicAssetAllocationSection_firstParagraph().invoke('text').then(function (text) {
            D.dataForExport.strategicAssetAllocation['Assets in income generating assets (like cash or bonds)'] = text.match('and ' + "(.*)" + ' of your assets in income')[1];
        })
        strategicAssetAllocationSection_thirdParagraph().invoke('text').then(function (text) {
            D.dataForExport.strategicAssetAllocation['The chance of a negative return'] = '1 year in every' + text.match('1 year in every ' + "(.*)" + 'year')[1] + 'year(s)';
        })
        return this;
    }

    /*save_final_JSON_report(prefix) {
        cy.log('Object is ' + JSON.stringify(D.dataForExport))
        individualAccountNumber().invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            let accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.writeFile('S3_bucket/' + prefix + accountNo + '.json', D.dataForExport)
        })
        return this;
    }*/

    save_final_JSON_report(prefix) {
        cy.log('Object is ' + JSON.stringify(D.dataForExport))
        let currentdate = new Date();
        let datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getDate() + "_"
            + currentdate.getHours() + "-"
            + currentdate.getMinutes() + "-"
            + currentdate.getSeconds();
        cy.writeFile('S3_bucket/' + prefix + '_' + datetime + '.json', D.dataForExport)
        return this;
    }

    /*store_current_account_number(){
        individualAccountNumber().invoke('text').then(function (text) {
            const accountNo = text.match('Account (' + "(.*)" + ')')[1];
            cy.task('saveData', accountNo)
        })
    } */

    store_current_account_number(accountNo) {
        individualAccountNumber().invoke('text').then(function (text) {
            cy.log('ACCOUNT NUMBER ' + text)
            accountNo = text.match('Account (' + "(.*)" + ')')[1];

        })
    }


    save_report_for_Indicative_Portfolio_Cash() {
        let headers = [
            'Cash',
            'Sector Group | Industry',
            'Region',
            '$'

        ]
        let values = []

        for (let i = 0; i < 4; i++) {
            cashColumns().eq(i).invoke('text').then(function (value) {
                values[i] = value
            })
        }

        cy.generate_excel_file('Indicative Portfolio - Cash', [headers, values])
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Cash() {
        let firstColumnValues = [
            'Cash (AUDCASH)',
        ]
        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio.Cash = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_IB_Cash() {
        let firstColumnValues = [
            'AAA Cash ETF (AAA)',
            'BetaShares U.S. Dollar ETF (USD)',
            'Cash (AUDCASH)'
        ]
        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Cash'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Bonds() {
        let firstColumnValues = [
            'AGB Apr-2024 (GSBG24)',
            'AGB Apr-2025 (GSBG25)',
            'AGB Apr-2026 (GSBG26)',
            'AGB Apr-2027 (GSBG27)',
            'AGB Apr-2029 (GSBG29)',
            'AGB Apr-2033 (GSBG33)',
            'AGB Jun-2035 (GSBK35)',
            'AGB Jun-2039 (GSBK39)',
            'AGB May-2028 (GSBI28)',
            'AGB May-2030 (GSBI30)',
            'AGB May-2032 (GSBI32)',
            'AGB Nov-2031 (GSBU31)'
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Bonds'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_IB_Bonds() {
        let firstColumnValues = [
            'AGB Apr-2025 (GSBG25)',
            'AGB Apr-2029 (GSBG29)',
            'AGB Apr-2033 (GSBG33)',
            'AGB Dec-2030 (GSBW30)',
            'AGB Jun-2039 (GSBK39)',
            'AGB Nov-2028 (GSBU28)',
            'AGB Nov-2031 (GSBU31)',
            'Infl.AGB Aug-2040 (GSIO40)',
            'Infl.AGB Sep-2025 (GSIQ25)',
            'Infl.AGB Sep-2030 (GSIQ30)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Bonds'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Australian_Shares() {
        let firstColumnValues = [
            'ANZ (ANZ)',
            'Aristocrat Leisure (ALL)',
            'Coles (COL)',
            'Commonwealth Bank (CBA)',
            'Computershare (CPU)',
            'CSL (CSL)',
            'Endeavour (EDV)',
            'Medibank Private (MPL)',
            'National Australia Bank (NAB)',
            'Northern Star Resources (NST)',
            'Qantas Airways (QAN)',
            'Sonic Healthcare (SHL)',
            'Transurban (TCL)',
            'Treasury Wine Estates (TWE)',
            'Wesfarmers (WES)',
            'Westpac Bank (WBC)',
            'WiseTech Global (WTC)',
            'Woolworths (WOW)',
            'Xero (XRO)'
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Australian Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Australian_Shares_2() {
        let firstColumnValues = [
            'ANZ (ANZ)',
            'APA (APA)',
            'Aristocrat Leisure (ALL)',
            'BHP (BHP)',
            'Coles (COL)',
            'Commonwealth Bank (CBA)',
            'Computershare (CPU)',
            'CSL (CSL)',
            'Endeavour (EDV)',
            'Medibank Private (MPL)',
            'National Australia Bank (NAB)',
            'Northern Star Resources (NST)',
            'Qantas Airways (QAN)',
            'Sonic Healthcare (SHL)',
            'Transurban (TCL)',
            'Treasury Wine Estates (TWE)',
            'Wesfarmers (WES)',
            'Westpac Bank (WBC)',
            'WiseTech Global (WTC)',
            'Woodside Energy (WDS)',
            'Woolworths (WOW)',
            'Xero (XRO)'
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Australian Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_IB_Australian_Shares() {
        let firstColumnValues = [
            'ANZ (ANZ)',
            'APA (APA)',
            'Aristocrat Leisure (ALL)',
            'BHP (BHP)',
            'Coles (COL)',
            'Commonwealth Bank (CBA)',
            'Computershare (CPU)',
            'CSL (CSL)',
            'Endeavour (EDV)',
            'Medibank Private (MPL)',
            'National Australia Bank (NAB)',
            'Northern Star Resources (NST)',
            'Qantas Airways (QAN)',
            'Sonic Healthcare (SHL)',
            'Transurban (TCL)',
            'Treasury Wine Estates (TWE)',
            'Wesfarmers (WES)',
            'Westpac Bank (WBC)',
            'WiseTech Global (WTC)',
            'Woodside Energy (WDS)',
            'Woolworths (WOW)',
            'Xero (XRO)'
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Australian Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_International_Shares_2() {
        let firstColumnValues = [
            '3M (MMM)',
            'ABB (ABBN)',
            'Activision Blizzard (ATVI)',
            'Alphabet (GOOG)',
            'Amada (6113)',
            'American Tower Corp (AMT)',
            'Apple (AAPL)',
            'Applied Materials (AMAT)',
            'Assicurazioni Generali (G)',
            'Astellas Pharma (4503)',
            'Bristol-Myers Squibb (BMY)',
            'CDW Corp (CDW)',
            'Cisco Systems (CSCO)',
            'Citizens Financial (CFG)',
            'Cognizant (CTSH)',
            'DBS (D05)',
            'Deutsche Telekom (DTE)',
            'Diageo (DGE)',
            'eBay (EBAY)',
            'EDP (EDP)',
            'Eli Lilly and (LLY)',
            'Endesa (ELE)',
            'ENGIE (ENGI)',
            'Expedia (EXPE)',
            'General Dynamics (GD)',
            'General Motors (GM)',
            'Hitachi (6501)',
            'HOYA Corp (7741)',
            'Intertek (ITRK)',
            'J. M. Smucker (SJM)',
            'Johnson & Johnson (JNJ)',
            'JPMorgan Chase (JPM)',
            'KDDI Corp (9433)',
            'L3Harris Technologies (LHX)',
            'LVMH Moët Hennessy (MC)',
            'Merck (MRK)',
            'Meta Platforms (META)',
            'Microsoft Corp (MSFT)',
            'Moncler (MONC)',
            'Newmont Corp (NEM)',
            'Nintendo (7974)',
            'Novartis (NOVN)',
            'Novo Nordisk (NOVO B)',
            'Paychex (PAYX)',
            'Pernod Ricard (RI)',
            'Philip Morris Int. (PM)',
            'Public Storage (PSA)',
            'Recordati (REC)',
            'Robert Half Int. (RHI)',
            'Royal Ahold Delhaize (AD)',
            'Sanofi (SAN)',
            'Schneider Electric (SU)',
            'Sony Group Corp (6758)',
            'Taisei Corp (1801)',
            'Telenor ASA (TEL)',
            'Unilever (ULVR)',
            'Vinci (DG)',
            'Visa (V)',
            'Volkswagen (VOW3)',
            'Willis Towers Watson (WTW)',
            'Zoetis (ZTS)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['International Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_International_Shares() {
        let firstColumnValues = [
            '3M (MMM)',
            'ABB (ABBN)',
            'Activision Blizzard (ATVI)',
            'Alphabet (GOOG)',
            'Amada (6113)',
            'American Tower Corp (AMT)',
            'Apple (AAPL)',
            'Applied Materials (AMAT)',
            'Assicurazioni Generali (G)',
            'Astellas Pharma (4503)',
            'Bristol-Myers Squibb (BMY)',
            'CDW Corp (CDW)',
            'Cisco Systems (CSCO)',
            'Citizens Financial (CFG)',
            'Cognizant (CTSH)',
            'DBS (D05)',
            'Deutsche Telekom (DTE)',
            'Diageo (DGE)',
            'eBay (EBAY)',
            'EDP (EDP)',
            'Eli Lilly and (LLY)',
            'Expedia (EXPE)',
            'General Motors (GM)',
            'HOYA Corp (7741)',
            'Intertek (ITRK)',
            'J. M. Smucker (SJM)',
            'Johnson & Johnson (JNJ)',
            'JPMorgan Chase (JPM)',
            'KDDI Corp (9433)',
            'LVMH Moët Hennessy (MC)',
            'Merck (MRK)',
            'Meta Platforms (META)',
            'Microsoft Corp (MSFT)',
            'Moncler (MONC)',
            'Newmont Corp (NEM)',
            'Nintendo (7974)',
            'Novartis (NOVN)',
            'Novo Nordisk (NOVO B)',
            'Paychex (PAYX)',
            'Pernod Ricard (RI)',
            'Philip Morris Int. (PM)',
            'Public Storage (PSA)',
            'Recordati (REC)',
            'Robert Half Int. (RHI)',
            'Royal Ahold Delhaize (AD)',
            'Sanofi (SAN)',
            'Schneider Electric (SU)',
            'Sony Group Corp (6758)',
            'Taisei Corp (1801)',
            'Telenor ASA (TEL)',
            'Unilever (ULVR)',
            'Vinci (DG)',
            'Visa (V)',
            'Willis Towers Watson (WTW)',
            'Zoetis (ZTS)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['International Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_IB_International_Shares() {
        let firstColumnValues = [
            '3M (MMM)',
            'ABB (ABBN)',
            'Activision Blizzard (ATVI)',
            'Alphabet (GOOG)',
            'Amada (6113)',
            'American Tower Corp (AMT)',
            'Apple (AAPL)',
            'Applied Materials (AMAT)',
            'Assicurazioni Generali (G)',
            'Astellas Pharma (4503)',
            'Bristol-Myers Squibb (BMY)',
            'CDW Corp (CDW)',
            'Cisco Systems (CSCO)',
            'Citizens Financial (CFG)',
            'Cognizant (CTSH)',
            'DBS (D05)',
            'Deutsche Telekom (DTE)',
            'Diageo (DGE)',
            'eBay (EBAY)',
            'EDP (EDP)',
            'Eli Lilly and (LLY)',
            'Endesa (ELE)',
            'ENGIE (ENGI)',
            'Expedia (EXPE)',
            'General Dynamics (GD)',
            'General Motors (GM)',
            'Hitachi (6501)',
            'HOYA Corp (7741)',
            'Intertek (ITRK)',
            'J. M. Smucker (SJM)',
            'Johnson & Johnson (JNJ)',
            'JPMorgan Chase (JPM)',
            'KDDI Corp (9433)',
            'L3Harris Technologies (LHX)',
            'LVMH Moët Hennessy (MC)',
            'Merck (MRK)',
            'Meta Platforms (META)',
            'Microsoft Corp (MSFT)',
            'Moncler (MONC)',
            'Newmont Corp (NEM)',
            'Nintendo (7974)',
            'Novartis (NOVN)',
            'Novo Nordisk (NOVO B)',
            'Paychex (PAYX)',
            'Pernod Ricard (RI)',
            'Philip Morris Int. (PM)',
            'Public Storage (PSA)',
            'Recordati (REC)',
            'Robert Half Int. (RHI)',
            'Royal Ahold Delhaize (AD)',
            'Sanofi (SAN)',
            'Schneider Electric (SU)',
            'Sony Group Corp (6758)',
            'Taisei Corp (1801)',
            'Telenor ASA (TEL)',
            'Unilever (ULVR)',
            'Vinci (DG)',
            'Visa (V)',
            'Volkswagen (VOW3)',
            'Willis Towers Watson (WTW)',
            'Zoetis (ZTS)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['International Shares'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Excluded_securities_2() {
        let firstColumnValues = [
            'Volkswagen (VOW3)',
            'L3Harris Technologies (LHX)',
            'Woodside Energy (WDS)',
            'BHP (BHP)',
            'Hitachi (6501)',
            'Endesa (ELE)',
            'ENGIE (ENGI)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value, 2).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Security'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Indicative_Portfolio_Excluded_securities() {
        let firstColumnValues = [
            'General Dynamics (GD)',
            'Endesa (ELE)',
            'L3Harris Technologies (LHX)',
            'BHP (BHP)',
            'Volkswagen (VOW3)',
            'Woodside Energy (WDS)',
            'APA (APA)',
            'Hitachi (6501)',
            'ENGIE (ENGI)',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value, 2).invoke('text').then(function (amount) {
                D.dataForExport.indicativePortfolio['Security'][value] = amount
            })
        })
        return this;
    }


    save_data_object_for_Fees_Australian_Super() {
        let firstColumnValues = [
            'Platform Administration',
            'Investment Management',
            'ETF Fees & Other',
            'Performance',
            'Advice',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value, 3).invoke('text').then(function (amount) {
                D.dataForExport.feesAustralianSuper['Estimated Fees'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Your_Fees() {
        let firstColumnValues = [
            'Fixed Platform Administration',
            'Variable Platform Administration',
            'Platform Administration Subtotal',
            'Investment Management',
            'ETF Fees & Other',
            'Performance',
            'Advice',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value, 3).invoke('text').then(function (amount) {
                D.dataForExport.yourFees['Estimated Fees'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Fees_and_Charges_On_Going_Fees() {
        let firstColumnValues = [
            'Investment Management Fee',
            'Platform Administration Fee',
            'Advice Fee',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.feesAndCharges['On Going Fees'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Fees_and_Charges_Embedded_Fees() {
        let firstColumnValues = [
            'ETF Fees',
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.feesAndCharges['Embedded Fees'][value] = amount
            })
        })
        return this;
    }

    save_data_object_for_Fees_and_Charges_Initial_Costs() {
        let firstColumnValues = [
            'Initial Transaction Costs (estimated)',
            'Advice Fee'
        ]

        let self = this
        firstColumnValues.forEach(function (value) {
            self.amountInTableFoundByLabelInFirstColumn(value).invoke('text').then(function (amount) {
                D.dataForExport.feesAndCharges['Initial Costs'][value] = amount
            })
        })
        return this;
    }

    fromListToObject(array) {
        var obj = {};
        for (let i in array[0]) {
            obj[array[0[i]]] = array[1[i]];
        }
        ;
        return obj
    };

    save_report_for_Indicative_Portfolio_Bonds() {
        let headers = [
            'Bonds',
            'Sector Group | Industry',
            'Region',
            '$'
        ]
        let excelData = [headers]

        for (let r = 4; r < 16; r++) {
            let values = []
            for (let c = 0; c < 4; c++) {
                indicativePortfolio_table1_rows().eq(r).find('td').eq(c).invoke('text').then(function (value) {
                    values[c] = value

                    if (c === 3) {
                        excelData.push(values)
                    }
                })
            }
        }

        cy.generate_excel_file('Indicative Portfolio - Bonds', excelData)
        return this;
    }

    save_report_for_Indicative_Portfolio_Australian_Shares() {
        let headers = [
            'Bonds',
            'Sector Group | Industry',
            'Region',
            '$'
        ]
        let excelData = [headers]

        for (let r = 18; r < 36; r++) {
            let values = []
            for (let c = 0; c < 4; c++) {
                indicativePortfolio_table1_rows().eq(r).find('td').eq(c).invoke('text').then(function (value) {
                    values[c] = value
                })
            }
            excelData.push(values)
        }

        cy.generate_excel_file('Indicative Portfolio - Australian_Shares', excelData)
        return this;
    }

    save_report_for_Indicative_Portfolio_International_Shares() {
        let headers = [
            'Bonds',
            'Sector Group | Industry',
            'Region',
            '$'
        ]
        let excelData = [headers]

        for (let r = 38; r < 93; r++) {
            let values = []
            indicativePortfolio_table1_rows().eq(r).within(() => {
                for (let c = 0; c < 4; c++) {
                    cy.get('td').eq(c).invoke('text').then(function (value) {
                        values[c] = value
                    })
                }
            })
            excelData.push(values)
        }

        cy.generate_excel_file('Indicative Portfolio - International_Shares', excelData)
        return this;
    }

    save_report_for_Indicative_Portfolio_Excluded_securities() {
        let headers = [
            'Security',
            'Your Ethics'
        ]
        let excelData = [headers]

        for (let r = 0; r < 7; r++) {
            let values = []
            excludedSecurityTable_rows().eq(r).within(() => {
                for (let c = 0; c < 2; c++) {
                    cy.get('td').eq(c).invoke('text').then(function (value) {
                        values[c] = value
                    })
                }
            })
            excelData.push(values)
        }

        cy.generate_excel_file('Indicative Portfolio -  Excluded securities', excelData)
        return this;
    }

    save_report_for_Fees() {
        let headers = [
            'Investment Management Fee',
            'Platform Administration Fee',
            'Advice Fee',
            'ETF Fees',
            'Initial Transaction Costs (estimated)',
            'Advice Fee'
        ]
        let values = []
        feesTable_rows().eq(1).find('td').eq(3).invoke('text').then(function (text) {
            values[0] = text
        })
        feesTable_rows().eq(2).find('td').eq(3).invoke('text').then(function (text) {
            values[1] = text
        })
        feesTable_rows().eq(3).find('td').eq(3).invoke('text').then(function (text) {
            values[2] = text
        })
        feesTable_rows().eq(5).find('td').eq(3).invoke('text').then(function (text) {
            values[3] = text
        })
        feesTable_rows().eq(7).find('td').eq(3).invoke('text').then(function (text) {
            values[4] = text
        })
        feesTable_rows().eq(8).find('td').eq(3).invoke('text').then(function (text) {
            values[5] = text
        })

        cy.generate_excel_file('Fees', [headers, values])
        return this;
    }

    verify_sidebar_content(option) {
        sideBar().should('contain', option);
        return this;
    }

    click_sidebar_option(option) {
        sideBar().contains(option).click();
        return this;
    }

    verify_sidebar_content_not_exist(option) {
        //this.pause(5)
        sideBar().should('be.visible')
        sideBar().should('not.contain', option);
        return this;
    }

    verify_net_worth_annual_net_income_liquid_net_worth() {
        questionsOnReviewPage(14).should('have.text', 'Net Worth:');
        answersOnReviewPage(14).should('have.text', '$200,000');
        questionsOnReviewPage(15).should('have.text', 'Annual Net Income:');
        answersOnReviewPage(15).should('have.text', '$70,000');
        questionsOnReviewPage(16).should('have.text', 'Liquid Net Worth:');
        answersOnReviewPage(16).should('have.text', '$110,000');
        return this;
    }

    enter_compliance_values(data) {
        //this is commented because this field isn't visible anymore
        //  statementOfInquiry().type(data.statementOfInquiry);

        sourceType().click();
        if (data.sourceType !== 'Other') {
            dropdownOption(data.sourceType).click();
        } else if (data.sourceType === 'Other') {
            dropdownOption(data.sourceType).click();
            descriptionOtherSourceType().type(data.description)
        }
        cy.wait(5000)
        politicalMilitaryDiplomatic().click()
        politicalMilitaryDiplomaticDropdownOption(data.politicalMilitaryDiplomatic).click()
        if (data.politicalMilitaryDiplomatic === 'Yes') {
            affiliationDetailName().type(data.affiliationDetailName)
            affiliationRelationship().click();
            dropdownOption(data.affiliationRelationship).click()
            companyEmail().type(data.companyEmail)
        }
        controller().click({force: true})
        controllerDropdownOption(data.controller).click();
        if (data.controller === 'Yes') {
            exchangeCode().type(data.exchangeCode)
        }
        percentage().click();
        percentage().type(data.percentage).type('{enter}');
        return this;
    }

    enter_compliance_source_type_and_percentage(data) {
        sourceType().click();
        dropdownOption(data.sourceType).click();
        percentage().click();
        percentage().type(data.percentage).type('{enter}');
        statementOfInquiry().type(data.statementOfInquiry)
        return this;
    }

    verify_your_portfolio_content_not_exist(option) {
        //this.pause(3)
        cy.get('[class="ant-collapse-content ant-collapse-content-active"]').should('be.visible');
        cy.get('[class="ant-collapse-content ant-collapse-content-active"]').should('not.contain', option);
        return this;
    }

    go_through_tour_steps(data) {
        tourWindow().should('be.visible');
        this.pause(1)
        this.verify_text_is_visible(data.step1)
        nextButtonTourWindow().click()
        this.verify_text_is_visible(data.step2)
        nextButtonTourWindow().click()
        this.verify_text_is_visible(data.step3)
        nextButtonTourWindow().click()
        this.verify_text_is_visible(data.step4)
        nextButtonTourWindow().click()
        this.verify_text_is_visible(data.step5)
        nextButtonTourWindow().click()
        this.verify_text_is_visible(data.step6)
        nextButtonTourWindow().click()
        if (data.step7) {
            this.verify_text_is_visible(data.step7)
            nextButtonTourWindow().click()
        }
        if (data.step8) {
            this.verify_text_is_visible(data.step8)
            nextButtonTourWindow().click()
        }
        if (data.step9) {
            this.verify_text_is_visible(data.step9)
            nextButtonTourWindow().click()
        }
        if (data.step10) {
            this.verify_text_is_visible(data.step10)
            nextButtonTourWindow().click()
        }
        return this;
    }

    click_on_need_help_with_this_page() {
        modalButton().click();
        return this;
    }

    verify_modal_window() {
        modalWindow().should('be.visible');
        return this;
    }

    click_and_verify_each_modal_step() {
        //  this.verify_text_is_visible('Video Tutorial');
        //  videoTutorial().should('be.visible');
        this.verify_text_is_visible('Chat with us');
        cy.contains('Chat with us').click();
        chat().should('be.visible');
        this.verify_text_is_visible('Contact us');
        cy.contains('Contact us').click();
        meetings().should('be.visible');
        return this;
    }

    click_done_button() {
        cy.contains('Done').click();
        return this;
    }

    function

    click_on_next_question_button(numberOfQuestions) {
        for (let i = 0; i < numberOfQuestions; i++) {
            nextQuestionButton().then(($buttons) => {
                if ($buttons.length > 0) {
                    cy.wrap($buttons[0]).click();
                }
            });
        }
        return this;
    }

}




