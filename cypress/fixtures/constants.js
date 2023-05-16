let C = exports;

C.labels = {}

C.errorMsg = {
    incorrectEmailOrPassword: "Incorrect username or password.",
    checkAllBoxes: "Please check all boxes to continue",
    insuranceRequiredFields: '\'investment_account_identifier.personal_super_insurance_premium_choice\' is required'

}
C.noEthicsMessage = 'You have not chosen any ethics to be excluded from your portfolio'
C.alertMsgReviewPage = 'You must have minimum 2 applicant(s).'
C.wrongCredentials = 'Incorrect username or password.'

C.stepMessages = {
    step1: "Welcome to the Nucleus Wealth Onboarding Portal. Please take a minute to familiarise yourself with the key functions of the portal.",
    step2: "You can always come back and change your investment choice later.",
    step3: "You can always go back",
    step4: "You may jump to different tabs within the onboarding portal. Make sure you have saved the settings on your current page before moving tabs.",
    step5: "Each page in the onboarding portal has a short video tutorial for you to watch in case you get stuck.",
    step6: "If you are still stuck or have questions after watching our video tutorial, you'll have the option to message us through our chat box, or simply give us a call."
}
C.emailTemplates = {
    individualAccountCreated: {
        from: `Nucleus Wealth <contact@nucleuswealth.com>`,
        subject: 'Your Investment Account Application has been submitted',
        content: 'Welcome aboard! Your application for Individual Investment Account has been successfully submitted.',
        attachments: [
            'Nucleus Wealth - Financial Services Guide.pdf',
            'Nucleus Wealth - Investment and Fee Summary.pdf',
            'Nucleus Wealth - Statement of Advice.pdf',
            'Praemium SMA - Product Disclosure Statement and Investment Menu extract.pdf'
        ]
    },

    individual_IB_AccountCreated: {
        from: `Nucleus Wealth <contact@nucleuswealth.com>`,
        subject: 'Your Investment Account Application has been submitted',
        content: 'Welcome aboard! Your application for Individual Investment Account has been successfully submitted.',
        attachments: [
            'Nucleus Wealth - Financial Services Guide.pdf',
            'Nucleus Wealth - MDA Brochure and Agreement.pdf',
            'Nucleus Wealth - Investment and Fee Summary.pdf',
            'Nucleus Wealth - Statement of Advice.pdf',
        ]
    },

    accountChanges: {
        from: `Nucleus Wealth <contact@nucleuswealth.com>`,
        subject: 'Account Changes successfully received',
        content: 'The changes for your Individual Investment Account has been successfully submitted. ',
        attachments: [
            'Nucleus Wealth- Financial Services Guide.pdf',
            'Praemium SMA - Product Disclosure Statement and Investment Menu extract.pdf',
            'Nucleus Wealth - Record of Engagement.pdf'
        ]
    },

    changeEthics: {
        from: `Nucleus Wealth <contact@nucleuswealth.com>`,
        subject: 'Account Changes successfully received',
        content: 'The changes for your Individual Investment Account has been successfully submitted. ',
        attachments: [
            'Nucleus Wealth- Financial Services Guide.pdf',
            'Praemium SMA - Product Disclosure Statement and Investment Menu extract.pdf',
            'Nucleus Wealth - Statement of Advice.pdf'
           // 'Nucleus Wealth - Record of Engagement.pdf'
        ]
    },

    uploadedDocument: {
        from: `Nucleus Wealth <dev@nucleuswealth.com>`,
      //  subject: 'Document Uploaded by tesf14cb@nucleuswealth.com for NW5684',
        subject: 'Document Uploaded',
        content: 'driver_license has been uploaded',
        attachments: []
    },

    signUpNewUser: {
        from: `Nucleus Wealth <contact@nucleuswealth.com>`,
        subject: 'Test Email - Welcome to Nucleus Wealth',
        content: 'Thanks for registering with Nucleus Wealth.',
        attachments: [
            'Nucleus Wealth - Financial Services Guide.pdf',
        ]
    },
}
module.exports = C;