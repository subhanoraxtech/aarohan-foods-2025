import React from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/common/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/theme";

export default function TermsAndConditionsScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#FAFAF9'} 
      />
      
      <Header title="Terms & Conditions" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          {/* Last Updated */}
          <View style={styles.section}>
            <Text style={styles.metadataText}>
              Last Updated: 18-Jul-2025
            </Text>
          </View>

          {/* Section 1: Introduction */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              1. Introduction and Definitions
            </Text>
            <Text style={styles.paragraph}>
              Welcome to Aarohan Foods, operating under the brand name Breakfast Bengaluru™. These Terms 
              and Conditions constitute a legally binding agreement between you and Aarohan Foods. By 
              accessing or using our services, you agree to comply with and be bound by these Terms.
            </Text>
            <Text style={styles.paragraph}>
              Our services consist of sourcing, preparing, procuring, and delivering food and beverages. 
              We operate from our own kitchen but may also procure freshly cooked food from locally 
              registered third-party service providers.
            </Text>
            
            <Text style={styles.subHeader}>
              Definitions:
            </Text>
            <View style={styles.list}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Subscribed Customer:</Text> A customer who orders food by 8:00 PM for 
                delivery the following day.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>On-Demand Orders:</Text> Orders placed through third-party aggregators 
                such as Zomato or Swiggy.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Services:</Text> The procurement, packaging and delivery of food and 
                beverages.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Delivery Areas:</Text> Currently restricted to Bangalore, India.
              </Text>
            </View>
          </View>

          {/* Section 2: Business and Services */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              2. Business and Services Offered
            </Text>
            
            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.1 Food Preparation and Procurement
              </Text>
              <Text style={styles.paragraph}>
                We provide vegetarian food and beverages, predominantly focused on Indian and multi-cuisine 
                dishes. Food may be prepared in our own kitchen or procured from carefully selected third-party 
                service providers.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.2 Service Categories
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Subscribed Orders:</Text> Must be placed by 8:00 PM for next-day 
                delivery between 6:00 AM and 9:00 AM.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>On-Demand Orders:</Text> Processed through third-party platforms 
                (Zomato, Swiggy) with delivery between 6:00 AM and 11:00 AM.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.3 Delivery Areas
              </Text>
              <Text style={styles.paragraph}>
                Currently, we operate exclusively within Bangalore, Karnataka, India, covering a wide range 
                of localities.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.4 Cuisine Types
              </Text>
              <Text style={styles.paragraph}>
                Our menu primarily offers vegetarian food. Meals may contain dairy, nuts, seeds and other 
                allergens. Customers must inquire about specific ingredients before ordering.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.5 Delivery Model
              </Text>
              <Text style={styles.paragraph}>
                Contactless delivery at your doorstep with mobile app notification. Mobile app notifications 
                are a value-add and not part of core service.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.6 Payment Methods
              </Text>
              <Text style={styles.paragraph}>
                We accept UPI payments only. Customers must have an active UPI application. We do not accept 
                card or cash payments.
              </Text>
            </View>
          </View>

          {/* Section 3: Subscription and Orders */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              3. Subscription and On-Demand Orders
            </Text>
            
            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                3.1 Subscription-Based Orders
              </Text>
              <Text style={styles.paragraph}>
                Orders must be placed before 8:00 PM the previous day. Orders after cutoff will not be 
                processed for next-day delivery.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                3.2 Order Modifications
              </Text>
              <Text style={styles.paragraph}>
                Modifications allowed until 8:00 PM of the previous day for subscribed orders. No changes 
                after confirmation.
              </Text>
            </View>
          </View>

          {/* Section 4: Payment Terms */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              4. Payment Terms
            </Text>
            
            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                4.1 Payment Methods
              </Text>
              <Text style={styles.paragraph}>
                We accept UPI (Unified Payments Interface) payments only. Customers must have configured 
                mobile applications such as Paytm, PhonePe, BHIM, or any RBI-approved UPI provider.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                4.2 Failed Payments
              </Text>
              <Text style={styles.paragraph}>
                Orders will not be processed until valid payment is received. We may cancel orders if 
                payment issues are not resolved timely.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                4.3 Refunds
              </Text>
              <Text style={styles.paragraph}>
                No refunds after delivery. For cancellations before 8:00 PM cutoff, full refunds processed 
                within 7-10 business days. Email brkfstbengaluru@gmail.com before 8:00 PM to cancel.
              </Text>
            </View>
          </View>

          {/* Section 5: Delivery Terms */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              5. Delivery Terms
            </Text>
            
            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                5.1 Delivery Times
              </Text>
              <Text style={styles.paragraph}>
                Subscribed customers: 6:00 AM to 9:00 AM. On-demand orders follow third-party platform schedules.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                5.2 Delivery Process
              </Text>
              <Text style={styles.paragraph}>
                Contactless delivery at doorstep. Customers must ensure delivery personnel can access premises 
                by informing building security in advance.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                5.2 Customer Responsibilities
              </Text>
              <Text style={styles.paragraph}>
                Ensure delivery access without delays. If access is denied, no refund will be provided. 
                Do not share personal details with delivery representatives.
              </Text>
            </View>
          </View>

          {/* Section 6: Customer Obligations */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              6. Customer Obligations
            </Text>
            
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Place orders via designated channels before cutoff time
              </Text>
              <Text style={styles.listItem}>
                • Inquire about allergens before consumption (food may contain dairy, nuts, etc.)
              </Text>
              <Text style={styles.listItem}>
                • Consume food within one hour of delivery
              </Text>
              <Text style={styles.listItem}>
                • Verify identity of delivery personnel using business ID card with QR code
              </Text>
            </View>
          </View>

          {/* Section 7: Refund and Cancellation */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              7. Refund and Cancellation Policy
            </Text>
            <Text style={styles.paragraph}>
              Cancellations must be made before 8:00 PM the previous day. No refunds for cancellations 
              after this time. We may cancel deliveries due to weather, natural disasters, or unforeseen 
              circumstances, with notification and refund/credit issued.
            </Text>
          </View>

          {/* Section 8: Data Usage */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              8. Use of Customer Data
            </Text>
            <Text style={styles.paragraph}>
              By placing an order, you consent to collection and use of personal information for order 
              processing, customer support, and marketing. You may receive communications via WhatsApp, 
              email, SMS, or mobile app. You can opt out as per instructions provided.
            </Text>
          </View>

          {/* Section 9: Liabilities */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              9. Liabilities and Disclaimers
            </Text>
            <Text style={styles.paragraph}>
              We are not responsible for food safety issues from delayed consumption or allergic reactions 
              if ingredients weren't verified. Our liability is limited to the order amount. We reserve 
              the right to modify or discontinue services without notice.
            </Text>
          </View>

          {/* Section 10: Modifications */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              10. Modifications to Terms
            </Text>
            <Text style={styles.paragraph}>
              We reserve the right to modify these Terms at any time. Changes will be posted on our website, 
              and customers will be notified. Continued use constitutes acceptance of updated Terms.
            </Text>
          </View>

          {/* Section 11: Compliance */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              11. Compliance with Laws
            </Text>
            <Text style={styles.paragraph}>
              These Terms are governed by the laws of India. Any disputes shall be subject to the 
              jurisdiction of courts in Bangalore, Karnataka, India.
            </Text>
          </View>

          {/* Section 12: Intellectual Property */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              12. Intellectual Property Rights
            </Text>
            <Text style={styles.paragraph}>
              All content, trademarks, logos, and images belong exclusively to Aarohan Foods. Unauthorized 
              use is prohibited. We grant limited, non-exclusive license for personal, non-commercial use only.
            </Text>
          </View>

          {/* Section 13: Business Transfer */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              13. Transfer of Ownership or Business Sale
            </Text>
            <Text style={styles.paragraph}>
              In the event of a sale, merger, or acquisition, all assets including customer data will be 
              transferred to the new entity. The new entity will assume responsibility for data management. 
              You may request data deletion if you disagree with new terms.
            </Text>
          </View>

          {/* Section 14: Business Closure */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              14. Customer Data in Event of Business Closure
            </Text>
            <Text style={styles.paragraph}>
              If Aarohan Foods discontinues operations, customers will receive notice. Data may be transferred 
              to a successor entity or securely deleted. Customers may request data deletion from the new entity.
            </Text>
          </View>

          {/* Section 15: Post Transfer Liability */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              15. No Liability for Operational Changes Post Transfer
            </Text>
            <Text style={styles.paragraph}>
              Once transfer is finalized, Aarohan Foods will not bear responsibility for operational or policy 
              decisions made by the new entity. Any grievances must be directed to the new owner.
            </Text>
          </View>

          {/* Section 16: Customer Notification */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              16. Customer Notification and Rights
            </Text>
            <Text style={styles.paragraph}>
              Customers will be notified of business changes via email, website, or mobile app. You have the 
              right to data deletion, withdraw consent, and access data records during ownership changes.
            </Text>
          </View>

          {/* Section 17: Data Protection Compliance */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              17. Compliance with Data Protection Laws
            </Text>
            <Text style={styles.paragraph}>
              We comply with the Information Technology Act, 2000 and GDPR (if applicable). Adequate safeguards 
              will be implemented for data transfers. EU customers have the right to object to data transfer.
            </Text>
          </View>

          {/* Section 18: Force Majeure */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              18. Force Majeure
            </Text>
            <Text style={styles.paragraph}>
              We are not responsible for delays or failures due to natural disasters, strikes, government 
              actions, pandemics, technical failures, or other unforeseen events. No refunds for Force 
              Majeure delays.
            </Text>
          </View>

          {/* Section 19: Indemnification */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              19. Indemnification
            </Text>
            <Text style={styles.paragraph}>
              You agree to indemnify and hold Aarohan Foods harmless from any claims, damages, or expenses 
              arising from your use of our services, violation of these Terms, or infringement of third-party rights.
            </Text>
          </View>

          {/* Section 20: Termination */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              20. Termination
            </Text>
            <Text style={styles.paragraph}>
              We may terminate your access for breach of Terms. You may stop using our services anytime. 
              Upon termination, you will no longer be authorized to use our services.
            </Text>
          </View>

          {/* Section 21: Confidentiality */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              21. Confidentiality
            </Text>
            <Text style={styles.paragraph}>
              We take data protection seriously and store all customer data securely in accordance with 
              applicable data protection laws. Refer to our Privacy Policy for details.
            </Text>
          </View>

          {/* Section 22: Third-Party Links */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              22. Third-Party Links and Services
            </Text>
            <Text style={styles.paragraph}>
              Our services may contain links to third-party websites. We are not responsible for their content 
              or practices. Orders through third-party platforms are subject to their terms and conditions.
            </Text>
          </View>

          {/* Section 23: Waiver and Severability */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              23. Waiver and Severability
            </Text>
            <Text style={styles.paragraph}>
              Failure to enforce any right will not be considered a waiver. If any provision is found invalid, 
              the remaining provisions shall continue in full force and effect.
            </Text>
          </View>

          {/* Section 24: Entire Agreement */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              24. Entire Agreement
            </Text>
            <Text style={styles.paragraph}>
              These Terms, together with our Privacy Policy, constitute the entire agreement between Aarohan 
              Foods and the customer regarding use of our services.
            </Text>
          </View>

          {/* Contact Section */}
          <View style={styles.highlightSection}>
            <Text style={styles.highlightHeader}>
              25. Contact Information
            </Text>
            <Text style={styles.paragraph}>
              For questions or concerns about these Terms and Conditions, please contact us at:
            </Text>
            <Text style={styles.contactEmail}>
              brkfstbengaluru@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  subSection: {
    marginTop: 12,
  },
  metadataText: {
    fontSize: 12,
    color: theme.colors.gray10,
    fontWeight: "500",
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: 4,
  },
  h3: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.orange,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.black1,
    fontFamily: theme.typography.fontFamily.semibold,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.black1,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: "600",
    fontFamily: theme.typography.fontFamily.semibold,
  },
  list: {
    paddingLeft: 16,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 24,
    color: theme.colors.slate1,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.orange,
    fontFamily: theme.typography.fontFamily.medium,
  },
  highlightSection: {
    backgroundColor: theme.colors.grey8,
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  highlightHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.orange,
    fontFamily: theme.typography.fontFamily.semibold,
    marginBottom: 8,
  },
});
