import { Link, useParams, useSearchParams } from "react-router-dom";
import { StatsDetails } from "./StatsDetails";
import { StatsFilter, StatsFilterState } from "./StatsFilter";
import { useEffect, useState } from "react";
import { AuthorizedService, Statistics } from "@awex-api";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import {
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_STATS_ROUTE,
} from "@constants/path-locations";
import { PAGE_ID_ADMIN_MERCHANTS, PAGE_ID_ADMIN_STATS } from "@constants/pages";
import { QUERY_PARAM_NAVBACK } from "@constants/common-params";

export const NAV_BACK_ANCHOR_MERCHANTS = "merchants";

export type NavBackAnchor = typeof NAV_BACK_ANCHOR_MERCHANTS;

type PageError = "unknown" | "not_found";

const DEFAULT_CURRENCIES: string[] = [];

const DEFAULT_FILTER_STATE: StatsFilterState = {};

export function AdminMerchantStats() {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navBack = searchParams.get(QUERY_PARAM_NAVBACK);

  const params = useParams();
  const merchantId = params.merchantId;

  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE);

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statisticsError, setStatisticsError] = useState<string | null>(null);

  const currencies = useAppSelector(
    (state) => state.accountConfigSettings.data?.currencies
  );
  const currenciesLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );
  const currenciesError = useAppSelector(
    (state) => state.accountConfigSettings.error
  );

  useEffect(() => {
    if (merchantId === undefined) {
      return;
    }

    let startTime: number | undefined = undefined;
    let endTime: number | undefined = undefined;
    if (filterState.range !== undefined) {
      if (filterState.range.from !== undefined) {
        startTime = Math.floor(filterState.range.from.getTime() / 1000);
      }
      if (filterState.range.to !== undefined) {
        endTime = Math.floor(filterState.range.to.getTime() / 1000);
      }
    }

    let search: string | undefined = undefined;
    if (filterState.search !== undefined) {
      search = filterState.search.trim();
      if (search.length === 0) {
        search = undefined;
      }
    }

    setStatisticsLoading(true);
    AuthorizedService.personalStatistics(
      merchantId,
      startTime?.toString(),
      endTime?.toString(),
      search,
      filterState.currency
    )
      .then((nextStatistics) => {
        setStatistics(nextStatistics);
      })
      .catch((error) => {
        console.error(error);
        setStatisticsError(error.message || "failed to load statistics");
      })
      .finally(() => {
        setStatisticsLoading(false);
      });
  }, [filterState]);

  useEffect(() => {
    dispatch(getConfigSettings());
  }, [dispatch]);

  const handleFilterChange = (filterState: StatsFilterState) => {
    setFilterState(filterState);
  };

  const pageLoading = statisticsLoading || currenciesLoading;

  let pageError: PageError | null = null;
  if (merchantId === undefined) {
    pageError = "not_found";
  } else if (currenciesError || statisticsError) {
    pageError = "unknown";
  }

  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic">
        <div className="admin-statistic__container">
          <div className="admin-statistic__inner">
            <div className="admin-statistic__header">
              <h1 className="admin-statistic__title">Статистика</h1>
              <StatsFilter
                currencies={currencies || DEFAULT_CURRENCIES}
                onSubmit={handleFilterChange}
              />
            </div>
            {pageLoading ? "Загрузка..." : null}
            {!pageLoading && pageError !== null ? renderError(pageError) : null}
            {!pageLoading &&
              pageError === null &&
              statistics !== null &&
              merchantId !== undefined && (
                <StatsDetails
                  merchantId={merchantId}
                  statistics={statistics}
                  appendTop={renderNavBack(navBack)}
                />
              )}
          </div>
        </div>
      </div>
    </main>
  );
}

function renderError(pageError: PageError) {
  switch (pageError) {
    case "not_found": {
      return "Мерчант не найден.";
    }
    case "unknown": {
      return "Ошибка загрузки данных. Пожалуйста, перезагрузите страницу.";
    }
  }
}

function renderNavBack(token: string | null): JSX.Element | null {
  switch (token) {
    case PAGE_ID_ADMIN_MERCHANTS: {
      return (
        <div className="admin-statistic__detal-header">
          <Link
            className="admin-statistic__detal-back"
            to={ADMIN_MERCHANTS_ROUTE}
          >
            <img
              src="/img/icons/angle-left-circle.svg"
              alt="angle-left-circle"
            />
            Вернуться к Мерчанты
          </Link>
        </div>
      );
    }
    case PAGE_ID_ADMIN_STATS: {
      return (
        <div className="admin-statistic__detal-header">
          <Link className="admin-statistic__detal-back" to={ADMIN_STATS_ROUTE}>
            <img
              src="/img/icons/angle-left-circle.svg"
              alt="angle-left-circle"
            />
            Вернуться к Статистика
          </Link>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
