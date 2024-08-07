import React, { useState, FormEvent } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
  code: string;
  setCode: (value: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const VerifyForm = ({
  handleVerify,
  code,
  setCode,
  isSubmitting,
  setIsSubmitting,
}: VerifyFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      setIsSubmitting(true);
      handleVerify(e);
    }
  };

  const handleChange = (value: string) => {
    setCode(value);
    if (value.length === 6) {
    }
  };

  return (
    <div className='flex justify-center mt-12 md:mt-20'>
      <div className='h-auto rounded-xl md:rounded-3xl w-80 md:w-96 bg-white shadow-lg'>
        <div className='p-6 md:p-8 flex flex-col gap-8'>
          <h1 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
            Verification Code
          </h1>
          <form onSubmit={handleSubmit}>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={handleChange}
              className='flex justify-center space-x-2 mb-4'
            >
              <InputOTPGroup>
                {Array.from({ length: 3 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className='w-12 h-12 border border-gray-300 rounded-md text-center text-lg'
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {Array.from({ length: 3 }).map((_, index) => (
                  <InputOTPSlot
                    key={index + 3}
                    index={index + 3}
                    className='w-12 h-12 border border-gray-300 rounded-md text-center text-lg'
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <button
              className={`w-full mt-12 py-2 text-white rounded-md transition duration-150 ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
