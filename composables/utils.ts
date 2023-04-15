export const cognitoFetch = async (path, body) => {
    const config = useAppConfig();

    const { data, error } = await useFetch(config.api.url + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
        initialCache: false // Global definition causes cached response returns
    });

    return {
        data,
        error
    };
};

export const isAuthenticated = () => {
    const user = useUser();
    return (user && user.value && user.value.confirmed);
};

export const clearUser = () => {
    const user = useUser();
    user.value = {
        name: null,
        token: null,
        profile: null,
        email: null,
        confirmed: false
    };
};
