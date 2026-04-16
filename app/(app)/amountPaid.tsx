import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import { useStats } from "@/hooks/useStats";
import { theme } from "@/theme";
import { Skeleton } from "@/components/skeletons";

export default function AmountPaid() {
  const { data, isLoading, isError, refetch } = useStats();

  if (isLoading) {
    return (
      <View flex style={styles.container}>
        <Header title="Amount Paid" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.loadingContainer}>
            <Skeleton width="100%" height={200} borderRadius={theme.borderRadius.lg} />
            <Skeleton width="100%" height={100} borderRadius={theme.borderRadius.lg} />
            <Skeleton width="100%" height={100} borderRadius={theme.borderRadius.lg} />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (isError) {
    return (
      <View flex style={styles.container}>
        <Header title="Amount Paid" />
        <ScrollView style={styles.scrollView}>
          <View p="lg">
            <Card variant="outlined" style={[styles.card, styles.errorCard]}>
              <View row gap="md" align="center">
                <Icon type="material" name="error" size={24} color={theme.colors.red1} />
                <View flex>
                  <Text variant="h3" color="red1" weight="bold">
                    Unable to load data
                  </Text>
                  <Text variant="body-sm" color="gray10">
                    Please try again later
                  </Text>
                </View>
              </View>
              <Button variant="primary" onPress={() => refetch()} style={styles.retryButton}>
                Try Again
              </Button>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View flex style={styles.container}>
      <Header title="Amount Paid" />
      <ScrollView style={styles.scrollView}>
        <View p="lg" gap="lg">
          {/* Hero Amount Paid Card */}
          <Card variant="elevated" style={[styles.card, styles.heroCard]}>
            <View center gap="sm">
              <View row gap="sm" align="center">
                <Icon type="material" name="account-balance-wallet" size={28} color={theme.colors.success1} />
                <Text variant="h3" weight="semibold" color="success1">
                  Total Paid Amount
                </Text>
              </View>
              <Text variant="h1" weight="bold" color="success1" style={styles.amount}>
                ₹{data?.amountPaid?.toLocaleString() || 0}
              </Text>
              {(data?.paidCount ?? 0) > 0 && (
                <Text variant="body-sm" color="gray10" align="center">
                  Across {data?.paidCount} completed {data?.paidCount === 1 ? 'order' : 'orders'}
                </Text>
              )}
            </View>
          </Card>

          {/* Paid Orders Count Card */}
          {(data?.paidCount ?? 0) > 0 && (
            <Card variant="elevated" style={styles.card}>
              <View row justify="space-between" align="center">
                <View row gap="md" align="center">
                  <View bg="grey5" p="md" radius="md" style={styles.iconContainer}>
                    <Icon type="material" name="check-circle" size={20} color={theme.colors.success1} />
                  </View>
                  <View>
                    <Text variant="h3" weight="bold">
                      Completed Orders
                    </Text>
                    <Text variant="caption" color="gray10">
                      Successfully paid
                    </Text>
                  </View>
                </View>
                <View align="flex-end">
                  <Text variant="h2" weight="bold" color="success1">
                    {data?.paidCount || 0}
                  </Text>
                  <Text variant="caption" color="gray10" style={styles.uppercase}>
                    {data?.paidCount === 1 ? 'ORDER' : 'ORDERS'}
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* Average Per Order Card */}
          {(data?.paidCount ?? 0) > 0 && (data?.amountPaid ?? 0) > 0 && (
            <Card variant="elevated" style={styles.card}>
              <View row justify="space-between" align="center">
                <View row gap="md" align="center">
                  <View bg="grey5" p="md" radius="md" style={styles.iconContainer}>
                    <Icon type="material" name="trending-up" size={20} color={theme.colors.slate1} />
                  </View>
                  <View>
                    <Text variant="h3" weight="bold">
                      Average Per Order
                    </Text>
                    <Text variant="caption" color="gray10">
                      Paid amount
                    </Text>
                  </View>
                </View>
                <Text variant="h3" weight="bold" color="slate1">
                  ₹{Math.round((data?.amountPaid ?? 0) / (data?.paidCount ?? 1)).toLocaleString()}
                </Text>
              </View>
            </Card>
          )}

          {/* Payment Success Message */}
          {(data?.amountPaid ?? 0) > 0 && (
            <Card variant="elevated" style={[styles.card, styles.successMessageCard]}>
              <View row gap="md" align="center">
                <Icon type="material" name="thumb-up" size={24} color={theme.colors.success1} />
                <View flex>
                  <Text variant="h3" weight="semibold" color="success1">
                    Great Job!
                  </Text>
                  <Text variant="body-sm" color="gray10">
                    You&apos;ve successfully completed payments. Keep up the good work!
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* No Payment History State */}
          {data?.amountPaid === 0 && data?.paidCount === 0 && (
            <Card variant="elevated" style={[styles.card, styles.emptyCard]}>
              <View center gap="md">
                <View bg="grey6" p="lg" radius="lg" style={styles.emptyIconContainer}>
                  <Icon type="material" name="payment" size={32} color={theme.colors.gray10} />
                </View>
                <View center gap="sm">
                  <Text variant="h2" weight="bold" color="gray10">
                    No Payment History
                  </Text>
                  <Text variant="body" color="gray10" align="center">
                    No payments have been made yet
                  </Text>
                  <Text variant="caption" color="grey2" align="center">
                    Payment history will appear here once you make transactions
                  </Text>
                </View>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.lg,
  },
  errorCard: {
    borderColor: theme.colors.red1,
    gap: theme.spacing.md,
  },
  heroCard: {
    backgroundColor: theme.colors.grey8,
    borderColor: theme.colors.success1,
    padding: theme.spacing.xl,
  },
  amount: {
    fontSize: 28,
    lineHeight: 34,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  successMessageCard: {
    backgroundColor: theme.colors.grey9,
    borderColor: theme.colors.success1,
  },
  emptyCard: {
    backgroundColor: theme.colors.grey8,
    borderColor: theme.colors.grey7,
    padding: theme.spacing.xl,
  },
  emptyIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  retryButton: {
    marginTop: theme.spacing.md,
  },
});
