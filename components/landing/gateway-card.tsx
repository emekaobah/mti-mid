import React from "react";
import Image from "next/image";
interface GatewayCard {
  title: string;
  description: string;
  image: string;
  color: string;
}

const GatewayCard = ({ title, description, image }: GatewayCard) => {
  return (
    <div
      className={`rounded-xl flex flex-col items-center justify-center text-center bg-[#074318]/[0.03] gap-6 p-12 text-[#3A3A3A] `}
      //   style={{ backgroundColor: color }}
    >
      <p className="text-[22px] font-medium">{title}</p>

      <Image
        src={image}
        alt={title}
        width={121}
        height={121}
        className="rounded-lg"
      />
      <p className="w-72">{description}</p>
    </div>
  );
};

export default GatewayCard;
