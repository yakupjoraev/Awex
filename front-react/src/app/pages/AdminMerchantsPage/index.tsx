import { useEffect, useMemo, useReducer, useState } from "react";
import { MerchantItem } from "./MerchantItem";
import { AuthorizedService, type UserList } from "@awex-api";
import { MerchantPaginator } from "./MerchantPaginator";
import toast from "react-hot-toast";

type OptimisticUpdatesAction =
  | { type: "add_update"; update: OptimisticUpdate }
  | { type: "remove_update"; update: OptimisticUpdate }
  | { type: "clear_all" };

type PermanentUpdatesAction =
  | { type: "add_update"; update: OptimisticUpdate }
  | { type: "clear_all" };

type OptimisticUpdate = {
  id: number;
  enabled: boolean;
};

const DEFAULT_LISTING: UserList[] = [];

const DEFAULT_PERMANENT_UPDATES: OptimisticUpdate[] = [];

const DEFAULT_OPTIMISTIC_UPDATES: OptimisticUpdate[] = [];

export function AdminMerchantsPage() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [submitedSearchText, setSubmitedSearchText] = useState("");
  const [listing, setListing] = useState(DEFAULT_LISTING);
  const [permanentUpdates, dispatchPermanentUpdatesAction] = useReducer(
    permanentUpdatesReducer,
    DEFAULT_PERMANENT_UPDATES
  );
  const [optimisticUpdates, dispatchOptimisticUpdatesAction] = useReducer(
    optimisticUpdatesReducer,
    DEFAULT_OPTIMISTIC_UPDATES
  );

  useEffect(() => {
    AuthorizedService.adminList(
      currentPage.toString(),
      submitedSearchText || ""
    )
      .then((response) => {
        setCurrentPage(response.page || 1);
        setListing(response.list || DEFAULT_LISTING);
        setTotalPages(response.pages || 1);
        dispatchPermanentUpdatesAction({ type: "clear_all" });
        dispatchOptimisticUpdatesAction({ type: "clear_all" });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, searchText]);

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.currentTarget.value);
  };

  const handleSearchFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const normalizedSearchText = searchText.trim();
    setSubmitedSearchText(normalizedSearchText);
  };

  const handleNavigate = (nextPage: number) => {
    if (nextPage < 1) {
      return;
    } else if (nextPage > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(nextPage);
    }
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

  const updatedListing = useMemo(() => {
    return permanentUpdates === DEFAULT_PERMANENT_UPDATES
      ? listing
      : applyUpdates(listing, permanentUpdates);
  }, [listing, permanentUpdates]);

  const optimisticListing = useMemo(
    () =>
      optimisticUpdates === DEFAULT_OPTIMISTIC_UPDATES
        ? listing
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
              />
              <img
                className="admin-applications__search-img search-img"
                src="/img/icons/search.svg"
                alt="Поиск"
              />
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
                    onToggleEnabled={(enabled) =>
                      handleToogleEnabled(merchantId, enabled)
                    }
                    key={merchantId.toString()}
                  />
                );
              })}
              <MerchantPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function applyUpdates(users: UserList[], updates: OptimisticUpdate[]) {
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
    }

    return nextUser;
  });
}

function permanentUpdatesReducer(
  state: OptimisticUpdate[],
  action: PermanentUpdatesAction
): OptimisticUpdate[] {
  switch (action.type) {
    case "add_update": {
      return [...state, action.update];
    }
    case "clear_all": {
      return DEFAULT_PERMANENT_UPDATES;
    }
  }
}

function optimisticUpdatesReducer(
  state: OptimisticUpdate[],
  action: OptimisticUpdatesAction
): OptimisticUpdate[] {
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
