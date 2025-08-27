import MultistepFormWrapper from "@/components/multistep-form-wrapper";
import React from "react";

const DataCollectionPage = () => {
  return (
    <main className="min-h-screen  flex flex-col bg-[#F9F7F1] lg:px-15 px-4">
      <div className="flex-1 flex flex-col justify-center py-8  ">
        <div className="w-full  mx-auto ">
          <div className="text-center mb-10 w-sm mx-auto ">
            <h1 className="text-3xl font-bold mb-2 text-[#074318] ">
              Nigeria AfCFTA <br /> Trade Intelligence Form
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help us understand what you need so Nigerian businesses can
              connect you win.
            </p>
          </div>
          <MultistepFormWrapper />
        </div>
      </div>
    </main>
  );
};

export default DataCollectionPage;
