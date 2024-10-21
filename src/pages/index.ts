import Routing from './index.vue';

export const routes = [
    {
        path: '/',
        component: () => import('./index-page'),
        name: 'Index',
    },
    {
        path: '/script-list',
        component: () => import('./script-list-page'),
        name: 'ScriptList',
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./not-found-page'),
        name: 'NotFound',
    },
];

export {Routing};