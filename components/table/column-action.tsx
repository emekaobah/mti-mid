"use client";

import { MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type items = {
  label: string;
  action: () => void;
  className?: string;
} | null;

export type MenuItem = items | null;

interface ColumnActionProps {
  menuItems: MenuItem[];
  triggerClassName?: string;
  iconClassName?: string;
}

const ColumnAction = ({
  menuItems,
  triggerClassName = "h-8 w-8 p-0 border-none outline-none ring-0",
  iconClassName = "h-4 w-4",
}: ColumnActionProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className={triggerClassName}>
          <span className="sr-only">Open menu</span>
          <MoreVertical className={iconClassName} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-3 w-[250px]" align="end">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`p-1.5 flex gap-1.5 hover:bg-neutral-100 w-full ${
              item?.className || ""
            }`}
            onClick={item?.action}
          >
            {item?.label && (
              <p className="text-sm text-[#3A3A3A]">{item.label}</p>
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ColumnAction;
