import {
  User,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";


type NavItem = {
  slug: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};


const cartCount: number | undefined = undefined;
const notificationCount: number | undefined = undefined;


export const sections: NavSection[] = [
    {
      title: "Shopping",
      items: [
        { slug: "orders", label: "My Orders", icon: Package },
        { slug: "wishlist", label: "Wishlist", icon: Heart },
        { slug: "cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
      ],
    },
    {
      title: "Account",
      items: [
        { slug: "account", label: "Account Overview", icon: User },
        { slug: "addresses", label: "Addresses", icon: MapPin },
        { slug: "payment-methods", label: "Payment Methods", icon: CreditCard },
        {
          slug: "notifications",
          label: "Notifications",
          icon: Bell,
          badge: notificationCount,
        },
        { slug: "settings", label: "Settings", icon: Settings },
      ],
    },
    {
      title: "Support",
      items: [{ slug: "help", label: "Help & Support", icon: HelpCircle }],
    },
  ];