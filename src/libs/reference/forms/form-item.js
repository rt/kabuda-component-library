export default {
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
};
