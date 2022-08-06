import * as fetcher from './fetcher';

const folderUrl = '/users';
export const login = (email, password) => fetcher.post(`${folderUrl}/login`, { email, password });

export const register = (email, password) => fetcher.post(`${folderUrl}/register`, { email, password });

// export const logout = async (accessToken) => {
//     try {
//         const response = await fetch();
//     } catch (err) {
        
//     }
// }
