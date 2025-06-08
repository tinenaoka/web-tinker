import Routing from './index.vue';
import {Routes} from '../../entities';

export const routes = [
    {
        path: '/',
        component: () => import('./index-page'),
        name: Routes.Index,
    },
    {
        path: '/script-list',
        component: () => import('./script-list-page'),
        name: Routes.ScriptList,
    },
    {
        path: '/bug-report',
        component: () => import('./bug-report-page'),
        name: Routes.BugReport,
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./not-found-page'),
        name: Routes.NotFound,
    },
] as const;

export {Routing};