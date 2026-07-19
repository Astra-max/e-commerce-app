  import {
  ShoppingCart,
  BadgePercent,
  Sparkles,
  Home,
  type LucideIcon,
} from "lucide-react";

interface NavigationType {
    name: string;
    path: string;
    Icon: LucideIcon
}
  
export const navItems: NavigationType[] = [
    {
      name: "Home",
      path: "/",
      Icon: Home,
    },
    {
      name: "Deals",
      path: "/Deals",
      Icon: BadgePercent,
    },
    {
      name: "4You",
      path: "/4You",
      Icon: Sparkles,
    },
    {
      name: "Cart",
      path: `/cart`,
      Icon: ShoppingCart,
    },
  ];