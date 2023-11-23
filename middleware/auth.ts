export default defineNuxtRouteMiddleware((to, from) => {
    console.log(JSON.stringify(to.fullPath));
    if (isAuthenticated()) {
        if (to.fullPath === '/login' || to.fullPath === '/register')
            return navigateTo('/dashboard');
    } else {
        if (to.fullPath === '/dashboard')
            return navigateTo('/');
    }
    // if (to.fullPath !== '/dashboard' && isAuthenticated()) {
    //     return navigateTo('/dashboard');
    // } else if (to.fullPath === '/dashboard' && !isAuthenticated()) {
    //     return navigateTo('/');
    // } else {
    //     //
    // }
});
