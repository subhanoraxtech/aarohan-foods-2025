import React from "react";
import { YStack, XStack, Text, Button } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/common/Icon";
import { Role } from "@/types/enums";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slice/user.slice";
import Header from "@/components/common/Header";
import { useLogoutMutation } from "@/services/auth.service";
import { getExpoPushTokenSilently } from "@/utils/pushNotification";
import { useLoading } from "@/contexts/LoadingContext";

export default function HomeScreen() {
  const router = useRouter();
  const auth  = useAuth()


  if (auth?.user?.role === Role.SUPPLIER) {
    return <SupplierHomeScreen />;
  }
  if (auth?.user?.role === Role.DELIVERY_AGENT) {
    return <AgentHomeScreen />;
  }

  return null; 
}


function SupplierHomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      const expoToken = await getExpoPushTokenSilently();
      if (expoToken) {
        await logout({ expoToken: String(expoToken) }).unwrap();
      }
      dispatch(logoutUser());
      router.replace('/(auth)/login');
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack flex={1} padding="$5">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$8" fontWeight="bold">Supplier Dashboard</Text>
        <Button
        backgroundColor="transparent"
          borderColor="transparent"
          onPress={() => router.push("/(app)/notifications")}
        >
          <Icon type="feather" name="bell" size={24} color="#333" />
        </Button>
      </XStack>


      {/* Main Content */}
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
        <XStack gap="$4">         
          {/* Amount Paid */}         
          <YStack alignItems="center" gap="$2">           
            <Button             
              backgroundColor="#F5A623"             
              width={120}             
              height={120}             
              borderRadius="$4"             
              onPress={() => router.push("/(app)/amountPaid")}           
            >             
              <XStack alignItems="center" justifyContent="center">               
                <Icon type="material-community" name="currency-usd" size={50} color="white" />
                <Icon type="material" name="arrow-upward" size={28} color="white" style={{marginLeft: -8}} />             
              </XStack>           
            </Button>           
            <Text>Amount Paid</Text>         
          </YStack>          

          {/* Amount Due */}         
          <YStack alignItems="center" gap="$2">           
            <Button             
              backgroundColor="#E63946"             
              width={120}             
              height={120}             
              borderRadius="$4"             
              onPress={() => router.push("/(app)/amountDue")}           
            >             
              <YStack alignItems="center" justifyContent="center" flexDirection="row">               
                <Icon type="material-community" name="currency-usd" size={50} color="white" />
                <Icon type="material" name="arrow-downward" size={28} color="white"  style={{marginLeft: -8}} />             
              </YStack>           
            </Button>           
            <Text>Amount Due</Text>         
          </YStack>       
        </XStack>

        {/* Rest same */}
        <XStack gap="$4">
          <YStack alignItems="center" gap="$2">
            <Button
              backgroundColor="#0077B6"
              width={120}
              height={120}
              borderRadius="$4"
              onPress={() => router.push("/supplier/order-history")}
            >
              <Icon type="feather" name="list" size={40} color="white" />
            </Button>
            <Text>Order History</Text>
          </YStack>

          <YStack alignItems="center" gap="$2">
            <Button
              backgroundColor="#2ECC71"
              width={120}
              height={120}
              borderRadius="$4"
              onPress={() => router.push("/(app)/supplier-pending-orders")}
            >
              <Icon type="material-community" name="playlist-check" size={40} color="white" />
            </Button>
            <Text>Pending Orders</Text>
          </YStack>
        </XStack>

        <YStack alignItems="center" gap="$2">           
            <Button             
              backgroundColor="black"             
              width={120}             
              height={120}             
              borderRadius="$4"             
              onPress={() => router.push("/(app)/deliveryAgent")}           
            >             
              <XStack alignItems="center" justifyContent="center">               
                <Icon type="material-community" name="currency-usd" size={50} color="white" />
                <Icon type="material" name="arrow-upward" size={28} color="white" style={{marginLeft: -8}} />             
              </XStack>           
            </Button>           
            <Text>Delivery Agent</Text>         
          </YStack>  
      </YStack>

      {/* Logout Button - Bottom Rightx */}
      <Button
        position="absolute"
        bottom="$4"
        right="$4"
        backgroundColor="#FF4444"
        borderRadius={50}
        width={65}
        height={65}
        onPress={handleLogout}
        elevationAndroid={4}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
      >
        <Icon type="material" name="logout" size={24} color="white" />
      </Button>
    </YStack>
  );
}

