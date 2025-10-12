import React, { useEffect } from 'react';
import { YStack, Text, XStack, ScrollView, Card } from 'tamagui';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';
import { useGetStatsQuery } from '@/services/stats/stats.service';

export default function AmountPaid() {
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
        <Header title="Amount Paid" />
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
            <Icon type="material" name="hourglass-empty" size={48} color="#1B9E14" />
            <Text fontSize="$5" color="$gray10">Loading payment history...</Text>
          </YStack>
        </ScrollView>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="Amount Paid" />
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
      <Header title="Amount Paid" />
      <ScrollView flex={1}>
        <YStack space="$4" p="$4">
          
          {/* Hero Amount Paid Card */}
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
              <YStack space="$2" alignItems="center">
                <XStack space="$2" alignItems="center">
                  <Icon type="material" name="account-balance-wallet" size={28} color="#1B9E14" />
                  <Text fontSize="$5" fontWeight="600" color="$success1">
                    Total Paid Amount
                  </Text>
                </XStack>
                <Text fontSize="$10" fontWeight="900" color="$success1">
                  ₹{data?.amountPaid?.toLocaleString() || 0}
                </Text>
                {data?.paidCount > 0 && (
                  <Text fontSize="$3" color="$gray10" textAlign="center">
                    Across {data.paidCount} completed {data.paidCount === 1 ? 'order' : 'orders'}
                  </Text>
                )}
              </YStack>
            </Card.Header>
          </Card>

          {/* Paid Orders Count Card */}
          {data?.paidCount > 0 && (
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
                      <Icon type="material" name="check-circle" size={20} color="#1B9E14" />
                    </YStack>
                    <YStack>
                      <Text fontSize="$5" fontWeight="bold" color="$primary">
                        Completed Orders
                      </Text>
                      <Text fontSize="$3" color="$gray10">
                        Successfully paid
                      </Text>
                    </YStack>
                  </XStack>
                  <YStack alignItems="flex-end">
                    <Text fontSize="$7" fontWeight="bold" color="$success1">
                      {data?.paidCount || 0}
                    </Text>
                    <Text fontSize="$2" color="$gray10" textTransform="uppercase">
                      {data?.paidCount === 1 ? 'ORDER' : 'ORDERS'}
                    </Text>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          )}

          {data?.paidCount > 0 && data?.amountPaid > 0 && (
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
                        Paid amount
                      </Text>
                    </YStack>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color="$slate1">
                    ₹{Math.round(data.amountPaid / data.paidCount).toLocaleString()}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>
          )}

          {/* Payment Success Message */}
          {data?.amountPaid > 0 && (
            <Card
              elevate
              bordered
              backgroundColor="$grey9"
              borderColor="$success1"
              borderRadius="$4"
            >
              <Card.Header padded>
                <XStack space="$3" alignItems="center">
                  <Icon type="material" name="thumb-up" size={24} color="#1B9E14" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="600" color="$success1">
                      Great Job!
                    </Text>
                    <Text fontSize="$3" color="$gray10">
                      You've successfully completed payments. Keep up the good work!
                    </Text>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          )}

          {data?.amountPaid === 0 && data?.paidCount === 0 && (
            <Card 
              elevate 
              bordered 
              backgroundColor="$grey8" 
              borderColor="$grey7"
              borderRadius="$6"
              shadowColor="$grey2"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.1}
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
                    <Icon type="material" name="payment" size={32} color="#878787" />
                  </YStack>
                  <YStack alignItems="center" space="$1">
                    <Text fontSize="$6" fontWeight="bold" color="$gray10">
                      No Payment History
                    </Text>
                    <Text fontSize="$4" color="$gray10" textAlign="center">
                      No payments have been made yet
                    </Text>
                    <Text fontSize="$3" color="$grey2" textAlign="center">
                      Payment history will appear here once you make transactions
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