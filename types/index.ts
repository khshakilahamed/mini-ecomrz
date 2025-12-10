import { StaticImageData } from "next/image";

export type TMenu = {
      id: string;
      label: string;
      href?: string | null | undefined;
}

export type TContactMenu = TMenu & {
      subMenus: TMenu[]
}

export type TWhyChooseUs = {
      id: string;
      title: string;
      description: string;
      image: StaticImageData;
}

export type TFilteredProductItem = {
      id: string;
      label: string;
      value: string;
}

export type TProduct = {
  id: string
  title: string
  rating: number
  oldPrice: number
  newPrice: number
  isNew: boolean
  isPopular: boolean
  isSold: boolean
  image: string
  category?: string
  description?: string
}