export const cognitoFetch = async (path, body, authNeeded = false) => {
    const user = useUser();
    const config = useAppConfig();

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authNeeded ? user.value.token : null
        },
        body,
        initialCache: false // Global definition causes cached response returns
    };

    if (request.body === null) {
        delete request.body;
    }

    const { data, error } = await useFetch(config.api.url + path, request);

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
