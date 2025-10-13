

import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/enums";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function AppLayout() {
  const auth = useAuth();

  console.log("User Role in App Layout:", auth?.user?.role);

  useEffect(() => {
    console.log("Auth state changed:", auth);
  }, [auth]);


  if (!auth?.user && !auth?.accessToken) {
    return <Redirect href="/(auth)/login" />;
  }

  if (auth?.user?.role=== Role.SUPPLIER) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="supplier-pending-orders" />
        <Stack.Screen name="suppliers/[id]" />
        <Stack.Screen name="supplierOrderConfirmed" />


      </Stack>
    );
  }

  if (auth?.user?.role === Role.DELIVERY_AGENT) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="approval" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="bundles/[bundleDate]" /> 
        <Stack.Screen name="pending-deliveries/[id]" />
        <Stack.Screen name="pending-deliveries" />
      </Stack>
    );
  }

  if (auth?.user?.role === Role.SECURITY) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="deliveryAgent" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
