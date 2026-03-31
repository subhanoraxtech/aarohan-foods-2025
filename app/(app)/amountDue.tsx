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

export default function AmountDue() {
  const { data, isLoading, isError, refetch } = useStats();

  if (isLoading) {
    return (
      <View flex style={styles.container}>
        <Header title="Amount Due" />
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
        <Header title="Amount Due" />
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
      <Header title="Amount Due" />
      <ScrollView style={styles.scrollView}>
        <View p="lg" gap="lg">
          {/* Hero Amount Due Card */}
          <Card variant="elevated" style={[styles.card, styles.heroCard]}>
            <View center gap="sm">
              <View row gap="sm" align="center">
                <Icon type="material" name="account-balance-wallet" size={28} color={theme.colors.red1} />
                <Text variant="h3" weight="semibold" color="red1">
                  Total Outstanding
                </Text>
              </View>
              <Text variant="h1" weight="bold" color="red1" style={styles.amount}>
                ₹{data?.amountDue?.toLocaleString() || 0}
              </Text>
              {(data?.dueCount ?? 0) > 0 && (
                <Text variant="body-sm" color="gray10" align="center">
                  Across {data?.dueCount} pending {data?.dueCount === 1 ? 'order' : 'orders'}
                </Text>
              )}
            </View>
          </Card>

          {/* Pending Orders Count Card */}
          {(data?.dueCount ?? 0) > 0 && (
            <Card variant="elevated" style={styles.card}>
              <View row justify="space-between" align="center">
                <View row gap="md" align="center">
                  <View bg="grey5" p="md" radius="md" style={styles.iconContainer}>
                    <Icon type="material" name="pending-actions" size={20} color={theme.colors.orange} />
                  </View>
                  <View>
                    <Text variant="h3" weight="bold">
                      Pending Orders
                    </Text>
                    <Text variant="caption" color="gray10">
                      Awaiting payment
                    </Text>
                  </View>
                </View>
                <View align="flex-end">
                  <Text variant="h2" weight="bold" color="red1">
                    {data?.dueCount || 0}
                  </Text>
                  <Text variant="caption" color="gray10" style={styles.uppercase}>
                    {data?.dueCount === 1 ? 'ORDER' : 'ORDERS'}
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* Average Per Order Card */}
          {(data?.dueCount ?? 0) > 0 && (data?.amountDue ?? 0) > 0 && (
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
                      Outstanding amount
                    </Text>
                  </View>
                </View>
                <Text variant="h3" weight="bold" color="slate1">
                  ₹{Math.round((data?.amountDue ?? 0) / (data?.dueCount ?? 1)).toLocaleString()}
                </Text>
              </View>
            </Card>
          )}

          {/* Payment Reminder */}
          {(data?.amountDue ?? 0) > 0 && (
            <Card variant="elevated" style={[styles.card, styles.reminderCard]}>
              <View row gap="md" align="center">
                <Icon type="material" name="lightbulb" size={24} color={theme.colors.orange} />
                <View flex>
                  <Text variant="h3" weight="semibold" color="orange">
                    Payment Reminder
                  </Text>
                  <Text variant="body-sm" color="gray10">
                    Don&apos;t forget to clear your outstanding dues to maintain good supplier relationships
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* All Clear State */}
          {data?.amountDue === 0 && data?.dueCount === 0 && (
            <Card variant="elevated" style={[styles.card, styles.successCard]}>
              <View center gap="md">
                <View bg="grey6" p="lg" radius="lg" style={styles.emptyIconContainer}>
                  <Icon type="material" name="check-circle" size={32} color={theme.colors.success1} />
                </View>
                <View center gap="sm">
                  <Text variant="h2" weight="bold" color="success1">
                    All Clear! 🎉
                  </Text>
                  <Text variant="body" color="success0" align="center">
                    No outstanding dues
                  </Text>
                  <Text variant="caption" color="gray10" align="center">
                    All your payments are up to date
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
    backgroundColor: theme.colors.grey6,
    borderColor: theme.colors.red1,
    padding: theme.spacing.xl,
  },
  amount: {
    fontSize: 48,
    lineHeight: 56,
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
  reminderCard: {
    backgroundColor: theme.colors.grey9,
    borderColor: theme.colors.orange,
  },
  successCard: {
    backgroundColor: theme.colors.grey8,
    borderColor: theme.colors.success1,
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
