import router from './router';
import { getCookie } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);

    const cookie = getCookie();
    if (cookie) {
        next();
    } else {
        if (to.meta.auth) {
            next({
                path: '/auth',
                query: {
                    path: to.fullPath
                }
            });
        } else {
            next();
        }
    }
})