import { useEffect, useMemo, useReducer, useState } from "react";
import { StatsItem } from "./StatsItem";
import { AuthorizedService, type AdminList } from "@awex-api";
import { MerchantPaginator } from "@components/admin/MerchantPaginator";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import { useSearchParams } from "react-router-dom";
import style from "./style.module.css";
import classNames from "classnames";
import {
  StatsFilter,
  StatsFilterState,
} from "../AdminMerchantStats/StatsFilter";
import StatisticsFilters from "./StatisticsFilters";

type OptimisticUpdatesAction =
  | { type: "add_update"; update: ListingItemUpdate }
  | { type: "remove_update"; update: ListingItemUpdate }
  | { type: "clear_all" };

type PermanentUpdatesAction =
  | { type: "add_update"; update: ListingItemUpdate }
  | { type: "clear_all" };

type ListingItemUpdate = {
  id: number;
  enabled?: boolean;
  roles?: string[];
};

type UserListWithFee = AdminList & { fee?: number };

const QUERY_PARAM_PAGE = "page";

const QUERY_PARAM_SEARCH = "search";

const DEFAULT_PAGE = 1;

const DEFAULT_LISTING: UserListWithFee[] = [];

const DEFAULT_PERMANENT_UPDATES: ListingItemUpdate[] = [];

const DEFAULT_OPTIMISTIC_UPDATES: ListingItemUpdate[] = [];

const DEFAULT_EXISTING_ROLES: string[] = [];

const DEFAULT_MERCHANT_ROLES: string[] = [];

const DEFAULT_SEARCH = "";

const DEFAULT_CURRENCIES: string[] = [];

const DEFAULT_FILTER_STATE: StatsFilterState = {};

type PageError = "unknown" | "not_found";

