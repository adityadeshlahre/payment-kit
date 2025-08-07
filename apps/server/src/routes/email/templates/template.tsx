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
    <div>
      <h1>Welcome, {userEmail}!</h1>

      <h3>Verify Your Email Address</h3>

      <p>
        To complete your registration, please verify your email address by
        clicking the button below:
      </p>

      <a
        href={url}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Verify Email
      </a>

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
            border: "1px solid #e5e7eb",
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
};

export const ResetPasswordTemplate = ({
  fromMail,
  fromName,
  url,
  userEmail,
}: EmailTemplateProps) => {
  return (
    <div>
      <h1>Password Reset Request</h1>

      <p>
        Hi {userEmail}, we received a request to reset your password. If you did
        not make this request, please ignore this email.
      </p>

      <p>To reset your password, please click the button below:</p>

      <a
        href={url}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Reset Password
      </a>

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
            border: "1px solid #e5e7eb",
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
};

export const GenericEmailTemplate = ({
  fromMail,
  fromName,
  url,
  userEmail,
}: EmailTemplateProps) => {
  return (
    <div>
      <h1>Hello, {userEmail}!</h1>

      <p>You have received this email from {fromName}.</p>

      {url && (
        <>
          <p>Please click the button below to continue:</p>
          <a
            href={url}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Continue
          </a>
        </>
      )}

      <p>
        If you have any questions, feel free to contact us at{" "}
        <a href={`mailto:${fromMail}`}>{fromMail}</a>.
      </p>

      <p>Best regards,</p>
      <p>{fromName}</p>
    </div>
  );
};
