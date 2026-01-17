import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PRODUCTS_URL } from '../../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/products',
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export default apiSlice;

