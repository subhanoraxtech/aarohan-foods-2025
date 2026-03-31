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

export default function PrivacyPolicyScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#FAFAF9'} 
      />
      
      <Header title="Privacy Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          {/* Effective Date */}
          <View style={styles.section}>
            <Text style={styles.metadataText}>
              Effective Date: 18-July-2025
            </Text>
            <Text style={styles.metadataText}>
              Last Updated: 18-Jul-2025
            </Text>
          </View>

          {/* Introduction */}
          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Aarohan Foods ("we," "our," or "us"), operating under the brand name BREAKFAST BENGALURU, 
              values your privacy and is committed to protecting your personal information. This Privacy 
              Policy describes how we collect, use, share, and protect your information when you use our 
              services, including our website, mobile applications, or third-party platforms like Zomato 
              and Swiggy.
            </Text>
            <Text style={styles.paragraph}>
              We adhere to the Information Technology Act, 2000, and the Information Technology (Reasonable 
              Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. 
              By accessing or using our services, you agree to the terms and practices described in this policy.
            </Text>
          </View>

          {/* Section 1: Scope */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              1. Scope of the Policy
            </Text>
            <Text style={styles.paragraph}>
              This Privacy Policy governs the collection, use, storage, sharing, and protection of personal 
              data obtained by Aarohan Foods. It applies to all individuals interacting with our services, 
              including customers, users, and visitors, regardless of how they engage with us.
            </Text>
            <Text style={styles.paragraph}>
              The scope of this policy covers:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Placing orders for food and beverages
              </Text>
              <Text style={styles.listItem}>
                • Customer support interactions
              </Text>
              <Text style={styles.listItem}>
                • Website visits and subscription to marketing communications
              </Text>
              <Text style={styles.listItem}>
                • Using third-party services to place orders
              </Text>
            </View>
          </View>

          {/* Section 2: Information We Collect */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              2. Information We Collect
            </Text>
            
            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.1 Personal Information
              </Text>
              <Text style={styles.paragraph}>
                We collect the following personal information:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>
                  • Full Name
                </Text>
                <Text style={styles.listItem}>
                  • Contact Details (phone number and email)
                </Text>
                <Text style={styles.listItem}>
                  • Delivery Address
                </Text>
                <Text style={styles.listItem}>
                  • Payment Information (UPI details)
                </Text>
                <Text style={styles.listItem}>
                  • Order History
                </Text>
              </View>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.2 Sensitive Personal Data
              </Text>
              <Text style={styles.paragraph}>
                We may collect sensitive information including financial information, health data 
                (allergies, dietary restrictions), and OTPs for authentication. OTPs expire within 5 to 10 minutes.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subHeader}>
                2.3 Automatically Collected Information
              </Text>
              <Text style={styles.paragraph}>
                We automatically collect device information, IP address, browser type, and cookies 
                to enhance user experience.
              </Text>
            </View>
          </View>

          {/* Section 3: Purpose of Collection */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              3. Purpose of Collection
            </Text>
            <Text style={styles.paragraph}>
              We use your information to:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Provide and fulfill our services
              </Text>
              <Text style={styles.listItem}>
                • Process payments securely through UPI
              </Text>
              <Text style={styles.listItem}>
                • Improve our services and provide personalized recommendations
              </Text>
              <Text style={styles.listItem}>
                • Send marketing communications (with your consent)
              </Text>
              <Text style={styles.listItem}>
                • Comply with legal requirements
              </Text>
            </View>
          </View>

          {/* Section 4: Cookies */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              4. Cookies and Tracking Technologies
            </Text>
            <Text style={styles.paragraph}>
              We use cookies to enhance your experience, track website performance, and deliver 
              personalized services. You can manage cookie preferences through your browser settings.
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Essential Cookies: Required for website functionality
              </Text>
              <Text style={styles.listItem}>
                • Performance Cookies: Track website usage and analytics
              </Text>
              <Text style={styles.listItem}>
                • Functionality Cookies: Remember your preferences
              </Text>
              <Text style={styles.listItem}>
                • Advertising Cookies: Show relevant ads based on your behavior
              </Text>
            </View>
          </View>

          {/* Section 5: Data Retention */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              5. Data Retention and Security
            </Text>
            <Text style={styles.paragraph}>
              We retain personal information only as long as necessary to fulfill the purposes outlined 
              in this policy or as required by law. We employ industry-standard security measures including 
              encryption, firewalls, and access controls to protect your data.
            </Text>
            <Text style={styles.paragraph}>
              However, no method of transmission over the internet is 100% secure. In case of any data 
              breach, we will notify affected users promptly in accordance with applicable laws.
            </Text>
          </View>

          {/* Section 6: Your Rights */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              6. Your Rights
            </Text>
            <Text style={styles.paragraph}>
              Under Indian data protection laws and GDPR, you have the following rights:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Right to Access your personal data
              </Text>
              <Text style={styles.listItem}>
                • Right to Correction (Rectification)
              </Text>
              <Text style={styles.listItem}>
                • Right to Withdraw Consent
              </Text>
              <Text style={styles.listItem}>
                • Right to Deletion (Right to be Forgotten)
              </Text>
              <Text style={styles.listItem}>
                • Right to Object to Processing
              </Text>
            </View>
          </View>

          {/* Section 7: Data Transfer */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              7. Data Transfer
            </Text>
            <Text style={styles.paragraph}>
              Your personal data is stored and processed on servers located in India. We may transfer 
              your data internationally with appropriate safeguards including Standard Contractual Clauses (SCCs).
            </Text>
          </View>

          {/* Section 8: Children's Privacy */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              8. Children's Privacy
            </Text>
            <Text style={styles.paragraph}>
              Our services are not intended for children under 18. We do not knowingly collect personal 
              information from minors without parental consent. If we become aware of such collection, 
              we will take immediate steps to delete the information.
            </Text>
          </View>

          {/* Section 9: Changes to Policy */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              9. Changes to This Policy
            </Text>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. Any changes will be posted on our 
              website with an updated "Last Updated" date. We encourage you to review this policy periodically.
            </Text>
          </View>

          {/* Section 10: Grievance Officer */}
          <View style={styles.section}>
            <Text style={styles.h3}>
              10. Grievance Redressal
            </Text>
            <Text style={styles.paragraph}>
              We have appointed a Grievance Officer to address any concerns regarding personal data handling.
            </Text>
            <View style={styles.contactPoint}>
              <Text style={styles.contactEmail}>
                Email: brkfstbengalurur@gmail.com
              </Text>
              <Text style={styles.contactHelper}>
                The Grievance Officer will acknowledge your complaint within 48 hours.
              </Text>
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.highlightSection}>
            <Text style={styles.highlightHeader}>
              11. Contact Us
            </Text>
            <Text style={styles.paragraph}>
              If you have any questions about this Privacy Policy, please contact us at:
            </Text>
            <Text style={styles.contactEmail}>
              brkfstbengalurur@gmail.com
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
  contactPoint: {
    marginTop: 8,
    paddingLeft: 16,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.orange,
    fontFamily: theme.typography.fontFamily.medium,
  },
  contactHelper: {
    fontSize: 12,
    color: theme.colors.slate1,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 4,
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
