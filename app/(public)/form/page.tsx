import MultistepFormWrapper from "@/components/multistep-form-wrapper";
import React from "react";

const DataCollectionPage = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Nigeria AfCFTA Market Intelligence Form
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help us understand your trade interests and requirements for
              enhanced Nigeria-Africa Continental Free Trade Area collaboration.
            </p>
          </div>
          <MultistepFormWrapper />
        </div>
      </div>
    </main>
  );
};

export default DataCollectionPage;
