import Image from "next/image";
import SoldOutBadge from "./../assets/sold-out.png";
import NewBadge from "./../assets/new.png";
import SaleBadge from "./../assets/sale.png";
import { TProduct } from "@/types";

const ProductBadge = ({ product }: { product: TProduct }) => {
  const {
    isNew,
    isPopular,
    isSold,
  } = product || {};

  if (isSold) {
    return (
      <Image
        src={SoldOutBadge}
        alt="sold-out"
        width={100}
        height={24}
      />
    );
  }
  if (isNew) {
    return (
      <Image
        src={NewBadge}
        alt="sold-out"
        width={56}
        height={21}
      />
    );
  }
  if (isPopular) {
    return (
      <Image
        src={SaleBadge}
        alt="sold-out"
        width={56}
        height={21}
      />
    );
  }
  return "";
};

export default ProductBadge;
