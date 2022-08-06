import * as fetcher from './fetcher';

const folderUrl = '/orders';

export const getAll = () => fetcher.get(folderUrl);