import React from 'react';
import {
  YStack,
  XStack,
  Text,
  View,
  Avatar,
  ScrollView,
  Card,
  Separator, // Import Separator from Tamagui
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/common/Header';

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

const DeliveryAgentScreen = () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
      <ScrollView flex={1} backgroundColor="$background">
        {/* Header */}
        <Header title='Delivery Agent'/>

        {/* Apartments List */}
        <YStack paddingHorizontal="$4" paddingTop="$4" space="$2">
          {apartments.map((apartment, index) => (
            <YStack key={index}>
              <Card
                // backgroundColor="white"
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
              {/* Add Separator after each card except the last one */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryAgentScreen;