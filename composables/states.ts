export type User = {
    apitoken: string,
    sockettoken: string,
    name: string,
    email: string,
    profile: string,
    confirmed: boolean
}

export const useUser = () => {
    return useCookie<User>('user');
};