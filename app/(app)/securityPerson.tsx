import React from 'react';
import {
  YStack,
  XStack,
  Text,
  View,
  Avatar,
  ScrollView,
  Card,
  Separator,
  Button,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/slice/user.slice';
import Icon from '@/components/common/Icon';

interface ApartmentData {
  aptNumber: string;
  residentName: string;
  phoneNumber: string;
}

interface DeliveryAgent {
  name: string;
  title: string;
  aadhaar: string;
  mobile: string;
  avatar: string;
}

const SecurityPersonScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const apartments: ApartmentData[] = [
    {
      aptNumber: 'Apt 101',
      residentName: 'Roberta Candy',
      phoneNumber: '9856231451',
    },
    {
      aptNumber: 'Apt 102',
      residentName: "Dennis' Notebook",
      phoneNumber: '7869103427',
    },
    {
      aptNumber: 'Amt 103',
      residentName: 'Daniel Isiti',
      phoneNumber: '7869014325',
    },
    {
      aptNumber: 'Apt 104',
      residentName: 'Anita Prem',
      phoneNumber: '9013627804',
    },
    {
      aptNumber: 'Apt 105',
      residentName: 'Sunny Wellington',
      phoneNumber: '7865024536',
    },
    {
      aptNumber: 'Apt 106',
      residentName: 'Arjun Saitta',
      phoneNumber: '9001452643',
    },
  ];

  const deliveryAgent: DeliveryAgent = {
    name: 'Anil Kumar',
    title: 'Delivery Agent',
    aadhaar: '1234-5678-9012',
    mobile: '9998123405',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
      <View flex={1}>
        <ScrollView flex={1} backgroundColor="$background">
          {/* Header without back button */}
          <XStack 
            paddingHorizontal="$4" 
            paddingVertical="$3" 
            alignItems="center" 
            justifyContent="center"
            borderBottomWidth={1}
            borderBottomColor="#E5E5E5"
            backgroundColor="white"
          >
            <Text fontSize="$6" fontWeight="600" color="#1A1A1A">
              Delivery Agent
            </Text>
          </XStack>

          {/* Apartments List */}
          <YStack paddingHorizontal="$4" paddingTop="$4" space="$2">
            {apartments.map((apartment, index) => (
              <YStack key={index}>
                <Card
                  borderRadius="$0"
                  borderWidth={0}
                  shadowColor="transparent"
                  elevation={0}
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                >
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      fontSize="$4"
                      fontWeight="500"
                      color="$gray3"
                      fontFamily="$body"
                      minWidth="$6"
                    >
                      {apartment.aptNumber}
                    </Text>
                    <Text
                      fontSize="$4"
                      fontWeight="400"
                      color="$gray3"
                      fontFamily="$body"
                      flex={1}
                      textAlign="center"
                    >
                      {apartment.residentName}
                    </Text>
                    <Text
                      fontSize="$4"
                      fontWeight="400"
                      color="$gray3"
                      fontFamily="$body"
                    >
                      {apartment.phoneNumber}
                    </Text>
                  </XStack>
                </Card>
                {index < apartments.length - 1 && (
                  <Separator marginVertical="$2" />
                )}
              </YStack>
            ))}
          </YStack>

          {/* Delivery Agent Section */}
          <View marginTop="$6" marginHorizontal="$4" marginBottom="$4">
            <Card
              backgroundColor="$grey6"
              borderRadius="$3"
              padding="$4"
              borderWidth={1}
              borderColor="$grey1"
            >
              <XStack space="$4" alignItems="flex-start">
                {/* Avatar */}
                <Avatar circular size="$8">
                  <Avatar.Image
                    source={{
                      uri: deliveryAgent.avatar,
                    }}
                  />
                  <Avatar.Fallback backgroundColor="$orange">
                    <Text fontSize="$6" fontWeight="600" color="white">
                      AK
                    </Text>
                  </Avatar.Fallback>
                </Avatar>

                {/* Agent Details */}
                <YStack flex={1} space="$2">
                  <Text
                    fontSize="$5"
                    fontWeight="600"
                    color="$gray3"
                    fontFamily="$heading"
                  >
                    {deliveryAgent.name}
                  </Text>
                  <Text
                    fontSize="$3"
                    fontWeight="500"
                    color="$gray10"
                    fontFamily="$body"
                    marginBottom="$1"
                  >
                    {deliveryAgent.title}
                  </Text>
                  
                  <YStack space="$1">
                    <Text
                      fontSize="$3"
                      fontWeight="400"
                      color="$gray3"
                      fontFamily="$body"
                    >
                      Aadhaar: {deliveryAgent.aadhaar}
                    </Text>
                    <Text
                      fontSize="$3"
                      fontWeight="400"
                      color="$gray3"
                      fontFamily="$body"
                    >
                      Mobile: {deliveryAgent.mobile}
                    </Text>
                  </YStack>
                </YStack>
              </XStack>
            </Card>
          </View>

          {/* Bottom Spacing */}
          <View height={100} />
        </ScrollView>

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
      </View>
    </SafeAreaView>
  );
};

export default SecurityPersonScreen;