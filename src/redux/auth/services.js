import instance from '../../interceptors/axios';

export const loginService = async (email, password) =>
    await instance
        .post('/auths/login', { email, password })
        .then((res) => {
            return res.data;
        })
        .catch((e) => e.response?.data);

export const getUserService = async () =>
    await instance
        .get('/auths/user')
        .then((res) => {
            return res.data;
        })
        .catch((e) => e.response?.message);


