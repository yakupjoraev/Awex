import { MyActivesCheck } from "@components/MyActivesCheck";
import { MyActivesChecks } from "@components/MyActivesChecks";
import { actives } from "../../../data/actives";
import { useEffect, useId, useMemo, useState } from "react";
import { ActivePaginator } from "./ActivePaginator";
import { useDebounce } from "usehooks-ts";
import escapeRegExp from "lodash/escapeRegExp";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const PAGE_LENGTH = 4;
const SEARCH_THROTTLE = 200;

export function MyActivesPage() {
  const zeroBalancesCheckboxId = useId();
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, SEARCH_THROTTLE);

  useEffect(() => {
    console.log(hideZeroBalances, currentPage, debouncedSearchText);
  }, [hideZeroBalances, currentPage, debouncedSearchText]);

  const filteredActives = useMemo(() => {
    const normalizedSearchText = debouncedSearchText.trim().toLowerCase();
    if (normalizedSearchText.length === 0) {
      if (hideZeroBalances) {
        return actives.filter((active) => active.balance > 0);
      } else {
        return actives;
      }
    }
    const searchRe = new RegExp(escapeRegExp(normalizedSearchText), "i");
    return actives.filter((active) => {
      if (hideZeroBalances && active.balance === 0) {
        return false;
      }
      return (
        searchRe.test(active.currency) ||
        searchRe.test(active.currencyDesc) ||
        searchRe.test(active.balance.toString())
      );
    });
  }, [debouncedSearchText, hideZeroBalances]);

  useEffect(() => {
    console.log(filteredActives);
  }, [filteredActives]);

  const totalPages = useMemo(() => {
    return filteredActives.length === 0
      ? 1
      : Math.ceil(filteredActives.length / PAGE_LENGTH);
  }, [filteredActives]);

  const normalizedCurrentPage =
    currentPage > totalPages ? totalPages : currentPage;

  const visibleActives = useMemo(() => {
    const offset = (normalizedCurrentPage - 1) * PAGE_LENGTH;
    return filteredActives.slice(offset, offset + PAGE_LENGTH);
  }, [filteredActives, normalizedCurrentPage]);

  const handleNotImplemented = () => {
    toast("NOT IMPLEMENTED!");
  };

  const handleHideZeroBalancesChange = () => {
    setHideZeroBalances(!hideZeroBalances);
  };

  const handleSearchInputKeyUp = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setSearchText(ev.currentTarget.value);
  };

  const handleNavigate = (page: number) => {
    if (page < 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="wrapper">
      <Helmet title="Мои активы" />
      <section className="active-page">
        <div className="my-actives">
          <div className="my-actives__header">
            <h1 className="my-actives__title main-title">Мои активы:</h1>
            <div className="my-actives__search search-group">
              <input
                className="my-actives__src search-input"
                type="search"
                placeholder="Поиск"
                onKeyUp={handleSearchInputKeyUp}
              />
              <img
                className="my-actives__search-img search-img"
                src="/img/icons/search.svg"
                alt="Поиск"
              />
            </div>
          </div>
          <div className="my-actives__checks-view checkbox-group">
            <input
              className="my-actives__checkbox checkbox-input"
              type="checkbox"
              id={zeroBalancesCheckboxId}
              checked={hideZeroBalances}
              onChange={handleHideZeroBalancesChange}
            />
            <label
              className="my-actives__label checkbox-label"
              htmlFor={zeroBalancesCheckboxId}
            >
              <div className="my-actives__checkbox-decor checkbox-decor" />
              <span className="my-actives__checkbox-text checkbox-text">
                Скрыть нулевые балансы
              </span>
            </label>
          </div>
          <div className="my-actives__checks-container">
            <MyActivesChecks>
              {visibleActives.map((active) => {
                const { id: key, ...rest } = active;
                return (
                  <MyActivesCheck
                    {...rest}
                    onSell={handleNotImplemented}
                    onSwap={handleNotImplemented}
                    onWithdraw={handleNotImplemented}
                    key={key}
                  />
                );
              })}
            </MyActivesChecks>
          </div>
        </div>
        {totalPages > 1 && (
          <ActivePaginator
            currentPage={normalizedCurrentPage}
            totalPages={totalPages}
            onNavigate={handleNavigate}
          />
        )}
      </section>
    </div>
  );
}
