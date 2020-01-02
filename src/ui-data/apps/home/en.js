export default {
    validation: {
        email: 'Please enter a valid email.',
        required: 'This field is required',
        number: 'Only numbers are permitted',
        alpha: 'Only letters are permitted',
        alphaNumeric: 'Only letters and numbers are permitted.',
        phone: 'Please enter a valid phone number',
        internationalPhone: 'Please enter a valid phone number',
        ccExpire: 'Invalid expiration date.',
        other: 'Invalid input. Please try again.'
    },
    translations: {
        create: 'Create',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',
        finish: 'Finish',
        backToList: 'Back to List',
        search: 'Search',
        reset: 'Reset',
        login: 'Log in',
        loginDesc: 'Log in with your email address.',
        logout: 'Log out',
        register: 'Register',
        brand: {
            text: 'Pebble Fields',
        },
        banner: {
            text: 'Betsy',
            subText: 'a helping hand for elderly communication',
        },
    },
    routes: [
        {
            text: 'Home',
            route: '/',
        },
        {
            text: 'Account',
            route: '/account',
            category: 'mainNav',
            roles: ['account'],
        },
        {
            text: 'Assistant',
            route: '/assistant',
            category: 'mainNav',
            roles: ['assistant'],
        },
        {
            text: 'Admin',
            route: '/admin',
            category: 'mainNav',
            roles: ['admin'],
        },
        {
            text: 'Accounts',
            route: '/accounts',
            category: 'mainNav',
            roles: ['admin'],
        },
        {
            text: 'Logs',
            route: '/logs',
            category: 'mainNav',
            roles: ['admin'],
        },
        {
            text: 'Assistants',
            route: '/assistants',
            category: 'mainNav',
            roles: ['account'],
        },
        {
            text: 'People',
            route: '/people',
            category: 'mainNav',
            roles: ['account', 'assistant'],
        },
        {
            text: 'Log in',
            route: '/login',
        },
        {
            text: 'Registration',
            route: '/register',
        },
        {
            text: 'Betsy',
            route: '/betsy',
            category: 'mainNav',
            roles: ['assistant'],
        },
    ],
};
