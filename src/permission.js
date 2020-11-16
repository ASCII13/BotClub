import router from './router';
import getPageTitle from '@/utils/get-page-title';
import { getCookie } from '@/utils/auth';

router.beforeEach(async(to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    
    const cookie = getCookie();
    if (cookie) {
        next();
    } else {
        if (to.name === 'Todo' || to.name === 'FavoriteList') {
            next('/login');
        } else {
            next();
        }
    }
})