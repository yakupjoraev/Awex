import { useEffect, useState } from "react";
import { MerchantItem } from "./MerchantItem";
import { AuthorizedService, UserList } from "@awex-api";
import { MerchantPaginator } from "./MerchantPaginator";

const DEFAULT_LISTING: UserList[] = [];

export function AdminMerchantsPage() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [submitedSearchText, setSubmitedSearchText] = useState("");
  const [listing, setListing] = useState(DEFAULT_LISTING);

  useEffect(() => {
    AuthorizedService.adminList(
      currentPage.toString(),
      submitedSearchText || ""
    )
      .then((response) => {
        setCurrentPage(response.page || 1);
        setListing(response.list || []);
        setTotalPages(response.pages || 1);
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
                <p className="admin-marchants__item-label">Комиссия</p>
                <p className="admin-marchants__item-label" />
                <p className="admin-marchants__item-label" />
              </div>
              {listing.map((merchantDetails) => {
                if (!merchantDetails.id) {
                  return null;
                }
                return (
                  <MerchantItem
                    merchantId={merchantDetails.id.toString()}
                    profileData={merchantDetails.data}
                    key={merchantDetails.id}
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
