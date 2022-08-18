import * as fetcher from './fetcher';



const folderUrl = '/orders';

export const getAll = ({page, search} = {}) => {
    let url = folderUrl;
    
    if (page || search) {
        url += '?';
    }

    if (page) {
        url += `page=${page}`;
    }

    if (search) {
        url += page ? '&' : '';
        url += `search=${encodeURIComponent(search)}&criteria=title`;
    }

    return fetcher.get(url);
};

export const getOne = (orderId) => fetcher.get(`${folderUrl}/${orderId}`);

export const create = (orderData) => fetcher.post(folderUrl, orderData);

export const edit = (orderId, orderData) => fetcher.put(`${folderUrl}/${orderId}`, orderData);

export const addFile = (formData) => fetcher.post(folderUrl, formData, false);

export const del = (orderId) => fetcher.del(`${folderUrl}/${orderId}`);