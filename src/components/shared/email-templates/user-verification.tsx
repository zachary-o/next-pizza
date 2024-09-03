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
        <a
          href={`https://next-pizza-snowy.vercel.app/api/auth/verify?code=${code}`}
        >
          Confirm account sign up.
        </a>
      </p>
    </div>
  );
};
