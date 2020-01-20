
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
        brand: {
            text: 'Pebble Fields',
        },
    },
    forms: { 
        formItem: {
            fields: [
                {
                    key: 'itemName',
                    fieldName: 'Name',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'category',
                    fieldName: 'Category',
                    component: 'FieldSelect',
                    data: null,
                },
                {
                    key: 'info.rating',
                    fieldName: 'Rating',
                    component: 'FieldInputText',
                    validations: [
                        {
                            type: 'number',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'info.price',
                    fieldName: 'Price',
                    component: 'FieldInputText',
                    validations: [
                        {
                            type: 'number',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'info.features',
                    fieldName: 'Features',
                    component: 'FieldInputText',
                    data: null,
                },
                {
                    key: 'info.location',
                    fieldName: 'Location',
                    data: null,
                },
                {
                    key: 'info.dateStart',
                    fieldName: 'Start Date',
                    component: 'FieldInputText',
                    data: null,
                },
                {
                    key: 'info.dateEnd',
                    fieldName: 'Date End',
                    component: 'FieldInputText',
                    data: null,
                },
            ]
        },
        formEx: {
            fields: [
                {
                    key: 'activity',
                    fieldName: 'Register for Activity',
                    component: 'FieldSelect',
                    options: [
                        {
                            key: 'skydiving',
                            value: 'Skydiving'
                        },
                        {
                            key: 'rafting',
                            value: 'Rafting'
                        },
                    ],
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'firstName',
                    fieldName: 'First',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'lastName',
                    fieldName: 'Last',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'gender',
                    fieldName: 'Gender',
                    component: 'FieldSelect',
                    options: [
                        {
                            key: 'male',
                            value: 'Male'
                        },
                        {
                            key: 'female',
                            value: 'Female'
                        },
                    ],
                    isRequired: true,
                    data: null,
                },
                {
                    key: 'date',
                    fieldName: 'Date',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                            errorMessage: 'blah'
                        }
                    ],
                    data: null,
                },
                {
                    key: 'couponCode',
                    fieldName: 'Coupon Code',
                    component: 'FieldInputText',
                    validations: [
                        {
                            type: 'alphaNumeric',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'creditCard',
                    fieldName: 'Credit Card',
                    component: 'FieldSelect',
                    options: [
                        {
                            key: 'visa',
                            value: 'VISA'
                        },
                        {
                            key: 'mastercard',
                            value: 'MASTERCARD'
                        },
                    ],
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'creditCardNumber',
                    fieldName: 'Number',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'number',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'cvv',
                    fieldName: 'CVV',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                            errorMessage: 'blah'
                        }
                    ],
                    data: null,
                },
                {
                    key: 'expirationDate',
                    fieldName: 'Expiration Date',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alpha',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'address',
                    fieldName: 'Address',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'alphaNumeric',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'phone',
                    fieldName: 'Phone',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'phone',
                        }
                    ],
                    data: null,
                },
                {
                    key: 'email',
                    fieldName: 'Email',
                    component: 'FieldInputText',
                    isRequired: true,
                    validations: [
                        {
                            type: 'email',
                        }
                    ],
                    data: null,
                },
            ]
        }
    },
    routes: [
        {
            text: 'Reference',
            route: '/reference',
            status: 'done',
            category: 'none',
            icon: 'blah',
        },
        {
            text: 'Basic Elements, Typography',
            route: '/reference/typography',
            category: 'ui',
            icon: 'blah',
        },
        {
            text: 'Variables, Colors and Sizes',
            route: '/reference/colors',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Layouts',
            route: '/reference/layouts',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Devices, Media Queries, Grid',
            route: '/reference/devices',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Logo and Icons',
            route: '/reference/logoAndIcons',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Images',
            route: '/reference/images',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Audio / Video',
            route: '/reference/audioVideo',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Buttons',
            route: '/reference/buttons',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Links and Navigation',
            route: '/reference/links',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Selection',
            route: '/reference/selection',
            status: 'todo',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Inputs',
            route: '/reference/inputs',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Timely Actions and Information',
            route: '/reference/modals',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Tags, Badges, and Chips',
            route: '/reference/tagsAndBadges',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Panels, Notes, and Alerts',
            route: '/reference/panels',
            category: 'ui',
            icon: 'blah'
        },
        {
            text: 'Date Pickers',
            route: '/reference/datePickers',
            category: 'ui',
            subCategory: 'ui-third-party',
            icon: 'blah'
        },
        {
            text: 'Rich Text / Code Editor',
            route: '/reference/richTextAndCodeEditor',
            category: 'ui',
            subCategory: 'ui-third-party',
            icon: 'blah'
        },
        {
            text: 'Data Types / Formatting',
            route: '/reference/formatting',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'Form',
            route: '/reference/form',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'Dynamic Form',
            route: '/reference/formDynamic',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'List Details',
            route: '/reference/listDetails',
            category: 'data',
            icon: 'blah',
        },
        {
            text: 'Tables',
            route: '/reference/tables',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'Filtering',
            route: '/reference/filter',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'Subsets',
            route: '/reference/subsets',
            status: 'todo',
            category: 'data',
            icon: 'blah'
        },
        {
            text: 'Logging',
            route: '/reference/logging',
            status: 'todo',
            category: 'ops',
            icon: 'blah'
        },
        {
            text: 'Online Migrations',
            route: '/reference/onlineMigrations',
            status: 'todo',
            category: 'ops',
            icon: 'blah'
        },
        {
            text: 'Computer Vision: Images',
            route: '/reference/cvimages',
            category: 'ml',
        },
        {
            text: 'Computer Vision: Contours',
            route: '/reference/cvcontours',
            category: 'ml',
        },
        {
            text: 'Computer Vision: Videos',
            route: '/reference/cvvideos',
            category: 'ml',
        },
    ],
    lookupTables: {
        categories: [
            {
                name: 'UI',
                key: 'ui',
            },
            {
                name: 'Data',
                key: 'data',
            },
            {
                name: 'ML',
                key: 'ml',
            }
        ],
        itemCategories: [
            {
                key: 'cat1',
                name: 'Category 1',
            },
            {
                key: 'cat2',
                name: 'Category 2',
            },
            {
                key: 'cat3',
                name: 'Category 3',
            },
            {
                key: 'cat4',
                name: 'Category 4',
            },
            {
                key: 'cat5',
                name: 'Category 5',
            },
        ],
        itemFeatures: [
            {
                key: 'feat1',
                name: 'Feature 1',
            },
            {
                key: 'feat2',
                name: 'Feature 2',
            },
            {
                key: 'feat3',
                name: 'Feature 3',
            },
            {
                key: 'feat4',
                name: 'Feature 4',
            },
            {
                key: 'feat5',
                name: 'Feature 5',
            },
        ],
        filterSortOptions: [
            {
                key: 'name',
                name: 'Name'
            },
            {
                key: 'priceAsc',
                name: 'Price Ascending'
            },
            {
                key: 'priceDesc',
                name: 'Price Descending'
            },
            {
                key: 'rating',
                name: 'Rating'
            },
            {
                key: 'distance',
                name: 'Distance'
            }
        ],
        filterFeatureList: [
            {
                key: 'feat1',
                name: 'Feature 1',
            },
            {
                key: 'feat2',
                name: 'Feature 2',
            },
            {
                key: 'feat3',
                name: 'Feature 3',
            },
            {
                key: 'feat4',
                name: 'Feature 4',
            },
            {
                key: 'feat5',
                name: 'Feature 5',
            },
        ],
        itemFormTabs: [
            {
                key: 'basic',
                name: 'Item',
            },
            {
                key: 'details',
                name: 'Details',
            },
            {
                key: 'location',
                name: 'Location',
            },
            {
                key: 'image',
                name: 'Image',
            },
        ],
    }
};
