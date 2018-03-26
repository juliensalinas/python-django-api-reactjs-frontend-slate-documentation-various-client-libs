/* @flow */

/* eslint-disable */

/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable key-spacing */

export default {
  locale: 'fr',
  pluralRuleFunction(n: any, ord: any): string {
    if (ord) {
      return n === 1 ? 'one' : 'other';
    }

    return n >= 0 && n < 2 ? 'one' : 'other';
  },
  fields: {
    year: {
      displayName: 'année',
      relative: {
        '0': 'cette année',
        '1': 'l’année prochaine',
        '-1': 'l’année dernière',
      },
      relativeTime: {
        future: {
          one: 'dans {0} an',
          other: 'dans {0} ans',
        },
        past: {
          one: 'il y a {0} an',
          other: 'il y a {0} ans',
        },
      },
    },
    month: {
      displayName: 'mois',
      relative: {
        '0': 'ce mois-ci',
        '1': 'le mois prochain',
        '-1': 'le mois dernier',
      },
      relativeTime: {
        future: {
          one: 'dans {0} mois',
          other: 'dans {0} mois',
        },
        past: {
          one: 'il y a {0} mois',
          other: 'il y a {0} mois',
        },
      },
    },
    day: {
      displayName: 'jour',
      relative: {
        '0': 'aujourd’hui',
        '1': 'demain',
        '2': 'après-demain',
        '-2': 'avant-hier',
        '-1': 'hier',
      },
      relativeTime: {
        future: {
          one: 'dans {0} jour',
          other: 'dans {0} jours',
        },
        past: {
          one: 'il y a {0} jour',
          other: 'il y a {0} jours',
        },
      },
    },
    hour: {
      displayName: 'heure',
      relativeTime: {
        future: {
          one: 'dans {0} heure',
          other: 'dans {0} heures',
        },
        past: {
          one: 'il y a {0} heure',
          other: 'il y a {0} heures',
        },
      },
    },
    minute: {
      displayName: 'minute',
      relativeTime: {
        future: {
          one: 'dans {0} minute',
          other: 'dans {0} minutes',
        },
        past: {
          one: 'il y a {0} minute',
          other: 'il y a {0} minutes',
        },
      },
    },
    second: {
      displayName: 'seconde',
      relative: {
        '0': 'maintenant',
      },
      relativeTime: {
        future: {
          one: 'dans {0} seconde',
          other: 'dans {0} secondes',
        },
        past: {
          one: 'il y a {0} seconde',
          other: 'il y a {0} secondes',
        },
      },
    },
  },

  'meta.titleTemplate': 'My App',
  'meta.title': 'My App',

  // Global

  'global.search'     : 'Recherche',
  'global.loading'    : 'Chargement en cours',
  'global.error'      : 'Une erreur est survenue lorsque nous avons contacté le serveur. Veuillez réessayer un peu plus tard.',
  'global.error.1'    : 'Aucun email renseigné',
  'global.error.2'    : 'Aucun mot de passe renseigné',
  'global.error.3'    : "Format d'email incorrect",
  'global.error.4'    : "Format de mot de passe incorrect",
  'global.error.5'    : "L'utilisateur existe déjà",
  'global.error.6'    : "Problème rencontré au moment de la création du token",
  'global.error.7'    : "Problème rencontré au moment de la création des droits utilisateur",
  'global.error.8'    : 'Mauvais méthode http',
  'global.error.9'    : 'Le lien privé a expiré',
  'global.error.10'   : 'Aucun utilisateur trouvé',
  'global.error.11'   : 'Aucun secret envoyé',
  'global.error.12'   : 'Aucune confirmation de mot de passe envoyée',
  'global.error.13'   : 'Le mot de passe et sa confirmation ne sont pas égaux',

  'global.error.TooManyRequestsError': 'Vous avez dépassé votre quota',
  'global.error.InvalidDomainError': 'Domaine invalide',
  'global.error.InvalidEmailError': 'Email invalide',

  // Must use keywords defined here: https://github.com/epoberezkin/ajv-i18n/blob/master/messages/index.js
  // global.form.error.<inputName>.<keyword>
  'global.form.error.email.format': 'Un email valide est requis',
  'global.form.error.password.minLength': 'Un mot de passe de plus de 8 caractères est requis',
  'global.form.error.password.notCommonPassword': 'Mot de passe trop commun',
  'global.form.error.password.not': "Le mot de passe ne doit pas être similaire à l'email",
  'global.form.error.password.notOnlyNumeric': 'Le mot de passe ne doit pas uniquement contenir des caractères numériques',

  // Fields

  'fields.company': 'Entreprise',
  'fields.description': 'Description',
  'fields.email': 'Email',
  'fields.firstName': 'Prénom',
  'fields.formattedAddress': 'Adresse formatée',
  'fields.founded': 'Création',
  'fields.industries': 'Industries',
  'fields.lastName': 'Nom',
  'fields.lastUpdated': 'Dernière mise à jour',
  'fields.linkedinUrl': 'URL LinkedIn',
  'fields.location': 'Localisation',
  'fields.name': 'Nom',
  'fields.phone': 'Téléphone',
  'fields.size': 'Taille',
  'fields.title': 'Titre',
  'fields.types': 'Types',
  'fields.websiteUrl': 'URL du site web',

  // Sidebar

  'sidebar.dashboard': 'Tableau de bord',
  'sidebar.companyLookup': "Recherche d'entreprise",
  'sidebar.contactLookup': "Recherche de contact",
  'sidebar.account': 'Compte',
  'sidebar.apiKey': 'Clé API',
  'sidebar.subscription': 'Abonnement',
  'sidebar.getStarted': 'Introduction au service',
  'sidebar.apiDocs': "Documentation de l'API",
  'sidebar.support': 'Support',
  'sidebar.logout': 'Déconnexion',

  // Dashboard

  'dashboard.title': 'Tableau de bord',
  'dashboard.content1': `Bienvenue à bord! 
  Nous sommes heureux de vous compter parmi nos premiers utilisateurs.`, 
  'dashboard.content2': `L'API Enrichment sera accessible dans sa version Beta privée 
  jusqu’au 8 Septembre 2017. Vous pouvez obtenir des informations d’entreprises 
  et de contacts à partir d’une adresse e-mail ou d’un nom de domaine.`, 
  'dashboard.content3': `Pour tester l’API sans plus tarder envoyez-nous un e-mail à 
  {contactEmail}. Un membre de notre équipe activera votre compte.`, 
  'dashboard.content4': `Nous avons besoin de votre aide pour construire un produit à forte valeur ajoutée. 
  N’hésitez pas à nous envoyer vos remarques et vos questions par e-mail.`, 
  'dashboard.content5': `Merci par avance, nous attendons vos retours avec impatience.`,
  'dashboard.contactEmail': `info@myapp.com`,

  // Account

  'account.title': 'Compte',
  'account.content': `Vous pouvez réinitialiser votre mot de passe en cliquant 
  sur le bouton ci-dessous. Contactez-nous pour changer votre adresse e-mail.`,
  'account.resetPassword.submit': 'Changer le mot de passe',
  'account.resetPassword.success.content': 'Vous allez très bientôt recevoir un email vous permettant de modifier votre mot de passe.',

  // API Key

  'apiKey.title': 'Votre clé API',
  'apiKey.content': `Vous trouverez ci-dessous votre token. Ce dernier est indispensable pour utiliser l’API. 
                     Vous pouvez également {contactUs} pour obtenir un nouveau token.`,
  'apiKey.contactUs': 'nous contacter',

  // Company

  'company.input.placeholder': 'Entrez un nom de domaine',
  'company.notFound': 'Aucun résultat trouvé pour ce domaine',

  // Contact

  'contact.input.placeholder': 'Entrez un email',
  'contact.notFound': 'Aucun résultat trouvé pour cet email',

  // Get started

  'getStarted.title': 'Get started',
  'getStarted.content': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

  // Login

  'login.title': 'Connexion',
  'login.actions.signUp': "Inscription",
  'login.actions.forgotYourPassword': 'Mot de passe oublié ?',
  'login.form.email.placeholder': 'Votre email',
  'login.form.password.placeholder': 'Votre mot de passe',
  'login.form.submit': 'Connexion',
  'login.errors.generic': 'Email ou mot de passe invalides',

  // Logout

  'logout.title': 'Déconnexion',
  'logout.confirm': 'Oui me déconnecter',

  // Forgot password

  'forgottenPassword.title': 'Mot de passe oublié ?',
  'forgottenPassword.content': 'Pas de problème, veuillez renseigner votre email ci-dessous.',
  'forgottenPassword.success': 'Un email va vous être envoyé sous peu.',
  'forgottenPassword.form.email.placeholder': 'Votre email',
  'forgottenPassword.form.submit': 'Réinitialiser mon mot de passe',
  'forgottenPassword.actions.login': 'Connexion',

  // Register

  'register.title': 'Inscription',
  'register.form.email.placeholder': 'Votre email',
  'register.form.password.placeholder': 'Votre mot de passe',
  'register.form.submit': "S'inscrire",
  'register.actions.login': 'Connexion',

  // Change password with secret

  'changePasswordWithSecret.title': 'Modifiez votre mot de passe',
  'changePasswordWithSecret.success.content': 'Votre mot de passe a été réinitialisé avec succès! Veuillez vous connecter.',
  'changePasswordWithSecret.success.actions.login': 'Connexion',
  'changePasswordWithSecret.form.password.placeholder': 'Votre nouveau mot de passe',
  'changePasswordWithSecret.form.confirmPassword.placeholder': 'Confirmez votre nouveau mot de passe',
  'changePasswordWithSecret.form.submit': 'Modifier mon mot de passe',

  // Support

  'support.title': 'Support',

  'support.questions.title': 'Questions?',
  'support.questions.content': `Une FAQ contenant les questions posées régulièrement par nos utilisateurs est en cours d’élaboration. 
  En attendant, vous pouvez nous poser toutes vos questions à l’adresse info@myapp.com. 
  Nous reviendrons vers vous dans les meilleurs délais.`,

  'support.apiDocs.title': `Documentation de l'API`,
  'support.apiDocs.content': `Accédez à {apiDocsUrl}.`,
  'support.apiDocsUrl': `la documentation complète de l'API`,

  // 'support.chatToUs.title': 'Chat to us',
  // 'support.chatToUs.content': 'Got any technical questions? Our developers like to hang out in Slack.',

  // 'support.emailUs.title': 'Email us',
  // 'support.emailUs.content': `Can't find the answer? We’re here to help. Get in touch and we’ll get back to you in a jiffy.`,

  // Getting started

  'gettingStarted.title': 'Bien démarrer avec My App',

  'gettingStarted.steps.startLearning.key': 'Apprenez :',
  'gettingStarted.steps.startLearning.value': "{key} essayez l'API ci-dessus.",

  'gettingStarted.steps.integrate.key': 'Intégrez :',
  'gettingStarted.steps.integrate.value': "{key} envoyez les donnez directement à votre CRM ou à votre plateforme d'analyse.",

  'gettingStarted.steps.engage.key': 'Passez à la vitesse supérieure :',
  'gettingStarted.steps.engage.value': "{key} upgradez votre compte afin d'utiliser l'API de façon plus intensive.",

  // 404

  'noMatch.title': `Cette page n'existe pas`,
  'noMatch.content': 'Le lien que vous avez suivi est peut-être erroné, ou bien la page a-t-elle peut-être été supprimée.',
  'noMatch.homepageLink': "Aller à la page d'accueil",

};

/* eslint-enable quote-props */
/* eslint-enable max-len */
/* eslint-enable no-nested-ternary */
/* eslint-enable eqeqeq */
/* eslint-enable key-spacing */

/* eslint-enable */
