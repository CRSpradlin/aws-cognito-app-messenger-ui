import { useSocket } from "./states";

export const cognitoFetch = async (path, body, authNeeded = false) => {
    const user = useUser();
    const config = useAppConfig();

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authNeeded ? user.value.apitoken : null
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
    const socket = useSocket();
    const config = useAppConfig();

    const authCheck = (user && user.value && user.value.confirmed);

    if (authCheck) {
        if (socket.value == null) {
            socket.value = new WebSocket(config.socket.uri, user.value.sockettoken);
        }
            
    }

    return authCheck;
};

export const clearUser = () => {
    const user = useUser();
    const socket = useSocket();
    
    if (socket.value != null)
        socket.value.close();

    socket.value = null;

    user.value = {
        name: null,
        apitoken: null,
        sockettoken: null,
        profile: null,
        email: null,
        confirmed: false
    };
};
