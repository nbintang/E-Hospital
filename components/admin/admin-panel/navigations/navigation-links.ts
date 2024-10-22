import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  MessageCircle,
  UsersIcon,
  Newspaper,
  Package,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/dashboard/articles",
          label: "Posts",
          icon: Newspaper,
        },
        {
          href: "/dashboard/questions",
          label: "Questions",
          icon: MessageCircle,
        },
      ],
    },
    {
      groupLabel: "Data",
      menus: [
        {
          href: "",
          label: "Users",
          icon: UsersIcon,
          submenus: [
            {
              href: "/dashboard/users",
              label: "Users",
            },
            {
              href: "/dashboard/appointments",
              label: "Appointments",
            },
          ],
        },
        {
          href: "",
          label: "Products",
          icon: Package,
          submenus: [
            {
              href: "/dashboard/products",
              label: "Products",
            },
            {
              href: "/dashboard/ordered-products",
              label: "Ordered Products",
            },
          ],
        },
      ],
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
