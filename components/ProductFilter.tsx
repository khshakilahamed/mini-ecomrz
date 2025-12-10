import { productFilteredItems } from "@/constants/product";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TProductFilteredProps = {
  filterValue: string;
  setFilterValue: (value: string) => void;
  className?: string;
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
};

const ProductFilter = ({
  filterValue,
  setFilterValue,
  className,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}: TProductFilteredProps) => {
  return (
    <div className={cn("flex justify-between gap-2", className)}>
      <div className="flex items-center gap-3 overflow-x-scroll hide-scrollbar">
        {productFilteredItems?.map((item) => (
          <Button
            key={item?.id}
            variant={filterValue === item?.value ? "destructive" : "link"}
            size={"sm"}
            className="text-white cursor-pointer"
            onClick={() => setFilterValue(item?.value)}
          >
            {item?.label}
          </Button>
        ))}
        <Button
          variant={"link"}
          className="cursor-pointer text-secondary-foreground no-underline"
        >
          See All Products<span className="text-xl">{">"}</span>{" "}
        </Button>
      </div>
      <div className="flex items-center gap-1 text-white">
        <Button
          disabled={!canPrev}
          className="bg-[#253146] hover:bg-[#253146]/65"
          onClick={onPrev}
          size={"sm"}
        >
          <ChevronLeft size={24}/>
        </Button>
        <Button
          disabled={!canNext}
          className="bg-[#253146] hover:bg-[#253146]/65"
          onClick={onNext}
          size={"sm"}
        >
          <ChevronRight size={24}/>
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
