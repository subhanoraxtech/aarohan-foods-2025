
import React, { useEffect } from 'react';
import { YStack, Text, XStack, ScrollView, Card, Separator } from 'tamagui';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';
import { useGetStatsQuery } from '@/services/stats/stats.service';

export default function AmountDue() {
  const { data, error, isLoading, isSuccess, isError } = useGetStatsQuery({
    payload: {
    
    }
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="Amount Due" />
        <ScrollView flex={1}>
          <YStack 
            space="$4" 
            p="$4" 
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: 300 
            }}
          >
            <Icon type="material" name="hourglass-empty" size={48} color="#FF5722" />
            <Text fontSize="$5" color="$gray10">Loading amount due...</Text>
          </YStack>
        </ScrollView>
      </YStack>
    );
  }

  // Show error state
  if (isError) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="Amount Due" />
        <ScrollView flex={1}>
          <YStack space="$4" p="$4">
            <Card 
              elevate 
              bordered 
              backgroundColor="$grey6" 
              borderColor="$red1"
              borderRadius="$4"
            >
              <Card.Header padded>
                <XStack space="$3" alignItems="center">
                  <Icon type="material" name="error" size={24} color="#E74C3C" />
                  <YStack flex={1}>
                    <Text fontSize="$5" color="$red1" fontWeight="bold">
                      Unable to load data
                    </Text>
                    <Text fontSize="$3" color="$gray10">
                      Please try again later
                    </Text>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          </YStack>
        </ScrollView>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="Amount Due" />
      <ScrollView flex={1}>
        <YStack space="$4" p="$4">
          
         
          <Card 
            elevate 
            bordered 
            backgroundColor="$grey6" 
            borderColor="$red1"
            borderRadius="$6"
            shadowColor="$red1"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.15}
            shadowRadius={8}
          >
            <Card.Header padded>
              <YStack space="$2" alignItems="center">
                <XStack space="$2" alignItems="center">
                  <Icon type="material" name="account-balance-wallet" size={28} color="#E74C3C" />
                  <Text fontSize="$5" fontWeight="600" color="$red1">
                    Total Outstanding
                  </Text>
                </XStack>
                <Text fontSize="$10" fontWeight="900" color="$red1">
                  ₹{data?.amountDue?.toLocaleString() || 0}
                </Text>
                {data?.dueCount > 0 && (
                  <Text fontSize="$3" color="$gray10" textAlign="center">
                    Across {data.dueCount} pending {data.dueCount === 1 ? 'order' : 'orders'}
                  </Text>
                )}
              </YStack>
            </Card.Header>
          </Card>

          {data?.dueCount > 0 && (
            <Card
              elevate
              bordered
              backgroundColor="$background"
              borderColor="$grey7"
              borderRadius="$4"
              animation="bouncy"
              scale={0.98}
              hoverStyle={{ scale: 1 }}
              pressStyle={{ scale: 0.96 }}
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack space="$3" alignItems="center">
                    <YStack 
                      backgroundColor="$grey5" 
                      padding="$2" 
                      borderRadius="$3"
                      alignItems="center"
                      justifyContent="center"
                      width={40}
                      height={40}
                    >
                      <Icon type="material" name="pending-actions" size={20} color="#FE8C00" />
                    </YStack>
                    <YStack>
                      <Text fontSize="$5" fontWeight="bold" color="$primary">
                        Pending Orders
                      </Text>
                      <Text fontSize="$3" color="$gray10">
                        Awaiting payment
                      </Text>
                    </YStack>
                  </XStack>
                  <YStack alignItems="flex-end">
                    <Text fontSize="$7" fontWeight="bold" color="$red1">
                      {data?.dueCount || 0}
                    </Text>
                    <Text fontSize="$2" color="$gray10" textTransform="uppercase">
                      {data?.dueCount === 1 ? 'ORDER' : 'ORDERS'}
                    </Text>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          )}

       
          {data?.dueCount > 0 && data?.amountDue > 0 && (
            <Card
              elevate
              bordered
              backgroundColor="$background"
              borderColor="$grey7"
              borderRadius="$4"
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack space="$3" alignItems="center">
                    <YStack 
                      backgroundColor="$grey5" 
                      padding="$2" 
                      borderRadius="$3"
                      alignItems="center"
                      justifyContent="center"
                      width={40}
                      height={40}
                    >
                      <Icon type="material" name="trending-up" size={20} color="#425466" />
                    </YStack>
                    <YStack>
                      <Text fontSize="$5" fontWeight="bold" color="$primary">
                        Average Per Order
                      </Text>
                      <Text fontSize="$3" color="$gray10">
                        Outstanding amount
                      </Text>
                    </YStack>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color="$slate1">
                    ₹{Math.round(data.amountDue / data.dueCount).toLocaleString()}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>
          )}

        
          {data?.amountDue > 0 && (
            <Card
              elevate
              bordered
              backgroundColor="$grey9"
              borderColor="$orange"
              borderRadius="$4"
            >
              <Card.Header padded>
                <XStack space="$3" alignItems="center">
                  <Icon type="material" name="lightbulb" size={24} color="#FE8C00" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="600" color="$orange">
                      Payment Reminder
                    </Text>
                    <Text fontSize="$3" color="$gray10">
                      Don't forget to clear your outstanding dues to maintain good supplier relationships
                    </Text>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          )}

         
          {data?.amountDue === 0 && data?.dueCount === 0 && (
            <Card 
              elevate 
              bordered 
              backgroundColor="$grey8" 
              borderColor="$success1"
              borderRadius="$6"
              shadowColor="$success1"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.15}
              shadowRadius={8}
            >
              <Card.Header padded>
                <YStack space="$3" alignItems="center">
                  <YStack 
                    backgroundColor="$grey6" 
                    padding="$3" 
                    borderRadius="$6"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon type="material" name="check-circle" size={32} color="#1B9E14" />
                  </YStack>
                  <YStack alignItems="center" space="$1">
                    <Text fontSize="$6" fontWeight="bold" color="$success1">
                      All Clear! 🎉
                    </Text>
                    <Text fontSize="$4" color="$success0" textAlign="center">
                      No outstanding dues
                    </Text>
                    <Text fontSize="$3" color="$gray10" textAlign="center">
                      All your payments are up to date
                    </Text>
                  </YStack>
                </YStack>
              </Card.Header>
            </Card>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}