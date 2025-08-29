import React from "react";
import { RadialChart } from "../charts/radial-chart";
import { InsightsBarChart } from "../charts/bar-chart";

const Chart = () => {
  return (
    <div className=" bg-[#FCFCFC] rounded-4xl border-6 border-black p-10 min-h-[780px] flex flex-col  ">
      <h3 className="font-semibold ">Country Insights</h3>
      <div className="flex flex-col lg:flex-row  gap-4  min-h-[680px] mt-4">
        <div className="w-[60%]">
          <InsightsBarChart />
        </div>
        <div className="w-[40%]">
          <RadialChart />
        </div>
      </div>
    </div>
  );
};

export default Chart;
