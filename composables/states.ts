export const useUser = () => {
    return useState('user', () => {
        return {
            token: '',
            name: '',
            profile: '',
            confirmed: false
        };
    });
};
