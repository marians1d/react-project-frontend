import * as fetcher from './fetcher';

const folderUrl = '/users';
export const login = (email, password) => fetcher.post(`${folderUrl}/login`, { email, password });

export const register = (username, email, password) => fetcher.post(`${folderUrl}/register`, { username, email, password });

export const logout = async () => fetcher.get(`${folderUrl}/logout`);

export const setImage = async (formData) => fetcher.put(`${folderUrl}/profile`, formData, true);
