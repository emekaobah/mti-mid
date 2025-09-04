"use client";

import React from "react";
import { LoginForm } from "@/components/login/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F7F1] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 w-full max-w-2xl">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-[#074318] mb-2">
          Welcome to Nigeria AFCFTA Trade Intelligence System.
        </h1>
      </div>
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
