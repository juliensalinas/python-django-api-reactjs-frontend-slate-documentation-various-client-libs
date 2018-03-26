/* @flow */

/* eslint-disable */

/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable key-spacing */

export default {
  locale: 'en',
  pluralRuleFunction(n: any, ord: any): string {
    var s    = String(n).split('.');
    var v0   = !s[1];
    var t0   = Number(s[0]) == n;
    var n10  = t0 && s[0].slice(-1);
    var n100 = t0 && s[0].slice(-2);

    if (ord) {
      return n10 === 1 && n100 !== 11 ? 'one' : n10 === 2 && n100 !== 12 ? 'two' : n10 === 3 && n100 !== 13 ? 'few' : 'other';
    }

    return n === 1 && v0 ? 'one' : 'other';
  },
  fields: {
    year: {
      displayName: 'year',
      relative: {
        '0': 'this year',
        '1': 'next year',
        '-1': 'last year',
      },
      relativeTime: {
        future: {
          one: 'in {0} year',
          other: 'in {0} years',
        },
        past: {
          one: '{0} year ago',
          other: '{0} years ago',
        },
      },
    },
    month: {
      displayName: 'month',
      relative: {
        '0': 'this month',
        '1': 'next month',
        '-1': 'last month',
      },
      relativeTime: {
        future: {
          one: 'in {0} month',
          other: 'in {0} months',
        },
        past: {
          one: '{0} month ago',
          other: '{0} months ago',
        },
      },
    },
    day: {
      displayName: 'day',
      relative: {
        '0': 'today',
        '1': 'tomorrow',
        '-1': 'yesterday',
      },
      relativeTime: {
        future: {
          one: 'in {0} day',
          other: 'in {0} days',
        },
        past: {
          one: '{0} day ago',
          other: '{0} days ago',
        },
      },
    },
    hour: {
      displayName: 'hour',
      relativeTime: {
        future: {
          one: 'in {0} hour',
          other: 'in {0} hours',
        },
        past: {
          one: '{0} hour ago',
          other: '{0} hours ago',
        },
      },
    },
    minute: {
      displayName: 'minute',
      relativeTime: {
        future: {
          one: 'in {0} minute',
          other: 'in {0} minutes',
        },
        past: {
          one: '{0} minute ago',
          other: '{0} minutes ago',
        },
      },
    },
    second: {
      displayName: 'second',
      relative: {
        '0': 'now',
      },
      relativeTime: {
        future: {
          one: 'in {0} second',
          other: 'in {0} seconds',
        },
        past: {
          one: '{0} second ago',
          other: '{0} seconds ago',
        },
      },
    },
  },

  'meta.titleTemplate': 'My App',
  'meta.title': 'My App',

  // Global

  'global.search'     : 'Search',
  'global.loading'    : 'Loading',
  'global.error'      : 'An error happened while contacting server, try again later',
  'global.error.1'    : 'No email supplied',
  'global.error.2'    : 'No password supplied',
  'global.error.3'    : 'Email format is incorrect',
  'global.error.4'    : 'Password format is incorrect',
  'global.error.5'    : 'User already exists',
  'global.error.6'    : 'Problem during token creation',
  'global.error.7'    : 'Problem during user rights creation',
  'global.error.8'    : 'Wrong HTTP method',
  'global.error.9'    : 'Private link expired',
  'global.error.10'   : 'No user found',
  'global.error.11'   : 'No secret supplied',
  'global.error.12'   : 'No password_confirmation supplied',
  'global.error.13'   : 'Password and password_confirmation are not equal',

  'global.error.TooManyRequestsError': 'You have exceeded your quota',
  'global.error.InvalidDomainError': 'Invalid domain',
  'global.error.InvalidEmailError': 'Invalid email',

  // Must use keywords defined here: https://github.com/epoberezkin/ajv-i18n/blob/master/messages/index.js
  // global.form.error.<inputName>.<keyword>
  'global.form.error.email.format': 'A valid email is required',
  'global.form.error.password.minLength': 'A password of 8 characters is required',
  'global.form.error.password.notCommonPassword': 'Too common password',
  'global.form.error.password.not': 'The password must not be the same as the email',
  'global.form.error.password.notOnlyNumeric': 'Only numeric password is not allowed',

  // Fields

  'fields.company': 'Company',
  'fields.description': 'Description',
  'fields.email': 'Email',
  'fields.firstName': 'First Name',
  'fields.formattedAddress': 'Formatted Address',
  'fields.founded': 'Founded',
  'fields.industries': 'Industries',
  'fields.lastName': 'Last Name',
  'fields.lastUpdated': 'Last Updated',
  'fields.linkedinUrl': 'LinkedIn URL',
  'fields.location': 'Location',
  'fields.name': 'Name',
  'fields.phone': 'Phone',
  'fields.size': 'Size',
  'fields.title': 'Title',
  'fields.types': 'Types',
  'fields.websiteUrl': 'Website URL',

  // Sidebar

  'sidebar.dashboard': 'Dashboard',
  'sidebar.companyLookup': 'Company Lookup',
  'sidebar.contactLookup': 'Contact Lookup',
  'sidebar.account': 'Account',
  'sidebar.apiKey': 'API Key',
  'sidebar.subscription': 'Subscription',
  'sidebar.getStarted': 'Get Started',
  'sidebar.apiDocs': 'API Docs',
  'sidebar.support': 'Support',
  'sidebar.logout': 'Logout',

  // Dashboard

  'dashboard.title': 'Dashboard',
  'dashboard.content1': `Welcome on board!
  We are glad to count you among our first users.`, 
  'dashboard.content2': `The Enrichment API will be available in a private beta version until September 8th, 2017. 
  You can get enriched data on people and businesses from an email address or a domain name.`, 
  'dashboard.content3': `To start using the API please send an e-mail to {contactEmail} so an admin can 
  activate your account.`, 
  'dashboard.content4': `We definitely need your help in order to build a high-value added product. 
  Don’t hesitate to email us your comments and questions.`, 
  'dashboard.content5': `Thank you in advance, we look forward to hearing from you.`,
  'dashboard.contactEmail': `info@myapp.com`, 

  // Account

  'account.title': 'Account',
  'account.content': `For now you can reset your password by clicking the 
  button below. If you want to change your email address please contact us.`,
  'account.resetPassword.submit': 'Reset password',
  'account.resetPassword.success.content': 'You will shortly receive an email to change your password',

  // API Key

  'apiKey.title': 'Your API Key',
  'apiKey.content': `Here is your access key for our API. Save it. 
                     If you wish to obtain a new key, please {contactUs}.`,
  'apiKey.contactUs': 'contact us',

  // Company

  'company.input.placeholder': 'Enter a domain',
  'company.notFound': 'No result for this domain',

  // Contact

  'contact.input.placeholder': 'Enter an email',
  'contact.notFound': 'No result for this email',

  // Get started

  'getStarted.title': 'Get started',
  'getStarted.content': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

  // Login

  'login.title': 'Login',
  'login.actions.signUp': 'Sign up',
  'login.actions.forgotYourPassword': 'Forgot your password ?',
  'login.form.email.placeholder': 'Your email',
  'login.form.password.placeholder': 'Your password',
  'login.form.submit': 'Login',
  'login.errors.generic': 'Invalid email or password',

  // Logout

  'logout.title': 'Logout',
  'logout.confirm': 'Yes logout',

  // Forgot password

  'forgottenPassword.title': 'Forgot your password ?',
  'forgottenPassword.content': 'No worries, just enter your email below.',
  'forgottenPassword.success': 'An email will be sent shortly',
  'forgottenPassword.form.email.placeholder': 'Your email',
  'forgottenPassword.form.submit': 'Reset my password',
  'forgottenPassword.actions.login': 'Login',

  // Register

  'register.title': 'Register',
  'register.form.email.placeholder': 'Your email',
  'register.form.password.placeholder': 'Your password',
  'register.form.submit': 'Sign up',
  'register.actions.login': 'Login',

  // Change password with secret

  'changePasswordWithSecret.title': 'Change your password',
  'changePasswordWithSecret.success.content': 'Your password has been reset successfully! Go to the Login page.',
  'changePasswordWithSecret.success.actions.login': 'Login',
  'changePasswordWithSecret.form.password.placeholder': 'Your new password',
  'changePasswordWithSecret.form.confirmPassword.placeholder': 'Confirm your new password',
  'changePasswordWithSecret.form.submit': 'Change my password',

  // Support

  'support.title': 'Support',

  'support.questions.title': 'Questions?',
  'support.questions.content': `We are currently creating an Q&A containing the main questions asked by our customers. 
  In the meantime, you can send your questions to info@myapp.com. We are ready to help you. 
  Contact us and we will get back to you shortly.`,

  'support.apiDocs.title': 'API docs',
  'support.apiDocs.content': 'Check out {apiDocsUrl}.',
  'support.apiDocsUrl': 'our latest API documentation',

  // 'support.chatToUs.title': 'Chat to us',
  // 'support.chatToUs.content': 'Got any technical questions? Our developers like to hang out in Slack.',

  // 'support.emailUs.title': 'Email us',
  // 'support.emailUs.content': `Can't find the answer? We’re here to help. Get in touch and we’ll get back to you in a jiffy.`,

  // Getting started

  'gettingStarted.title': 'Getting started with My App',

  'gettingStarted.steps.startLearning.key': 'Start learning:',
  'gettingStarted.steps.startLearning.value': '{key} try the API above.',

  'gettingStarted.steps.integrate.key': 'Integrate:',
  'gettingStarted.steps.integrate.value': '{key} send data into your existing CRM or analytics platform.',

  'gettingStarted.steps.engage.key': 'Engage:',
  'gettingStarted.steps.engage.value': '{key} upgrade your account to unlock more API calls.',

  // 404

  'noMatch.title': `This page isn't available`,
  'noMatch.content': 'The link you followed may be broken, or the page may have been removed.',
  'noMatch.homepageLink': 'Go to homepage',
};

/* eslint-enable quote-props */
/* eslint-enable max-len */
/* eslint-enable no-nested-ternary */
/* eslint-enable eqeqeq */
/* eslint-enable key-spacing */

/* eslint-enable */
