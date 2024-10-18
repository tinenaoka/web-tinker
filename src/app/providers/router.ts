import { routes } from './../../pages';
import {createRouter, createWebHashHistory, Router} from 'vue-router';

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
});