// Agent Home Screen Component
function AgentHomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  
  const [logout] = useLogoutMutation();
  
  const handleLogout = async () => {
    try {
      setLoading(true, "Logging out...");
      const expoToken = await getExpoPushTokenSilently();

      console.log("expoToken",expoToken)
      if (expoToken) {
        await logout({ expoToken: String(expoToken) }).unwrap();
      }
      dispatch(logoutUser());
      router.replace('/(auth)/login');
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <YStack flex={1} padding="$5">
      {/* Header with Notification Bell */}
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$8" fontWeight="bold">Agent Dashboard</Text>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          onPress={() => router.push("/(app)/notifications")}
        >
          <Icon type="feather" name="bell" size={24} color="#333" />
        </Button>
      </XStack>

      {/* Main Content */}
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
        <XStack gap="$4">         
          {/* Amount Paid */}         
          <YStack alignItems="center" gap="$2">           
            <Button             
              backgroundColor="#F5A623"             
              width={120}             
              height={120}             
              borderRadius="$4"             
              onPress={() => router.push("/(app)/amountPaid")}           
            >             
              <XStack alignItems="center" justifyContent="center">               
                <Icon type="material-community" name="currency-usd" size={50} color="white" />
                <Icon type="material" name="arrow-upward" size={28} color="white" style={{marginLeft: -8}} />             
              </XStack>           
            </Button>           
            <Text>Amount Paid</Text>         
          </YStack>          

          {/* Amount Due */}         
          <YStack alignItems="center" gap="$2">           
            <Button             
              backgroundColor="#E63946"             
              width={120}             
              height={120}             
              borderRadius="$4"             
              onPress={() => router.push("/(app)/amountDue")}           
            >             
              <YStack alignItems="center" justifyContent="center" flexDirection="row">               
                <Icon type="material-community" name="currency-usd" size={50} color="white" />
                <Icon type="material" name="arrow-downward" size={28} color="white"  style={{marginLeft: -8}} />             
              </YStack>           
            </Button>           
            <Text>Amount Due</Text>         
          </YStack>       
        </XStack>

        {/* Rest same */}
        <XStack gap="$4">
          <YStack alignItems="center" gap="$2">
            <Button
              backgroundColor="#0077B6"
              width={120}
              height={120}
              borderRadius="$4"
              onPress={() => router.push("/(app)/deliveryHistory")}
            >
              <Icon type="feather" name="truck" size={40} color="white" />
            </Button>
            <Text>Delivery History</Text>
          </YStack>

          <YStack alignItems="center" gap="$2">
            <Button
              backgroundColor="#2ECC71"
              width={120}
              height={120}
              borderRadius="$4"
              onPress={() => router.push("/(app)/pending-deliveries/pending-deliveries")}
            >
              <Icon type="material-community" name="truck-check" size={40} color="white" />
            </Button>
            <Text>Pending Deliveries</Text>
          </YStack>
        </XStack>
        
      </YStack>
    
      {/* Logout Button - Bottom Right */}
      <Button
        position="absolute"
        bottom="$4"
        right="$4"
        backgroundColor="#FF4444"
        borderRadius={50}
        width={65}
        height={65}
        onPress={handleLogout}
        elevationAndroid={4}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
      >
        <Icon type="material" name="logout" size={24} color="white" />
      </Button>
    </YStack>
  );
}