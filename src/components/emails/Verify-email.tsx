import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "react-email";

interface VerifyEmailProps {
  username: string;
  verifyURL: string;
}

const VerifyEmail = ({ username, verifyURL }: VerifyEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Welcome! Please verify your email address to get started
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg mx-auto p-10 max-w-150">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-4">
                Welcome to Realtime Authentication! 🎉
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We&apos;re excited to have you on board, {username}!
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 leading-4 m-0 mb-4">
                Welcome {username} Thank you for signing up! To ensure the
                security of your account and to get started with all our amazing
                features, we need you to verify your email address.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-6">
                <Button
                  href={verifyURL}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2 text-4 font-semibold no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-500 leading-5 m-0 mb-4">
                This verification link will expire in 24 hours for security
                reasons.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 m-0">
                If you didn&apos;t create an account with us, you can safely ignore
                this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6">
              <Text className="text-[14px] text-gray-500 leading-5 m-0 mb-2">
                Need help? Contact our support team at support@example.com
              </Text>
              <Text className="text-[12px] text-gray-400 leading-4 m-0">
                © {new Date().getFullYear()} Realtime Authentication. All rights
                reserved.
              </Text>
              <Text className="text-3 text-gray-400 leading-4 m-0">
                123 Business Street, Suite 100, City, State 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
