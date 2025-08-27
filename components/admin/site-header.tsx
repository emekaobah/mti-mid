import React from "react";
import Image from "next/image";
const SiteHeader = () => {
  return (
    <div className="px-4 lg:px-15 pt-8 bg-[#F9F7F1]">
      <div className=" ">
        <Image src="/mti-logo.svg" alt="logo" width={160} height={45} />
      </div>
    </div>
  );
};

export default SiteHeader;
