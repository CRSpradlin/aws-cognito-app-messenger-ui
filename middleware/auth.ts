const user = useUser();

export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (user && user.value && user.value.confirmed) {
        return navigateTo('/dashboard');
    }
});
