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


export type TCartItem = TProduct & {
      quantity: number;
}

export type TCartWishlistContext = {
      cart: TCartItem[];
      wishlist: TProduct[];

      addToCart: (item: TProduct) => void;
      updateCartQuantity: (id: string | number, quantity: number) => void;
      decreaseCartQuantity: (id: string | number) => void;
      deleteFromCart: (id: string | number) => void;

      addToWishlist: (item: TProduct) => void;
      deleteFromWishlist: (id: string | number) => void;
      moveWishlistToCart: (id: string | number) => void;
}