import React from "react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="flex flex-wrap px-4 lg:px-15 pt-10 pb-8 bg-white">
      <div className="flex flex-col lg:flex-row w-full lg:gap-14 gap-6">
        {/* address */}
        <div className="text-[#074318] gap-4 text-sm flex flex-col max-w-[180px] text-wrap">
          <p className="font-semibold ">AFCFTA Trade Intelligence System</p>
          <p>
            Federal Ministry of Industry, Trade & InvestmentBlock H, Old
            Secretariat, Area 1, Garki, Abuja, Nigeria.
          </p>
        </div>

        {/* contact */}

        <div className="text-[#074318] gap-4 text-sm flex flex-col max-w-[180px] text-wrap">
          <p className="font-semibold ">Contact Us</p>
          <div className="flex flex-col gap-4">
            <p>+234 (0) 123-456-7890</p>
            <p>+234 (0) 987-654-3210</p>
            <p>info@fmiti.gov.ng</p>
          </div>
        </div>
      </div>
      <Separator className="mt-11 " />
      <p className="text-sm text-[#074318] mt-4">
        &copy; {new Date().getFullYear()} Ministry of Industry, Trade and
        Investment. AFCTA Trade Intelligence System.
      </p>
    </div>
  );
};

export default Footer;
