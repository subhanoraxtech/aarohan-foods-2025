import {
  useGetAllNotificationsQuery,
} from "@/services/notifications/notification.service";

export function useNotificationList() {
  const { data, isLoading, isError, error, refetch } = useGetAllNotificationsQuery();

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useUnreadCount() {
  const { data, isLoading, isError } = useGetAllNotificationsQuery();

  return {
    data: data?.unreadCount ?? 0,
    isLoading,
    isError,
  };
}

// Mark as read not implemented in backend service
export function useMarkAsRead() {
  return {
    mutateAsync: async () => {
      console.warn("useMarkAsRead not implemented");
      return null;
    },
    isLoading: false,
  };
}

export function useMarkAllAsRead() {
  return {
    mutateAsync: async () => {
      console.warn("useMarkAllAsRead not implemented");
      return null;
    },
    isLoading: false,
  };
}
