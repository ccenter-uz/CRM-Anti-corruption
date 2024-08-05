import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ru", "uz"];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
  });
