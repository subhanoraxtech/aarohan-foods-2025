import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import {  NOTIFICATION_TYPE } from '@/types/enums'
import { ListAllNotificationResponse } from './notification.response'



const API_PREFIX = 'notification'

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getAllNotifications: builder.query<ListAllNotificationResponse, void>({
      query: () => ({
        url: `${API_PREFIX}`,
        method: 'GET'
      }),
      transformResponse: (response: { data: any }) => response.data,
      
    }),
  }),
})

export const { useGetAllNotificationsQuery } = notificationApi