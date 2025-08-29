import { MoveRight } from "lucide-react";
import useModalStore from "@/hooks/store/useModalStore";

interface CardProps {
  sector: string;
  date: number | string;
  request: number | string;
  onClick?: () => void;
}

const SectorCard: React.FC<CardProps> = ({
  sector,
  date,
  request,
  onClick,
}: CardProps) => {
  const { openModal } = useModalStore();

  return (
    <div
      className="rounded-2xl flex flex-col border-5 w-full cursor-pointer"
      style={{ border: "1px solid #fff" }}
      onClick={onClick}
    >
      <div className="bg-[#07431804] flex items-center justify-center p-4 rounded-t-2xl text-sm font-medium">
        {sector}
      </div>
      <div className="flex justify-between p-4 items-center">
        <div className="flex flex-col justify-between">
          <div className="flex text-[8px] items-center gap-2">
            <div className="bg-[#074318] rounded-full h-1 w-1"></div> {date}
          </div>
          <p className="text-[10px]">
            <span className="font-medium text-lg">{request}</span> Requests
          </p>
        </div>
        <div className="rounded-full p-3 bg-[#07431804]">
          <MoveRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default SectorCard;
