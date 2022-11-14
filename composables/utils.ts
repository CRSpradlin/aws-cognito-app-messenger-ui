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
