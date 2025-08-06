import * as React from "react";

interface VerifyEmailTemplateProps {
  userEmail: string;
  url: string;
  fromName: string;
  fromMail: string;
}

export function VerifyEmailTemplate({
  fromMail,
  fromName,
  url,
  userEmail,
}: VerifyEmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {userEmail}!</h1>

      <h3>Verify Your Email Address</h3>

      <p>
        To complete your registration, please verify your email address by
        clicking the button below:
      </p>

      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = url)}
      >
        Verify Email
      </button>

      <p>If you did not create an account with us, please ignore this email.</p>

      <p>
        If the button above does not work, you can also verify your email by
        copying and pasting the following link into your browser:
      </p>
      <p>
        <a
          href={url}
          style={{
            color: "#4CAF50",
            fontSize: "16px",
            backgroundColor: "#f9fafb",
            padding: "15px",
            borderRadius: "5px",
            textDecoration: "none",
            boarder: "1px solid #e5e7eb",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
          }}
        >
          {url}
        </a>
      </p>

      <p>
        If you have any questions, feel free to contact us at{" "}
        <a href={`mailto:${fromMail}`}>{fromMail}</a>.
      </p>

      <p>Thank you for joining us!</p>

      <p>Best regards,</p>
      <p>{fromName}</p>
    </div>
  );
}

export function ResetPasswordTemplate({
  fromMail,
  fromName,
  url,
  userEmail,
}: VerifyEmailTemplateProps) {
  return (
    <div>
      <h1>Password Reset Request</h1>

      <p>
        Hi {userEmail}, we received a request to reset your password. If you did
        not make this request, please ignore this email.
      </p>

      <p>To reset your password, please click the button below:</p>

      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = url)}
      >
        Reset Password
      </button>

      <p>
        If the button above does not work, you can also verify your email by
        copying and pasting the following link into your browser:
      </p>
      <p>
        <a
          href={url}
          style={{
            color: "#4CAF50",
            fontSize: "16px",
            backgroundColor: "#f9fafb",
            padding: "15px",
            borderRadius: "5px",
            textDecoration: "none",
            boarder: "1px solid #e5e7eb",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
          }}
        >
          {url}
        </a>
      </p>

      <p>
        If you have any questions, feel free to contact us at{" "}
        <a href={`mailto:${fromMail}`}>{fromMail}</a>.
      </p>

      <p>Thank you!</p>

      <p>Best regards,</p>
      <p>{fromName}</p>
    </div>
  );
}
