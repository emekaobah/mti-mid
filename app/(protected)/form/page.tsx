import MultistepFormWrapper from "@/components/form/multistep-form-wrapper";
import React, { Suspense } from "react";
import { RouteGuard } from "@/components/route-guard";

const DataCollectionPage = () => {
  return (
    <RouteGuard>
      <main className="min-h-screen  flex flex-col bg-[#F9F7F1] lg:px-15 px-4 mx-auto">
        <div className="flex-1 flex flex-col justify-center py-8  ">
          <div className="w-full  mx-auto ">
            <div className="text-center mb-10 w-sm mx-auto flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-2 text-[#074318] ">
                Nigeria AfCFTA Trade Intelligence Form
              </h1>
              <p className="text-muted-foreground max-w-2xl ">
                Help us understand what you need so Nigerian businesses can
                connect you win.
              </p>
            </div>
            <Suspense fallback={<div>Loading form...</div>}>
              <MultistepFormWrapper />
            </Suspense>
          </div>
        </div>
      </main>
    </RouteGuard>
  );
};

export default DataCollectionPage;
