import React from "react";
import { DepositRetentionItem } from "./DepositRetentionItem";
import { Helmet } from "react-helmet-async";

const applications: {
  id: string;
  sumUSD: number;
  projectName: string;
  projectUrl: string;
  clientId: string;
  clientName: string;
  comment: string;
}[] = [
  {
    id: "0",
    sumUSD: 5000,
    projectName: "ООО ”Первый”",
    projectUrl: "https://www.gemini.com/",
    clientId: "124hy4590",
    clientName: "Ivanov Ivan",
    comment:
      "Аренда автомобиля марки Mercedes-Benz E200 А123АА123 на 30 дней (депозит 21 день)",
  },
  {
    id: "1",
    sumUSD: 5000,
    projectName: "ООО ”Первый”",
    projectUrl: "https://www.gemini.com/",
    clientId: "124hy4590",
    clientName: "Ivanov Ivan",
    comment:
      "Аренда автомобиля марки Mercedes-Benz E200 А123АА123 на 30 дней (депозит 21 день)",
  },
  {
    id: "2",
    sumUSD: 5000,
    projectName: "ООО ”Первый”",
    projectUrl: "https://www.gemini.com/",
    clientId: "124hy4590",
    clientName: "Ivanov Ivan",
    comment:
      "Аренда автомобиля марки Mercedes-Benz E200 А123АА123 на 30 дней (депозит 21 день)",
  },
];

export function DepositRetentionPage() {
  return (
    <section className="deposit-retention">
      <Helmet title="Заявка на возврат депозита" />
      <div className="deposits__header deposits__header--start">
        <h1 className="deposits__title main-title">
          Заявка на возврат депозита
        </h1>

        <div className="deposits__info-count deposits__info-count--red">
          {applications.length}
        </div>
      </div>

      <ul className="deposit-retention__list">
        {applications.map((application) => {
          return <DepositRetentionItem {...application} key={application.id} />;
        })}
      </ul>
    </section>
  );
}
