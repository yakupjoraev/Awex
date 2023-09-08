export interface Active {
  id: string;
  currency: string;
  currencyDesc: string;
  currencyIcon: string;
  balance: number;
  swap: boolean;
  sell: boolean;
}

export const actives: Record<string, Active> = {
  id0: {
    id: "id0",
    currency: "RUB",
    currencyDesc: "Russian Rubles",
    currencyIcon: "actives-1",  
    balance: 178956757,
    swap: false,
    sell: false,
  },
  id1: {
    id: "id1",
    currency: "Bitcoin",
    currencyDesc: "BTC",
    currencyIcon: "actives-2",
    balance: 178956757,
    swap: true,
    sell: true,
  },
  id2: {
    id: "id2",
    currency: "Green Metaverse Token",
    currencyDesc: "PEOPLE",
    currencyIcon: "actives-3",
    balance: 178956757,
    swap: true,
    sell: true,
  },
  id3: {
    id: "id3",
    currency: "Etherium",
    currencyDesc: "ETH",
    currencyIcon: "actives-4",
    balance: 178956757,
    swap: true,
    sell: true,
  },
  id4: {
    id: "id4",
    currency: "Green Metaverse Token",
    currencyDesc: "PEOPLE",
    currencyIcon: "actives-3",
    balance: 0,
    swap: true,
    sell: true,
  },
  id5: {
    id: "id5",
    currency: "Etherium",
    currencyDesc: "ETH",
    currencyIcon: "actives-4",
    balance: 654485475,
    swap: true,
    sell: true,
  },
  id6: {
    id: "id6",
    currency: "Bitcoin",
    currencyDesc: "BTC",
    currencyIcon: "actives-2",
    balance: 654485475,
    swap: true,
    sell: true,
  },
};
