import router from './router';
import getPageTitle from '@/utils/get-page-title';
import { getCookie } from '@/utils/auth';

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    
    const authDir = ['Todos', 'FavoriteList', 'ShareList'];
    const cookie = getCookie();
    if (cookie) {
        next();
    } else {
        if (authDir.includes(to.name)) {
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