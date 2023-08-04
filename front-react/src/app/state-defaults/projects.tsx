interface Project {
  id: string;
  name: string;
  tokenIcon: string;
  tokenSymbol: string;
  url: string;
  commissionPaidBy: "client" | "merchant";
}

export const projects: Project[] = [
  {
    id: "project1",
    name: "ООО ”Первый”",
    tokenIcon: "actives-1.png",
    tokenSymbol: "USDT",
    url: "https://www.gemini.com/",
    commissionPaidBy: "client",
  },
  {
    id: "project2",
    name: "ООО ”Второй”",
    tokenIcon: "actives-2.png",
    tokenSymbol: "USDT",
    url: "https://www.gemini.com/",
    commissionPaidBy: "client",
  },
  {
    id: "project3",
    name: "ООО ”Третий”",
    tokenIcon: "actives-3.png",
    tokenSymbol: "USDT",
    url: "https://www.gemini.com/",
    commissionPaidBy: "merchant",
  },
];
