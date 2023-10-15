import { useEffect, useMemo, useReducer, useState } from "react";
import { MerchantItem } from "./MerchantItem";
import { AuthorizedService, type UserList } from "@awex-api";
import { MerchantPaginator } from "./MerchantPaginator";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import { useSearchParams } from "react-router-dom";
import style from "./style.module.css";
import classNames from "classnames";

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

const QUERY_PARAM_PAGE = "page";

const QUERY_PARAM_SEARCH = "search";

const DEFAULT_PAGE = 1;

const DEFAULT_LISTING: UserList[] = [];

const DEFAULT_PERMANENT_UPDATES: ListingItemUpdate[] = [];

const DEFAULT_OPTIMISTIC_UPDATES: ListingItemUpdate[] = [];

const DEFAULT_EXISTING_ROLES: string[] = [];

const DEFAULT_MERCHANT_ROLES: string[] = [];

const DEFAULT_SEARCH = "";

export function AdminMerchantsPage() {
  const dispatch = useAppDispatch();

  const [searchInputFocused, setSearchInputFocused] = useState(false);

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

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
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

  const submitedSearchText = searchParams.get(QUERY_PARAM_SEARCH);

  useEffect(() => {
    if (submitedSearchText !== null) {
      setSearchText(submitedSearchText);
    }
  }, []);

  useEffect(() => {
    const pageStr = searchParams.get(QUERY_PARAM_PAGE);
    if (pageStr === null) {
      setCurrentPage(DEFAULT_PAGE);
      return;
    }
    const pageParsed = parseInt(pageStr, 10);
    if (isNaN(pageParsed) || pageParsed < 1) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.delete(QUERY_PARAM_PAGE);
      setSearchParams(nextSearchParams);
      return;
    }
    setCurrentPage(pageParsed);
  }, [searchParams]);

  useEffect(() => {
    if (currentPage > totalPages) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set(QUERY_PARAM_PAGE, totalPages.toString());
      setSearchParams(nextSearchParams);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      return;
    }

    setListingLoading(true);
    AuthorizedService.adminList(
      currentPage.toString(),
      submitedSearchText || DEFAULT_SEARCH
    )
      .then((response) => {
        setCurrentPage(response.page || 1);
        setListing(
          response.list ? fixUserListing(response.list) : DEFAULT_LISTING
        );
        setTotalPages(response.pages || 1);
        dispatchPermanentUpdatesAction({ type: "clear_all" });
        dispatchOptimisticUpdatesAction({ type: "clear_all" });
      })
      .catch((error) => {
        console.error(error);
        setListingError(error.message || "failed to load listing");
      })
      .finally(() => {
        setListingLoading(false);
      });
  }, [currentPage, submitedSearchText]);

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
      ? AuthorizedService.adminEnable(merchantId.toString())
      : AuthorizedService.adminDisable(merchantId.toString());

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

  return (
    <main className="main main--profile-filling">
      <div className="admin-statistic admin-marchants ">
        <div className="admin-statistic__container">
          <form
            className="admin-applications__from"
            onSubmit={handleSearchFormSubmit}
          >
            <div className="admin-applications__search search-group">
              <input
                className="admin-applications__src search-input"
                type="search"
                name="query"
                placeholder="Поиск по ID/имени мерчанта/названию/ИНН/адресу/телефону/юрисдикции"
                value={searchText}
                onChange={handleSearchInputChange}
                onFocus={() => setSearchInputFocused(true)}
                onBlur={() => setSearchInputFocused(false)}
              />
              <img
                className="admin-applications__search-img search-img"
                src="/img/icons/search.svg"
                alt="Поиск"
              />
              <button
                className={classNames(
                  "search-apply-btn",
                  searchInputFocused && "search-apply-btn--active"
                )}
                type="button"
              >
                Применить
              </button>
            </div>
          </form>
          <div className="admin-applications__main">
            <div className="admin-marchants__list">
              <div className="admin-marchants__item-labels">
                <p className="admin-marchants__item-label">Имя/ID</p>
                <p className="admin-marchants__item-label">Дата регистрации</p>
                <p className="admin-marchants__item-label">Комиссия</p>
                <p className="admin-marchants__item-label">Действия</p>
                <p className="admin-marchants__item-label" />
                <p className="admin-marchants__item-label" />
              </div>
              {listingLoading && optimisticListing.length === 0 && "Loading..."}
              {!loading && !!error && "Ошибка соединения."}
              {optimisticListing.map((merchantDetails) => {
                const merchantId = merchantDetails.id;
                if (merchantId === undefined) {
                  return null;
                }
                return (
                  <MerchantItem
                    merchantId={merchantId.toString()}
                    profileData={merchantDetails.data}
                    enabled={merchantDetails.enabled}
                    existingRoles={existingRoles || DEFAULT_EXISTING_ROLES}
                    roles={merchantDetails.roles || DEFAULT_MERCHANT_ROLES}
                    onToggleEnabled={(enabled) =>
                      handleToogleEnabled(merchantId, enabled)
                    }
                    onUpdateRoles={(roles, cb) => {
                      handleUpdateRoles(merchantId, roles, cb);
                    }}
                    key={merchantId.toString()}
                  />
                );
              })}
              {optimisticListing.length > 0 && (
                <MerchantPaginator
                  className={style["paginator"]}
                  queryParamPage={QUERY_PARAM_PAGE}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function applyUpdates(users: UserList[], updates: ListingItemUpdate[]) {
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

function fixUserListing(listing: UserList[]): UserList[] {
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
