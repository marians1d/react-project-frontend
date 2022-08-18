import * as fetcher from './fetcher';

const folderUrl = '/comments';

export const create = (orderId, text) => fetcher.post(`${folderUrl}/${orderId}`, {text});