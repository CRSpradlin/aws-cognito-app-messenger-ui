export type User = {
    token: string,
    name: string,
    email: string,
    profile: string,
    confirmed: boolean
}

export const useUser = () => {
    return useCookie<User>('user');
};
