import React from "react";

interface Props {
  code: string;
}

export const UserVerificationEmailTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <p>
        Verification code: <b>{code}</b>
      </p>
      {/* TODO: CHANGE URL */}
      <p>
        <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
          Confirm account sign up.
        </a>
      </p>
    </div>
  );
};
