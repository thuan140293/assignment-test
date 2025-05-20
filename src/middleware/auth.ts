import { type Router } from 'vue-router';
import { useCookie } from '@/composables/useCookie';
import { useAuthStore } from "@/stores/auth";
import { CookieKeys } from '@/core/enums/commons';

export function useAuthMiddleware(router: Router): void {
    const { getCookie } = useCookie();

    router.beforeEach((to, from, next) => {
        const isAuthenticated = getCookie(CookieKeys.IS_AUTHENTICATED);
        const authStore = useAuthStore();

        if (isAuthenticated) {
            if (to.path === '/login') {
                next('/');
            } else {
                next();
            }
        } else {
            if (to.path !== '/login') {
                authStore.logout();
                next('/login');
            } else {
                next();
            }
        }
    });
}
