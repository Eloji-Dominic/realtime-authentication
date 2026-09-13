import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "react-email";

interface ResetEmailProps{
  userEmail:string,
  resetURL:string,
  username:string
}

const PasswordResetEmail = ({userEmail,resetURL,username}:ResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-2 shadow-lg max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Reset Your Password
              </Text>
              <Text className="text-[16px] text-gray-600 mt-2 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 leading-6 mb-4">
                Hello {username},
              </Text>
              <Text className="text-4 text-gray-700 leading-6 mb-6">
                Someone requested a password reset for your account associated with <strong>{userEmail}</strong> . If this was you, click the button below to reset your password. If you didn&apos;t make this request, you can safely ignore this email.
              </Text>
              
              {/* Reset Button */}
              <Section className="text-center mb-6">
                <Button
                  href={resetURL}
                  className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md text-[16px] no-underline box-border hover:bg-blue-700"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-5 mb-4">
                This link will expire in 24 hours for security reasons.
              </Text>
              
              <Text className="text-[14px] text-gray-600 leading-5">
                If the button doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all mt-2">
                {resetURL}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Security Notice */}
            <Section className="mb-6">
              <Text className="text-[14px] text-gray-600 leading-5 mb-3">
                <strong>Security tip:</strong> Never share your password with anyone. Our team will never ask for your password via email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-4 m-0">
                © 2026 Realtime authentication. All rights reserved.
              </Text>             
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;