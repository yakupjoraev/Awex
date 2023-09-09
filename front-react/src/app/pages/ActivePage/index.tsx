import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WithdrawForm } from "./WIthdrawForm";
import { useWindowSize } from "usehooks-ts";
import { SellForm } from "./SellForm";
import { SwapForm } from "./SwapForm";
import { actives } from "../../../data/actives";
import { NotFoundPage } from "../NotFoundPage";
import { ActiveDetails } from "./ActiveDetails";
import { SecondaryPanel } from "./SecondaryPanel";
import { OrderCashForm } from "./OrderCashForm";

const SPLIT_VIEW_WIDTH = 768;

type Action = "withdraw" | "sell" | "swap" | "orderCash";

export function ActivePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { width } = useWindowSize();
  const { activeId, action: unsafeAction } = useParams();

  const action = isAction(unsafeAction) ? unsafeAction : "withdraw";

  if (!activeId) {
    console.log("no activeId");
    return <NotFoundPage />;
  }
  const active = actives[activeId];
  if (!active) {
    console.log("no active");
    return <NotFoundPage />;
  }

  const handleChangeAction = (action: Action) => {
    navigate(`/actives/${activeId}/${action}`, {
      replace: true,
      state: { primary: false },
    });
  };

  const handleNavDetails = () => {
    navigate(`/actives/${activeId}/${action}`, {
      replace: true,
      state: { primary: true },
    });
  };

  const splitView = width >= SPLIT_VIEW_WIDTH;

  if (splitView) {
    return (
      <div className="wrapper-payment">
        <ActiveDetails
          active={active}
          action={action}
          onNavigate={handleChangeAction}
        />
        {renderLeftPanel(action, handleNavDetails)}
      </div>
    );
  } else {
    return (
      <div className="wrapper-payment">
        {state?.primary ? (
          <ActiveDetails
            active={active}
            action={action}
            onNavigate={handleChangeAction}
          />
        ) : (
          renderLeftPanel(action, handleNavDetails)
        )}
      </div>
    );
  }
}

function renderLeftPanel(
  action: Action,
  handleNavBack: () => void
): JSX.Element {
  let secondaryPanel;
  switch (action) {
    case "withdraw": {
      secondaryPanel = (
        <SecondaryPanel title="Вывод" onNavBack={handleNavBack}>
          <WithdrawForm onNavBack={handleNavBack} />
        </SecondaryPanel>
      );
      break;
    }
    case "sell": {
      secondaryPanel = (
        <SecondaryPanel title="Продать" onNavBack={handleNavBack}>
          <SellForm />
        </SecondaryPanel>
      );
      break;
    }
    case "swap": {
      secondaryPanel = (
        <SecondaryPanel title="SWAP" onNavBack={handleNavBack}>
          <SwapForm />
        </SecondaryPanel>
      );
      break;
    }
    case "orderCash": {
      secondaryPanel = (
        <SecondaryPanel title="Заказ наличных в офис" onNavBack={handleNavBack}>
          <OrderCashForm />
        </SecondaryPanel>
      );
      break;
    }
  }
  return secondaryPanel;
}

function isAction(action: string | undefined): action is Action {
  switch (action) {
    case "withdraw":
    case "sell":
    case "swap":
    case "orderCash": {
      return true;
    }
    default: {
      return false;
    }
  }
}
