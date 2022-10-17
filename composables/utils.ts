export const cognitoFetch = async (path, body) => {
    const config = useAppConfig();

    let responseValue;

    const { data } = await useFetch(config.api.url + path, {
        method: 'POST',
        body,
        initialCache: false, // Global definition causes cached response returns
        onResponse ({ response }) {
            // Process the response data
            responseValue = response;
            return response._data;
        }
    });

    return {
        dataValue: data.value,
        responseValue
    };
};
