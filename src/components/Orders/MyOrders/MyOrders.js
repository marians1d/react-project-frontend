import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import styles from './MyOrders.module.css';

import { Search } from '../../Search/Search';
import { OrderList } from '../OrderList/OrderList';
import * as orderService from '../../../services/order';
import { addAll } from '../../../features/order/orderSlice';
import { onLoading, offLoading } from '../../../features/loading/loadingSlice';
import Pagination from '../../Pagination/Pagination';

export const MyOrders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('q'));

    const [totalCount, setTotalCount] = useState(0);
    const dispatch = useDispatch();

    const submitHandler = (value) => {
        dispatch(onLoading('orders'));

        orderService.getPersonal({ page, search })
            .then(result => {
                setSearch(value);
                setSearchParams({ search: value });

                dispatch(addAll(result.orders));

                setTotalCount(result.count);

                dispatch(offLoading('orders'));
            });
    };

    const suggestionsHandler = (value) => {
        console.log(value);
    };

    const pageHandler = (page) => {
        setSearchParams({ page: page });
        setPage(page);

        dispatch(onLoading('orders'));

        orderService.getPersonal({ page, search })
            .then(result => {
                dispatch(addAll(result.orders));

                dispatch(offLoading('orders'));

                setTotalCount(result.count);
            });
    };

    useEffect(() => {
        dispatch(onLoading('orders'));
            
        orderService.getPersonal({ page, search })
            .then(result => {
                dispatch(addAll(result.orders));
                dispatch(offLoading('orders'));

                setTotalCount(result.count);
            });
    }, [dispatch, page, search]);

    return (
        <div className="orders-page">
            <h2 className={styles.title}>Моите Поръчки</h2>

            <Search
                submitHandler={submitHandler}
                suggestionsHandler={suggestionsHandler}
            />
            <OrderList />
            <Pagination
                className='pagination'
                currentPage={page}
                totalCount={totalCount}
                pageSize={5}
                onPageChange={pageHandler}
            />
        </div>
    );
};