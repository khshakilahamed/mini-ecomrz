import Image from "next/image";
import Van from "./../assets/delivery-van.png";
import PayLaterIcon from "./../assets/pay-later-icon.png";
import TickIcon from "./../assets/tick.png";
import { MdStarRate } from "react-icons/md";

const BannerHeadline = () => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center gap-2">
        <Image src={Van} alt="delivery van" />
        <span>Free Delivery</span>
      </div>
      <p>iCarsoft UK Authorized Dealer</p>
      <div className="flex items-center gap-2">
        <span className="flex">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <MdStarRate key={index} className="text-yellow-400" />
            ))}
        </span>
        <span>Rated Excellent</span>
      </div>
      <div className="flex items-center gap-2">
        <Image src={PayLaterIcon} alt="pay later"  width={20} height={20}/>
        <span>Buy Now, Pay Later</span>
      </div>
      <div className="flex items-center gap-2">
        <Image src={TickIcon} alt="tick icon" width={24} height={24}/>
        <span>Found it Cheaper?</span>
      </div>
    </div>
  );
};

export default BannerHeadline;
