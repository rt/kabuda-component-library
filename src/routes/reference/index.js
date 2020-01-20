import React from 'react';
import ReferenceLayout from './ReferenceLayout';
import Buttons from './Buttons';
import Colors from './Colors';
import DatePickers from './DatePickers';
import Devices from './Devices';
import Filter from './Filter';
import Form from './Form';
import Formatting from './Formatting';
import FormDynamic from './FormDynamic';
import Images from './Images';
import AudioVideo from './AudioVideo';
import CVVideos from './CVVideos';
import CVImages from './CVImages';
import CVContours from './CVContours';
import Inputs from './Inputs';
import Layouts from './Layouts';
import Links from './Links';
import ListDetails from './ListDetails';
import LogoAndIcons from './LogoAndIcons';
import Modals from './Modals';
import Panels from './Panels';
import RichTextAndCodeEditor from './RichTextAndCodeEditor';
import Selection from './Selection';
import Subsets from './Subsets';
import Tables from './Tables';
import TagsAndBadges from './TagsAndBadges';
import Typography from './Typography';
import Reference from './Reference';
import { actions as homeActions, stores } from '../../libs/home';
import { forms, models, actions, stores as referenceStores } from '../../libs/reference';

const getStore = stores.dataStore.getStore;


export default {

    path: '/',

    children: [
        {
            path: '',
            async action(context) {
                await actions.reference.setReferenceRoute();
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Reference /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/buttons',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Buttons /></ReferenceLayout>,
                };
            },

        },
        {
            path: '/colors',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Colors /></ReferenceLayout>,
                };
            },

        },
        {
            path: '/datePickers',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><DatePickers /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/devices',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Devices /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/filter',
            async action(context) {
                const items = await actions.items.getItems();
                await actions.items.apiInitFilter(items, getStore().getUiData());
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Filter items={items} /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/form',
            async action(context) {
                const stateStore = referenceStores.stateStore.getStore();
                let form = stateStore.getFormEx();
                if (!form) {
                    const store = getStore();
                    form = stateStore.createFormEx(new models.FormEx(forms.formEx));
                }
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Form form={form} /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/formatting',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Formatting /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/formDynamic',
            async action(context) {
                const store = getStore();
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><FormDynamic config={forms.formEx} /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/images',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Images /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/audioVideo',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><AudioVideo /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/cvimages',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><CVImages /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/cvcontours',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><CVContours /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/cvvideos',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><CVVideos /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/inputs',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Inputs /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/layouts',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Layouts /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/links',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Links /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/listDetails',
            children: [
                {
                    async action(context) {
                        const items = await actions.items.getItems();
                        return {
                            title: getStore().getUiData().getRouteTitle(context.baseUrl), // just need baseUrl
                            component: <ReferenceLayout><ListDetails isListView items={items} /></ReferenceLayout>,
                        };
                    },
                },
                {
                    path: '/:item',
                    children: [
                        {
                            path: '',
                            async action(context, o) {
                                const items = await actions.items.getItems();
                                const isNew = o.item === 'create';
                                const currentItem = await actions.items.getCurrentItem(o.item);
                                if (!isNew) {
                                    await homeActions.routeSetup.addRecentlyViewedRoute(context.baseUrl, currentItem.itemName);
                                }
                                actions.items.ensureForm(o.item);
                                return {
                                    title: isNew ? 'Create Item' : currentItem.itemName,
                                    component: <ReferenceLayout><ListDetails items={items} currentItem={isNew ? 'create' : currentItem} /></ReferenceLayout>,
                                };
                            },
                        },
                        {
                            path: '/:state',
                            async action(context, o) {
                                const items = await actions.items.getItems();
                                const currentItem = await actions.items.getCurrentItem(o.item);
                                actions.items.ensureForm(o.item);

                                return {
                                    title: currentItem.itemName,
                                    component: <ReferenceLayout><ListDetails items={items} state={o.state} currentItem={currentItem} /></ReferenceLayout>,
                                };
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/logoAndIcons',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><LogoAndIcons /></ReferenceLayout>,
                };
            },

        },
        {
            path: '/modals',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Modals /></ReferenceLayout>,
                };
            },

        },
        {
            path: '/panels',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Panels /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/richTextAndCodeEditor',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><RichTextAndCodeEditor /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/selection',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Selection /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/subsets',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Subsets /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/tables',
            async action(context) {
                const items = await actions.items.getItems();
                await actions.items.apiInitFilter(items, getStore().getUiData());

                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Tables form={forms.formItem} items={items} /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/tagsAndBadges',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><TagsAndBadges /></ReferenceLayout>,
                };
            },
        },
        {
            path: '/typography',
            async action(context) {
                return {
                    title: getStore().getUiData().getRouteTitle(context.baseUrl + context.path),
                    component: <ReferenceLayout><Typography /></ReferenceLayout>,
                };
            },

        },
    ],

};
