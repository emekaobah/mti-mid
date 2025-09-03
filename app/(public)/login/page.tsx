"use client";

import React from "react";
import { LoginForm } from "@/components/login/login-form";

const LoginPage = () => {
  return (
    <div className="h-screen  bg-[#F9F7F1] flex flex-col items-center  p-4">
      {/* Header */}
      <div className="text-center mb-8 max-w-lg">
        <h1 className="font-bold text-2xl text-[#074318] mb-2">
          Welcome to Nigeria AFCFTA Trade Intelligence System.
        </h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
