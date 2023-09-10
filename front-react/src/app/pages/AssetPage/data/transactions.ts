interface Transaction {
  id: string;
  status: "sent" | "received";
  address: string;
  date: Date;
}

export const transactions: Transaction[] = [
  {
    id: "id2",
    status: "received",
    address: "124yvJcUW5da2cgctQucenm2LBMKDKExWc",
    date: new Date("2023-09-07T10:00:18.152Z"),
  },

  {
    id: "id1",
    status: "sent",
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    date: new Date("2023-09-06T10:00:18.152Z"),
  },
  {
    id: "id0",
    status: "received",
    address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    date: new Date("2023-09-05T10:00:18.152Z"),
  },
];
