export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath !== '/dashboard' && isAuthenticated()) {
        return navigateTo('/dashboard');
    } else if (to.fullPath === '/dashboard') {
        return navigateTo('/');
    } else {
        //
    }
});
