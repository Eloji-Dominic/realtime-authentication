import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from 'react-email';

interface SendOTPEmailProps{  
  otpCode:string,
  username:string
}

const OTPEmail = ({otpCode,username}:SendOTPEmailProps) => {
 

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your verification code: {otpCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-lg max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-2">
                Verification Code
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Complete your two-factor authentication
              </Text>
            </Section>

            {/* Greeting */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 m-0 mb-4">
                Hello {username},
              </Text>
              <Text className="text-[16px] text-gray-700 m-0 leading-6">
                We received a request to verify your account. Please use the verification code below to complete your two-factor authentication.
              </Text>
            </Section>

            {/* OTP Code Section */}
            <Section className="text-center mb-8 bg-gray-50 rounded-lg p-8">
              <Text className="text-[14px] text-gray-600 m-0 mb-4 uppercase tracking-wide">
                Your Verification Code
              </Text>
              <Text className="text-[36px] font-bold text-gray-900 m-0 letter-spacing-[8px] font-mono bg-white border-2 border-solid border-gray-200 rounded-lg py-4 px-6 inline-block">
                {otpCode}
              </Text>
              <Text className="text-[14px] text-red-600 m-0 mt-4 font-medium">
                This code expires in 6 minutes
              </Text>
            </Section>

            {/* Instructions */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 m-0 mb-4 font-medium">
                Instructions:
              </Text>
              <Text className="text-[14px] text-gray-600 m-0 mb-2">
                • Enter this code in the verification field on your device
              </Text>
              <Text className="text-[14px] text-gray-600 m-0 mb-2">
                • Do not share this code with anyone
              </Text>
              <Text className="text-[14px] text-gray-600 m-0 mb-4">
                • If you didn&apos;t request this code, please ignore this email
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-blue-50 border-l-4 border-solid border-blue-500 p-4 mb-8">
              <Text className="text-[14px] text-blue-800 m-0 font-medium mb-2">
                Security Notice
              </Text>
              <Text className="text-[14px] text-blue-700 m-0 leading-5">
                For your security, never share this verification code with anyone. Our team will never ask you for this code via phone or email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6 mt-8">
              <Text className="text-[12px] text-gray-500 m-0 mb-2">
                Best regards,<br />
                Your Security Team
              </Text>
              <Text className="text-[12px] text-gray-400 m-0 mb-2">
                123 Security Street, Tech City, TC 12345
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                © {new Date().getFullYear()} Realtime Authentication. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};



export default OTPEmail;