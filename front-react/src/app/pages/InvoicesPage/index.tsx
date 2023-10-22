import { useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";
import { QrModal } from "../../components/QrModal";
import { Helmet } from "react-helmet-async";
import { AuthorizedService } from "@awex-api";
import usePortal from "react-useportal";
import { OrderFilter, OrderFilterState } from "./OrderFilter";
import { useDebounce } from "usehooks-ts";
import { useAppSelector } from "@store/hooks";

interface VOrder {
  status: "wait" | "paid" | "expired";
  id: string;
}

const DEFAULT_FILTER_STATE: OrderFilterState = {
  projectId: null,
  status: null,
  dateRange: null,
};

const DEFAULT_ORDERS: VOrder[] = [];

const FILTER_DEBOUNCE = 500;

export function InvoicesPage() {
  const { Portal } = usePortal();

  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE);
  const filterStateDebounced = useDebounce(filterState, FILTER_DEBOUNCE);

  const [orders, setOrders] = useState<VOrder[]>(DEFAULT_ORDERS);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const projects = useAppSelector((state) => state.projects.data);

  const [qrModalOpened, setQrModalOpened] = useState(false);
  const [qrModalLink, setQrModalLink] = useState<string | null>(null);

  useEffect(() => {
    let page: undefined = undefined;
    let projectId: number | undefined = undefined;
    let status: "wait" | "paid" | "expired" | undefined = undefined;
    let startTime: number | undefined = undefined;
    let endTime: number | undefined = undefined;

    if (filterState.projectId !== null) {
      projectId = parseInt(filterState.projectId, 10);
      if (isNaN(projectId)) {
        projectId = undefined;
      }
    }
    if (filterState.status !== null) {
      status = filterState.status;
    }
    if (filterState.dateRange) {
      if (filterState.dateRange.from) {
        startTime = Math.floor(filterState.dateRange.from.getTime() / 1000);
      }
      if (filterState.dateRange.to) {
        startTime = Math.floor(filterState.dateRange.to.getTime() / 1000);
      }
    }

    setOrdersLoading(true);
    AuthorizedService.ordersList(page, projectId, status, startTime, endTime)
      .then((response) => {
        if (!response.list) {
          setOrders([]);
        } else {
          const nextOrders: VOrder[] = [];

          for (const listItem of response.list) {
            const status = listItem.status;
            if (status === undefined) {
              continue;
            }
            const orderId = listItem.id;
            if (orderId === undefined) {
              continue;
            }
            nextOrders.push({
              id: orderId.toString(),
              status,
            });
          }

          setOrders(nextOrders);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setOrdersLoading(false);
      });
  }, [filterStateDebounced]);

  const handleShowQr = (orderId: string) => {
    const paymentLink =
      (typeof window === "undefined"
        ? "http://example.com"
        : window.location.origin) +
      "/payment/" +
      orderId;

    setQrModalLink(paymentLink);
    setQrModalOpened(true);
  };

  const handleQrModalClose = () => {
    setQrModalOpened(false);
  };

  const handleFilterChange = (nextFilter: OrderFilterState) => {
    setFilterState(nextFilter);
  };

  return (
    <div className="wrapper">
      <section className="successfully-invoice">
        <Helmet title="Счета" />
        <div className="successfully-invoice__header">
          <h1 className="successfully-invoice__title main-title">Счета</h1>
        </div>

        <OrderFilter
          filter={filterState}
          projects={projects}
          onSubmit={handleFilterChange}
        />

        {ordersLoading && <div>Загрузка...</div>}
        {!ordersLoading && orders.length === 0 && <div>Не найдено.</div>}
        <ul className="successfully-invoice__list">
          {orders.map((order) => {
            return (
              <OrderItem
                orderId={order.id}
                status={order.status}
                onShowQr={handleShowQr}
                key={order.id}
              />
            );
          })}
        </ul>
      </section>
      {qrModalLink !== null && (
        <Portal>
          <QrModal
            open={qrModalOpened}
            value={qrModalLink}
            onClose={handleQrModalClose}
          />
        </Portal>
      )}
    </div>
  );
}
