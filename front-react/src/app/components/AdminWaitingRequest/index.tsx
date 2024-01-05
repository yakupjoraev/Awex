import { LdsSpinner } from "@components/LdsSpinner";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminWaitingRequest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-applications__waiting">
      <LdsSpinner />
      <p className="admin-applications__waiting-label">
        Запрос отправлен мерчанту
      </p>
      <p className="admin-applications__waiting-label--small">
        Ожидайте изменения статуса запроса
      </p>

      <button
        onClick={() => navigate(-1)}
        className="invoice-project__btn second-btn"
      >
        Вернуться к заявкам
      </button>
    </div>
  );
};

export default AdminWaitingRequest;
