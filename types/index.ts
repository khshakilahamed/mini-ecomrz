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