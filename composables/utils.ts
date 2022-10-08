export const cognitoFetch = async (path, body) => {
    const config = useAppConfig();

    const { data } = await useFetch(config.api.url+path, {
        method: 'POST', 
        body,
        initialCache: false // Global definition causes cached response returns
    });

    return data.value;
}

