import { TWhyChooseUs } from "@/types";
import CustomerService from "./../assets/customer-service.png";
import Tools from "./../assets/tools.png";
import CarbonDelivery from "./../assets/carbon_delivery.png";

export const whyChooseUs: TWhyChooseUs[] = [
      {
            id: "1",
            title: "Excellent customer service",
            description: "We genuinely believe the key to success is serving our customers. Being there for you before and after the sale. See our feedback to get a feel for how much we GENUINELY care about our customers.",
            image: CustomerService,
      },
      {
            id: "2",
            title: "Tools you can trust",
            description: "We know the diagnostics industry can be a minefield, terms such as EOBD2, OBDII, CANBUS, UDS and with so many scanners to choose from it can be difficult to decide what to buy. We’ll talk you through the options and we’ll never up sell. We’ll advise what’s appropriate for you.",
            image: Tools,
      },
      {
            id: "3",
            title: "FREE next day delivery",
            description: "We know when you order a scanner for your car, you may need it fast! All of our scanners are dispatched via Royal Mail first class the next working day, providing you order before our cut off time of 12pm.",
            image: CarbonDelivery,
      },
]