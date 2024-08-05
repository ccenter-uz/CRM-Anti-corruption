import { Database, File, List, Minus, PhoneCall } from "react-feather";

export const adminlinks = [
  {
    id: 0,
    title: "Дашборд",
    href: "/dashboard",
    icon: Database,
  },
  {
    id: 1,
    title: "Колл-центр",
    href: "#",
    icon: PhoneCall,
    subMenu: [
      {
        id: 11,
        title: "Мурожаат қолдириш",
        href: "/callcenter/leaveRequest",
        icon: Minus,
      },
      {
        id: 12,
        title: "Мурожаатлар",
        href: "/callcenter/requests",
        icon: Minus,
      },
    ],
  },

  {
    id: 3,
    title: "Қораламалар",
    href: "#",
    icon: File,
    subMenu: [
      {
        id: 31,
        title: "Колл-центр",
        href: "/callcenter/drafts",
        icon: Minus,
      },
    ],
  },
  {
    id: 4,
    title: "Бошқарув",
    href: "#",
    icon: List,
    subMenu: [
      {
        id: 41,
        title: "Йўналишлар",
        href: "/control/razdel",
        icon: Minus,
      },
      {
        id: 42,
        title: "Операторлар",
        href: "/control/operators",
        icon: Minus,
      },
      {
        id: 43,
        title: "Вилоятлар",
        href: "/control/regions",
        icon: Minus,
      },
      {
        id: 44,
        title: "Тегишли идоралар",
        href: "/control/orgs",
        icon: Minus,
      },
    ],
  },
];
export const userlinks = [
  {
    id: 1,
    title: "Колл-центр",
    href: "#",
    icon: PhoneCall,
    subMenu: [
      {
        id: 11,
        title: "Мурожаат қолдириш",
        href: "/callcenter/leaveRequest",
        icon: Minus,
      },
      {
        id: 12,
        title: "Мурожаатлар",
        href: "/callcenter/requests",
        icon: Minus,
      },
    ],
  },

  {
    id: 3,
    title: "Қораламалар",
    href: "#",
    icon: File,
    subMenu: [
      {
        id: 31,
        title: "Колл-центр",
        href: "/callcenter/drafts",
        icon: Minus,
      },
    ],
  },
];
