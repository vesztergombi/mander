import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'dir'}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
      getDir: builder.query ({
        query: (args) => ({
          url: '/',
          params: {...args}
        })
      })
    })
})

export const { useGetDirQuery } = apiSlice
