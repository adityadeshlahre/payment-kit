import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface EmailTemplateProps {
  userEmail: string;
  url: string;
  fromName: string;
  fromMail: string;
}

export const VerifyEmailTemplate = ({
  fromMail,
  fromName,
  url,
  userEmail,
}: EmailTemplateProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "32px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
                marginTop: "0",
              }}
            >
              Welcome, {userEmail}!
            </Text>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "12px",
                marginTop: "0",
              }}
            >
              Verify Your Email Address
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "20px",
                marginTop: "0",
                lineHeight: "24px",
              }}
            >
              To complete your registration, please verify your email address by
              clicking the button below:
            </Text>
            <Section style={{ textAlign: "center", marginBottom: "24px" }}>
              <Button
                href={url}
                style={{
                  backgroundColor: "#059669",
                  color: "white",
                  padding: "12px 32px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Verify Email
              </Button>
            </Section>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
                marginTop: "0",
                lineHeight: "24px",
              }}
            >
              If you did not create an account with us, please ignore this
              email.
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
                marginTop: "0",
                lineHeight: "24px",
              }}
            >
              If the button above does not work, you can also verify your email
              by copying and pasting the following link into your browser:
            </Text>
            <Text
              style={{
                wordBreak: "break-all",
                fontSize: "14px",
                backgroundColor: "#f9fafb",
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #e5e7eb",
                lineHeight: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <a
                href={url}
                style={{ color: "#059669", textDecoration: "none" }}
              >
                {url}
              </a>
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginTop: "20px",
                lineHeight: "24px",
              }}
            >
              If you have any questions, feel free to contact us at{" "}
              <a
                href={`mailto:${fromMail}`}
                style={{ color: "#059669", textDecoration: "underline" }}
              >
                {fromMail}
              </a>
              .
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#374151", marginTop: "20px" }}
            >
              Thank you for joining us!
            </Text>
            <Text style={{ fontSize: "16px", color: "#374151" }}>
              Best regards,
            </Text>
            <Text style={{ fontSize: "16px", color: "#374151" }}>
              {fromName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const ResetPasswordTemplate = ({
  fromMail,
  fromName,
  url,
  userEmail,
}: EmailTemplateProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "32px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
                marginTop: "0",
              }}
            >
              Password Reset Request
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
                lineHeight: "24px",
              }}
            >
              Hi {userEmail}, we received a request to reset your password. If
              you did not make this request, please ignore this email.
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
              }}
            >
              To reset your password, please click the button below:
            </Text>
            <Section style={{ textAlign: "center", marginBottom: "24px" }}>
              <Button
                href={url}
                style={{
                  backgroundColor: "#059669",
                  color: "white",
                  padding: "12px 32px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Reset Password
              </Button>
            </Section>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
                lineHeight: "24px",
              }}
            >
              If the button above does not work, you can also verify your email
              by copying and pasting the following link into your browser:
            </Text>
            <Text
              style={{
                wordBreak: "break-all",
                fontSize: "14px",
                backgroundColor: "#f9fafb",
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #e5e7eb",
                lineHeight: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <a
                href={url}
                style={{ color: "#059669", textDecoration: "none" }}
              >
                {url}
              </a>
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginTop: "20px",
                lineHeight: "24px",
              }}
            >
              If you have any questions, feel free to contact us at{" "}
              <a
                href={`mailto:${fromMail}`}
                style={{ color: "#059669", textDecoration: "underline" }}
              >
                {fromMail}
              </a>
              .
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#374151", marginTop: "20px" }}
            >
              Thank you!
            </Text>
            <Text style={{ fontSize: "16px", color: "#374151" }}>
              Best regards,
            </Text>
            <Text style={{ fontSize: "16px", color: "#374151" }}>
              {fromName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const GenericEmailTemplate = ({
  fromMail,
  fromName,
  url,
  userEmail,
}: EmailTemplateProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "32px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
                marginTop: "0",
              }}
            >
              Hello, {userEmail}!
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "16px",
                lineHeight: "24px",
              }}
            >
              You have received this email from {fromName}.
            </Text>
            {url && (
              <>
                <Text
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    marginBottom: "16px",
                  }}
                >
                  Please click the button below to continue:
                </Text>
                <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                  <Button
                    href={url}
                    style={{
                      backgroundColor: "#059669",
                      color: "white",
                      padding: "12px 32px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}
                  >
                    Continue
                  </Button>
                </Section>
              </>
            )}
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginTop: "20px",
                lineHeight: "24px",
              }}
            >
              If you have any questions, feel free to contact us at{" "}
              <a
                href={`mailto:${fromMail}`}
                style={{ color: "#059669", textDecoration: "underline" }}
              >
                {fromMail}
              </a>
              .
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#374151", marginTop: "20px" }}
            >
              Best regards,
            </Text>
            <Text style={{ fontSize: "16px", color: "#374151" }}>
              {fromName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
