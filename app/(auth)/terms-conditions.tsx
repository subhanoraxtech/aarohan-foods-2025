import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { YStack, H2, H3, Paragraph, XStack, Text } from "tamagui";
import Icon from "@/components/common/Icon";
import { useRouter } from "expo-router";
import Header from "@/components/common/Header";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TermsAndConditionsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAF9" }}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#FAFAF9'} 
      />
      
      {/* Header */}
      {/* <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="$grey7"
        backgroundColor="$background"
      >
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-left" size={24} color="#040404" />
        </TouchableOpacity>
        <H2 flex={1} textAlign="center" fontSize={18} fontWeight="600" marginRight="$8" color="$black1">
          Terms & Conditions
        </H2>
      </XStack> */}

<Header title="Terms & Conditions" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ backgroundColor: "#FAFAF9" }}
      >
        <YStack padding="$4" gap="$4" backgroundColor="$background">
          {/* Last Updated */}
          <YStack gap="$2">
            <Text fontSize="$3" color="$gray10" fontWeight="500">
              Last Updated: 18-Jul-2025
            </Text>
          </YStack>

          {/* Section 1: Introduction */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              1. Introduction and Definitions
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Welcome to Aarohan Foods, operating under the brand name Breakfast Bengaluru™. These Terms 
              and Conditions constitute a legally binding agreement between you and Aarohan Foods. By 
              accessing or using our services, you agree to comply with and be bound by these Terms.
            </Paragraph>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Our services consist of sourcing, preparing, procuring, and delivering food and beverages. 
              We operate from our own kitchen but may also procure freshly cooked food from locally 
              registered third-party service providers.
            </Paragraph>
            
            <Text fontSize={16} fontWeight="600" color="$black1" marginTop="$2">
              Definitions:
            </Text>
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">Subscribed Customer:</Text> A customer who orders food by 8:00 PM for 
                delivery the following day.
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">On-Demand Orders:</Text> Orders placed through third-party aggregators 
                such as Zomato or Swiggy.
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">Services:</Text> The procurement, packaging and delivery of food and 
                beverages.
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">Delivery Areas:</Text> Currently restricted to Bangalore, India.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 2: Business and Services */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              2. Business and Services Offered
            </H3>
            
            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.1 Food Preparation and Procurement
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We provide vegetarian food and beverages, predominantly focused on Indian and multi-cuisine 
                dishes. Food may be prepared in our own kitchen or procured from carefully selected third-party 
                service providers.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.2 Service Categories
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">Subscribed Orders:</Text> Must be placed by 8:00 PM for next-day 
                delivery between 6:00 AM and 9:00 AM.
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                <Text fontWeight="600">On-Demand Orders:</Text> Processed through third-party platforms 
                (Zomato, Swiggy) with delivery between 6:00 AM and 11:00 AM.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.3 Delivery Areas
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Currently, we operate exclusively within Bangalore, Karnataka, India, covering a wide range 
                of localities.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.4 Cuisine Types
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Our menu primarily offers vegetarian food. Meals may contain dairy, nuts, seeds and other 
                allergens. Customers must inquire about specific ingredients before ordering.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.5 Delivery Model
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Contactless delivery at your doorstep with mobile app notification. Mobile app notifications 
                are a value-add and not part of core service.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.6 Payment Methods
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We accept UPI payments only. Customers must have an active UPI application. We do not accept 
                card or cash payments.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 3: Subscription and Orders */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              3. Subscription and On-Demand Orders
            </H3>
            
            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                3.1 Subscription-Based Orders
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Orders must be placed before 8:00 PM the previous day. Orders after cutoff will not be 
                processed for next-day delivery.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                3.2 Order Modifications
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Modifications allowed until 8:00 PM of the previous day for subscribed orders. No changes 
                after confirmation.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 4: Payment Terms */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              4. Payment Terms
            </H3>
            
            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                4.1 Payment Methods
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We accept UPI (Unified Payments Interface) payments only. Customers must have configured 
                mobile applications such as Paytm, PhonePe, BHIM, or any RBI-approved UPI provider.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                4.2 Failed Payments
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Orders will not be processed until valid payment is received. We may cancel orders if 
                payment issues are not resolved timely.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                4.3 Refunds
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                No refunds after delivery. For cancellations before 8:00 PM cutoff, full refunds processed 
                within 7-10 business days. Email brkfstbengaluru@gmail.com before 8:00 PM to cancel.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 5: Delivery Terms */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              5. Delivery Terms
            </H3>
            
            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                5.1 Delivery Times
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Subscribed customers: 6:00 AM to 9:00 AM. On-demand orders follow third-party platform schedules.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                5.2 Delivery Process
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Contactless delivery at doorstep. Customers must ensure delivery personnel can access premises 
                by informing building security in advance.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                5.3 Customer Responsibilities
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                Ensure delivery access without delays. If access is denied, no refund will be provided. 
                Do not share personal details with delivery representatives.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 6: Customer Obligations */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              6. Customer Obligations
            </H3>
            
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Place orders via designated channels before cutoff time
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Inquire about allergens before consumption (food may contain dairy, nuts, etc.)
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Consume food within one hour of delivery
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Verify identity of delivery personnel using business ID card with QR code
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 7: Refund and Cancellation */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              7. Refund and Cancellation Policy
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Cancellations must be made before 8:00 PM the previous day. No refunds for cancellations 
              after this time. We may cancel deliveries due to weather, natural disasters, or unforeseen 
              circumstances, with notification and refund/credit issued.
            </Paragraph>
          </YStack>

          {/* Section 8: Data Usage */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              8. Use of Customer Data
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              By placing an order, you consent to collection and use of personal information for order 
              processing, customer support, and marketing. You may receive communications via WhatsApp, 
              email, SMS, or mobile app. You can opt out as per instructions provided.
            </Paragraph>
          </YStack>

          {/* Section 9: Liabilities */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              9. Liabilities and Disclaimers
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We are not responsible for food safety issues from delayed consumption or allergic reactions 
              if ingredients weren't verified. Our liability is limited to the order amount. We reserve 
              the right to modify or discontinue services without notice.
            </Paragraph>
          </YStack>

          {/* Section 10: Modifications */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              10. Modifications to Terms
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We reserve the right to modify these Terms at any time. Changes will be posted on our website, 
              and customers will be notified. Continued use constitutes acceptance of updated Terms.
            </Paragraph>
          </YStack>

          {/* Section 11: Compliance */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              11. Compliance with Laws
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              These Terms are governed by the laws of India. Any disputes shall be subject to the 
              jurisdiction of courts in Bangalore, Karnataka, India.
            </Paragraph>
          </YStack>

          {/* Section 12: Intellectual Property */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              12. Intellectual Property Rights
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              All content, trademarks, logos, and images belong exclusively to Aarohan Foods. Unauthorized 
              use is prohibited. We grant limited, non-exclusive license for personal, non-commercial use only.
            </Paragraph>
          </YStack>

          {/* Section 13: Business Transfer */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              13. Transfer of Ownership or Business Sale
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              In the event of a sale, merger, or acquisition, all assets including customer data will be 
              transferred to the new entity. The new entity will assume responsibility for data management. 
              You may request data deletion if you disagree with new terms.
            </Paragraph>
          </YStack>

          {/* Section 14: Business Closure */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              14. Customer Data in Event of Business Closure
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              If Aarohan Foods discontinues operations, customers will receive notice. Data may be transferred 
              to a successor entity or securely deleted. Customers may request data deletion from the new entity.
            </Paragraph>
          </YStack>

          {/* Section 15: Post Transfer Liability */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              15. No Liability for Operational Changes Post Transfer
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Once transfer is finalized, Aarohan Foods will not bear responsibility for operational or policy 
              decisions made by the new entity. Any grievances must be directed to the new owner.
            </Paragraph>
          </YStack>

          {/* Section 16: Customer Notification */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              16. Customer Notification and Rights
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Customers will be notified of business changes via email, website, or mobile app. You have the 
              right to data deletion, withdraw consent, and access data records during ownership changes.
            </Paragraph>
          </YStack>

          {/* Section 17: Data Protection Compliance */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              17. Compliance with Data Protection Laws
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We comply with the Information Technology Act, 2000 and GDPR (if applicable). Adequate safeguards 
              will be implemented for data transfers. EU customers have the right to object to data transfer.
            </Paragraph>
          </YStack>

          {/* Section 18: Force Majeure */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              18. Force Majeure
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We are not responsible for delays or failures due to natural disasters, strikes, government 
              actions, pandemics, technical failures, or other unforeseen events. No refunds for Force 
              Majeure delays.
            </Paragraph>
          </YStack>

          {/* Section 19: Indemnification */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              19. Indemnification
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              You agree to indemnify and hold Aarohan Foods harmless from any claims, damages, or expenses 
              arising from your use of our services, violation of these Terms, or infringement of third-party rights.
            </Paragraph>
          </YStack>

          {/* Section 20: Termination */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              20. Termination
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We may terminate your access for breach of Terms. You may stop using our services anytime. 
              Upon termination, you will no longer be authorized to use our services.
            </Paragraph>
          </YStack>

          {/* Section 21: Confidentiality */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              21. Confidentiality
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We take data protection seriously and store all customer data securely in accordance with 
              applicable data protection laws. Refer to our Privacy Policy for details.
            </Paragraph>
          </YStack>

          {/* Section 22: Third-Party Links */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              22. Third-Party Links and Services
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Our services may contain links to third-party websites. We are not responsible for their content 
              or practices. Orders through third-party platforms are subject to their terms and conditions.
            </Paragraph>
          </YStack>

          {/* Section 23: Waiver and Severability */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              23. Waiver and Severability
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Failure to enforce any right will not be considered a waiver. If any provision is found invalid, 
              the remaining provisions shall continue in full force and effect.
            </Paragraph>
          </YStack>

          {/* Section 24: Entire Agreement */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              24. Entire Agreement
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              These Terms, together with our Privacy Policy, constitute the entire agreement between Aarohan 
              Foods and the customer regarding use of our services.
            </Paragraph>
          </YStack>

          {/* Contact Section */}
          <YStack gap="$3" backgroundColor="$grey8" padding="$4" borderRadius="$4">
            <H3 fontSize={18} fontWeight="600" color="$orange">
              25. Contact Information
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              For questions or concerns about these Terms and Conditions, please contact us at:
            </Paragraph>
            <Text fontSize="$4" fontWeight="500" color="$orange">
              brkfstbengaluru@gmail.com
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
