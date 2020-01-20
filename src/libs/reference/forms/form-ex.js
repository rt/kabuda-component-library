export default {
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
};
