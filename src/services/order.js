import * as fetcher from './fetcher';

const folderUrl = '/orders';

export const getAll = () => fetcher.get(folderUrl);

export const getOne = (orderId) => fetcher.get(`${folderUrl}/${orderId}`);

export const create = (orderData) => fetcher.post(folderUrl, orderData);

export const del = (orderId) => fetcher.del(`${folderUrl}/${orderId}`);