export function AdminStatsPage() {
  const dispatch = useAppDispatch();

  const [searchInputFocused, setSearchInputFocused] = useState(false);

  const [statisticsError, setStatisticsError] = useState<string | null>(null);

  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE);

  const existingRolesLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );
  const existingRoles = useAppSelector(
    (state) => state.accountConfigSettings.data?.roles
  );
  const existingRolesError = useAppSelector(
    (state) => state.accountConfigSettings.error
  );

  const [listingLoading, setListingLoading] = useState(false);
  const [listingError, setListingError] = useState<string | null>(null);
  const [listing, setListing] = useState(DEFAULT_LISTING);

  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH);

  const [permanentUpdates, dispatchPermanentUpdatesAction] = useReducer(
    permanentUpdatesReducer,
    DEFAULT_PERMANENT_UPDATES
  );
  const [optimisticUpdates, dispatchOptimisticUpdatesAction] = useReducer(
    optimisticUpdatesReducer,
    DEFAULT_OPTIMISTIC_UPDATES
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const submittedPage = useMemo(() => {
    const pageStr = searchParams.get(QUERY_PARAM_PAGE);
    if (pageStr === null) {
      return DEFAULT_PAGE;
    }
    const pageParsed = parseInt(pageStr, 10);
    if (isNaN(pageParsed) || pageParsed < 1) {
      return DEFAULT_PAGE;
    }
    if (pageParsed > totalPages) {
      return totalPages;
    }
    return pageParsed;
  }, [searchParams, totalPages]);

  useEffect(() => {
    const pageStr = searchParams.get(QUERY_PARAM_PAGE);
    if (pageStr === null) {
      return;
    }
    const pageParsed = parseInt(pageStr, 10);
    if (isNaN(pageParsed) || pageParsed < 1) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.delete(QUERY_PARAM_PAGE);
      setSearchParams(nextSearchParams);
    } else if (pageParsed > totalPages) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set(QUERY_PARAM_PAGE, totalPages.toString());
      setSearchParams(nextSearchParams);
    }
  }, [searchParams, totalPages]);

  useEffect(() => {
    setListingLoading(true);
    AuthorizedService.merchantList(submittedPage.toString(), filterState.search)
      .then(async (response) => {
        const list = response.list
          ? fixUserListing(response.list)
          : DEFAULT_LISTING;

        const listWithFees: UserListWithFee[] = await Promise.all(
          list.map(async (listItem): Promise<UserListWithFee> => {
            if (listItem.id === undefined) {
              return listItem;
            }
            const fee = await AuthorizedService.personalFeeGet(
              listItem.id.toString()
            );
            if (fee.current === undefined) {
              return listItem;
            }
            const listItemWithFee: UserListWithFee = {
              ...listItem,
              fee: fee.current,
            };
            return listItemWithFee;
          })
        );

        return {
          list: listWithFees,
          page: response.page,
          pages: response.pages,
        };
      })
      .then((response) => {
        const currentPageValue = searchParams.get(QUERY_PARAM_PAGE);
        if (response.page === undefined || response.page === null) {
          if (currentPageValue !== null && currentPageValue !== "1") {
            const nextSearchParams = new URLSearchParams(searchParams);
            nextSearchParams.delete(QUERY_PARAM_PAGE);
            setSearchParams(nextSearchParams);
          }
        } else if (
          currentPageValue === null ||
          currentPageValue !== response.page.toString()
        ) {
          const nextSearchParams = new URLSearchParams(searchParams);
          nextSearchParams.set(QUERY_PARAM_PAGE, response.page.toString());
          setSearchParams(nextSearchParams);
        }

        setListing(response.list);
        setListingError(null);
        setTotalPages(response.pages || 1);
        dispatchPermanentUpdatesAction({ type: "clear_all" });
        dispatchOptimisticUpdatesAction({ type: "clear_all" });
      })
      .catch((error) => {
        setStatisticsError(error);
        setListingError(error.message || "failed to load listing");
      })
      .finally(() => {
        setListingLoading(false);
      });
  }, [submittedPage, filterState]);

  useEffect(() => {
    dispatch(getConfigSettings());
  }, [dispatch]);

  useEffect(() => {
    if (searchInputFocused) {
      return;
    }
    submitTextFilter();
  }, [searchInputFocused]);

  const submitTextFilter = () => {
    const normalizedSearchText = searchText.trim();

    if (searchParams.get(QUERY_PARAM_SEARCH) === normalizedSearchText) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    if (normalizedSearchText.length === 0) {
      nextSearchParams.delete(QUERY_PARAM_SEARCH);
    } else {
      nextSearchParams.set(QUERY_PARAM_SEARCH, normalizedSearchText);
    }
    setSearchParams(nextSearchParams);
  };

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.currentTarget.value);
  };

  const handleSearchFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    submitTextFilter();
  };

  const handleToogleEnabled = (merchantId: number, enabled: boolean) => {
    const existsUpdateIndex = optimisticUpdates.findIndex(
      (update) => update.id === merchantId && update.enabled !== undefined
    );
    if (existsUpdateIndex !== -1) {
      return;
    }

    const update = {
      id: merchantId,
      enabled,
    };

    dispatchOptimisticUpdatesAction({
      type: "add_update",
      update,
    });

    const asyncCall = enabled
      ? AuthorizedService.merchantEnable(merchantId.toString())
      : AuthorizedService.merchantDisable(merchantId.toString());

    asyncCall
      .then(() => {
        if (enabled) {
          toast.success("Аккаунт разблокирован.");
        } else {
          toast.success("Аккаунт заблокирован.");
        }
        dispatchPermanentUpdatesAction({ type: "add_update", update });
      })
      .catch((error) => {
        console.error(error);
        if (enabled) {
          toast.error("Не удалось разблокировать аккаунт.");
        } else {
          toast.error("Не удалось заблокировать аккаунт.");
        }
      })
      .finally(() => {
        dispatchOptimisticUpdatesAction({
          type: "remove_update",
          update,
        });
      });
  };

  const handleUpdateRoles = (
    merchantId: number,
    roles: string[],
    cb: () => void
  ) => {
    AuthorizedService.adminUpdate(merchantId.toString(), { roles: roles })
      .then(() => {
        toast.success("Права мерчанта успешно обновлены!");
        dispatchPermanentUpdatesAction({
          type: "add_update",
          update: {
            id: merchantId,
            roles,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось обновить права мерчанта.");
      })
      .finally(() => {
        cb();
      });
  };

  const handleFilterChange = (filterState: StatsFilterState) => {
    setFilterState(filterState);
  };

  const handleDeleteMerchant = (merchantId: number) => {
    AuthorizedService.merchantDelete(merchantId.toString())
      .then(() => {
        toast.success("Мерчант успешно удален!");
        setListing((prevListing) =>
          prevListing.filter((item) => item.id !== merchantId)
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось удалить мерчанта.");
      });
  };

  const loading = listingLoading || existingRolesLoading;
  const error = listingError || existingRolesError;

  const updatedListing = useMemo(() => {
    return permanentUpdates === DEFAULT_PERMANENT_UPDATES
      ? listing
      : applyUpdates(listing, permanentUpdates);
  }, [listing, permanentUpdates]);

  const optimisticListing = useMemo(
    () =>
      optimisticUpdates === DEFAULT_OPTIMISTIC_UPDATES
        ? updatedListing
        : applyUpdates(updatedListing, optimisticUpdates),
    [updatedListing, optimisticUpdates]
  );

  const currencies = useAppSelector(
    (state) => state.accountConfigSettings.data?.currencies
  );
  const currenciesLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );
  const currenciesError = useAppSelector(
    (state) => state.accountConfigSettings.error
  );

  const pageLoading = currenciesLoading;

  let pageError = null;
  if (currenciesError || statisticsError) {
    pageError = "unknown";
  }

  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic__container">
        <div className="admin-statistic">
          <div className="admin-statistic__container">
            <div className="admin-statistic__inner">
              <div className="admin-statistic__header">
                <h1 className="admin-statistic__title">Статистика</h1>
                <StatisticsFilters
                  currencies={currencies || DEFAULT_CURRENCIES}
                  onSubmit={handleFilterChange}
                />
              </div>
              {pageLoading ? "Загрузка..." : null}
              {!pageLoading && pageError !== null
                ? renderError(pageError as PageError)
                : null}
              {!pageLoading && pageError === null && (
                <div className="admin-applications__main">
                  <div className="admin-marchants__list">
                    <div className="admin-marchants__item-labels">
                      <p className="admin-marchants__item-label">Имя/ID</p>
                      <p className="admin-marchants__item-label">
                        Дата регистрации
                      </p>
                      <p className="admin-marchants__item-label">Комиссия</p>
                      <p className="admin-marchants__item-label">Действия</p>
                      <p className="admin-marchants__item-label" />
                      <p className="admin-marchants__item-label" />
                    </div>
                    {listingLoading &&
                      optimisticListing.length === 0 &&
                      "Loading..."}
                    {!loading && !!error && "Ошибка соединения."}
                    {optimisticListing?.map((merchantDetails) => {
                      const merchantId = merchantDetails.id;
                      if (merchantId === undefined) {
                        return null;
                      }
                      return (
                        <StatsItem
                          merchantId={merchantId.toString()}
                          profileData={merchantDetails.data}
                          enabled={merchantDetails.enabled}
                          existingRoles={
                            existingRoles || DEFAULT_EXISTING_ROLES
                          }
                          roles={
                            merchantDetails.roles || DEFAULT_MERCHANT_ROLES
                          }
                          fee={merchantDetails.fee}
                          onToggleEnabled={(enabled) =>
                            handleToogleEnabled(merchantId, enabled)
                          }
                          onUpdateRoles={(roles, cb) => {
                            handleUpdateRoles(merchantId, roles, cb);
                          }}
                          key={merchantId.toString()}
                          createdAt={merchantDetails.createdAt}
                          onDelete={() => handleDeleteMerchant(merchantId)}
                        />
                      );
                    })}
                    {optimisticListing.length > 0 && (
                      <MerchantPaginator
                        className={style["paginator"]}
                        queryParamPage={QUERY_PARAM_PAGE}
                        currentPage={submittedPage}
                        totalPages={totalPages}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function applyUpdates(users: UserListWithFee[], updates: ListingItemUpdate[]) {
  return users.map((user) => {
    if (user.id === undefined) {
      return user;
    }

    const userUpdates = updates.filter((update) => update.id === user.id);
    if (userUpdates.length === 0) {
      return user;
    }

    const nextUser = { ...user };
    for (const update of userUpdates) {
      if (update.enabled !== undefined) {
        nextUser.enabled = update.enabled;
      }
      if (update.roles !== undefined) {
        nextUser.roles = update.roles;
      }
    }

    return nextUser;
  });
}

function permanentUpdatesReducer(
  state: ListingItemUpdate[],
  action: PermanentUpdatesAction
): ListingItemUpdate[] {
  switch (action.type) {
    case "add_update": {
      return mergeUpdates(state, action.update);
    }
    case "clear_all": {
      return DEFAULT_PERMANENT_UPDATES;
    }
  }
}

function optimisticUpdatesReducer(
  state: ListingItemUpdate[],
  action: OptimisticUpdatesAction
): ListingItemUpdate[] {
  switch (action.type) {
    case "add_update": {
      return [...state, action.update];
    }
    case "remove_update": {
      const updateIndex = state.indexOf(action.update);
      if (updateIndex === -1) {
        return state;
      }
      return [...state.slice(0, updateIndex), ...state.slice(updateIndex + 1)];
    }
    case "clear_all": {
      return DEFAULT_OPTIMISTIC_UPDATES;
    }
  }
}

function mergeUpdates(updates: ListingItemUpdate[], update: ListingItemUpdate) {
  const existingUpdateIndex = updates.findIndex(({ id }) => id === update.id);
  if (existingUpdateIndex === -1) {
    return [...updates, update];
  } else {
    return [
      ...updates.slice(0, existingUpdateIndex),
      { ...updates[existingUpdateIndex], ...update },
      ...updates.slice(existingUpdateIndex + 1),
    ];
  }
}

function fixUserListing(listing: AdminList[]): AdminList[] {
  return listing.map((item) => {
    if (item.roles && item.roles instanceof Array === false) {
      const nextItem = { ...item };
      nextItem.roles = Object.entries(item.roles as any)
        .filter(([_k, v]) => v)
        .map(([k]) => k);
      return nextItem;
    }
    return item;
  });
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
