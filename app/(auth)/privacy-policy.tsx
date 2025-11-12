import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { YStack, H2, H3, Paragraph, XStack, Text } from "tamagui";
import { useRouter } from "expo-router";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAF9" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />
      
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
          Privacy Policy
        </H2>
      </XStack> */}

<Header title="Privacy Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ backgroundColor: "#FAFAF9" }}
      >
        <YStack padding="$4" gap="$4" backgroundColor="$background">
          {/* Effective Date */}
          <YStack gap="$2">
            <Text fontSize="$3" color="$gray10" fontWeight="500">
              Effective Date: 18-July-2025
            </Text>
            <Text fontSize="$3" color="$gray10" fontWeight="500">
              Last Updated: 18-Jul-2025
            </Text>
          </YStack>

          {/* Introduction */}
          <YStack gap="$3">
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Aarohan Foods ("we," "our," or "us"), operating under the brand name BREAKFAST BENGALURU, 
              values your privacy and is committed to protecting your personal information. This Privacy 
              Policy describes how we collect, use, share, and protect your information when you use our 
              services, including our website, mobile applications, or third-party platforms like Zomato 
              and Swiggy.
            </Paragraph>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We adhere to the Information Technology Act, 2000, and the Information Technology (Reasonable 
              Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. 
              By accessing or using our services, you agree to the terms and practices described in this policy.
            </Paragraph>
          </YStack>

          {/* Section 1: Scope */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              1. Scope of the Policy
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              This Privacy Policy governs the collection, use, storage, sharing, and protection of personal 
              data obtained by Aarohan Foods. It applies to all individuals interacting with our services, 
              including customers, users, and visitors, regardless of how they engage with us.
            </Paragraph>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              The scope of this policy covers:
            </Paragraph>
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Placing orders for food and beverages
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Customer support interactions
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Website visits and subscription to marketing communications
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Using third-party services to place orders
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 2: Information We Collect */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              2. Information We Collect
            </H3>
            
            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.1 Personal Information
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We collect the following personal information:
              </Paragraph>
              <YStack gap="$2" paddingLeft="$4">
                <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                  • Full Name
                </Paragraph>
                <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                  • Contact Details (phone number and email)
                </Paragraph>
                <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                  • Delivery Address
                </Paragraph>
                <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                  • Payment Information (UPI details)
                </Paragraph>
                <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                  • Order History
                </Paragraph>
              </YStack>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.2 Sensitive Personal Data
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We may collect sensitive information including financial information, health data 
                (allergies, dietary restrictions), and OTPs for authentication. OTPs expire within 5 to 10 minutes.
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Text fontSize={16} fontWeight="600" color="$black1">
                2.3 Automatically Collected Information
              </Text>
              <Paragraph fontSize="$4" lineHeight={24} color="$black1">
                We automatically collect device information, IP address, browser type, and cookies 
                to enhance user experience.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 3: Purpose of Collection */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              3. Purpose of Collection
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We use your information to:
            </Paragraph>
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Provide and fulfill our services
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Process payments securely through UPI
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Improve our services and provide personalized recommendations
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Send marketing communications (with your consent)
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Comply with legal requirements
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 4: Cookies */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              4. Cookies and Tracking Technologies
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We use cookies to enhance your experience, track website performance, and deliver 
              personalized services. You can manage cookie preferences through your browser settings.
            </Paragraph>
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Essential Cookies: Required for website functionality
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Performance Cookies: Track website usage and analytics
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Functionality Cookies: Remember your preferences
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Advertising Cookies: Show relevant ads based on your behavior
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 5: Data Retention */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              5. Data Retention and Security
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We retain personal information only as long as necessary to fulfill the purposes outlined 
              in this policy or as required by law. We employ industry-standard security measures including 
              encryption, firewalls, and access controls to protect your data.
            </Paragraph>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              However, no method of transmission over the internet is 100% secure. In case of any data 
              breach, we will notify affected users promptly in accordance with applicable laws.
            </Paragraph>
          </YStack>

          {/* Section 6: Your Rights */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              6. Your Rights
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Under Indian data protection laws and GDPR, you have the following rights:
            </Paragraph>
            <YStack gap="$2" paddingLeft="$4">
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Right to Access your personal data
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Right to Correction (Rectification)
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Right to Withdraw Consent
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Right to Deletion (Right to be Forgotten)
              </Paragraph>
              <Paragraph fontSize="$4" lineHeight={24} color="$slate1">
                • Right to Object to Processing
              </Paragraph>
            </YStack>
          </YStack>

          {/* Section 7: Data Transfer */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              7. Data Transfer
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Your personal data is stored and processed on servers located in India. We may transfer 
              your data internationally with appropriate safeguards including Standard Contractual Clauses (SCCs).
            </Paragraph>
          </YStack>

          {/* Section 8: Children's Privacy */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              8. Children's Privacy
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              Our services are not intended for children under 18. We do not knowingly collect personal 
              information from minors without parental consent. If we become aware of such collection, 
              we will take immediate steps to delete the information.
            </Paragraph>
          </YStack>

          {/* Section 9: Changes to Policy */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              9. Changes to This Policy
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We may update this Privacy Policy from time to time. Any changes will be posted on our 
              website with an updated "Last Updated" date. We encourage you to review this policy periodically.
            </Paragraph>
          </YStack>

          {/* Section 10: Grievance Officer */}
          <YStack gap="$3">
            <H3 fontSize={20} fontWeight="700" color="$orange">
              10. Grievance Redressal
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              We have appointed a Grievance Officer to address any concerns regarding personal data handling.
            </Paragraph>
            <YStack gap="$1" paddingLeft="$4">
              <Text fontSize="$4" fontWeight="500" color="$orange">
                Email: brkfstbengalurur@gmail.com
              </Text>
              <Paragraph fontSize="$3" color="$slate1">
                The Grievance Officer will acknowledge your complaint within 48 hours.
              </Paragraph>
            </YStack>
          </YStack>

          {/* Contact Section */}
          <YStack gap="$3" backgroundColor="$grey8" padding="$4" borderRadius="$4">
            <H3 fontSize={18} fontWeight="600" color="$orange">
              11. Contact Us
            </H3>
            <Paragraph fontSize="$4" lineHeight={24} color="$black1">
              If you have any questions about this Privacy Policy, please contact us at:
            </Paragraph>
            <Text fontSize="$4" fontWeight="500" color="$orange">
              brkfstbengalurur@gmail.com
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
