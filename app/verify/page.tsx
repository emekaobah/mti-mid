"use client";

import React, { Suspense } from "react";
import { VerifyPageContent } from "./verify-page-content";

const VerificationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verification
              </h1>
              <p className="text-gray-600">MTI Dashboard</p>
            </div>
            <div className="py-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Loading verification page...
                </h2>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
};

export default VerificationPage;
