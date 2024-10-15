import { createApp } from 'vue';
import { router } from './providers';
import App from './index.vue';

const initializeApp = createApp(App).use(router);
export const app = initializeApp