import React from 'react';

interface Props {
  className?: string;
}

export const SignUpForm: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}></div>
  );
};