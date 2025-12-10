export type TMenu = {
      id: string;
      label: string;
      href?: string | null | undefined;
}

export type TContactMenu = TMenu & {
      subMenus: TMenu[]
}