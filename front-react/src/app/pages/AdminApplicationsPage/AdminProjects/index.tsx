import React, { useEffect, useMemo, useState } from "react";
import AdminProjectList from "./AdminProjectList";
import { AuthorizedService, ProjectListAdmin } from "@awex-api";
import classes from "./AdminProjects.module.css";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { Pagination } from "@components/Pagination";
import AdminApplicationAreaNavbar from "../../../layouts/AdminAreaLayout/AdminApplicationAreaLayout/AdminApplicationAreaNavbar";

const DEFAULT_SEARCH = "";
const QUERY_PARAM_SEARCH = "search";

const ProjectsIncrease: React.FC = () => {
  const [applications, setApplications] = React.useState<ProjectListAdmin[]>(
    []
  );
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    submitTextFilter();
  };

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

  function changePage(page: number): void {
    setPage(page);
  }

  const submittedSearchText = useMemo(() => {
    const searchText = searchParams.get(QUERY_PARAM_SEARCH);
    return searchText === null ? DEFAULT_SEARCH : searchText;
  }, [searchParams]);

  useEffect(() => {
    setSearchText(submittedSearchText);
  }, []);

  useEffect(() => {
    if (searchInputFocused) {
      return;
    }
    submitTextFilter();
  }, [searchInputFocused]);

  useEffect(() => {
    const searchText = searchParams.get(QUERY_PARAM_SEARCH);
    AuthorizedService.adminProjectsList(
      page.toString(),
      undefined,
      searchText!
    ).then((res) => {
      setApplications(res.list!);
      setTotalPages(res.pages!);
      setPage(res.page!);
    });
  }, [page, totalPages]);

  return (
    <>
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
                name="search"
                placeholder="Поиск по ID/названию/ИНН/адресу"
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
        </div>
      </div>

      <AdminApplicationAreaNavbar />

      <div className={classes["container"]}>
        <div className="admin-marchants__list">
          <div className="admin-marchants__item-labels">
            <p className="admin-marchants__item-label">Номер</p>
            <p className="admin-marchants__item-label">Номер/ID мерчанта</p>
            <p className="admin-marchants__item-label">Дата заявки</p>
            <p className="admin-marchants__item-label" />
          </div>

          <AdminProjectList applications={applications} />
        </div>

        {totalPages > 1 ? (
          <Pagination
            currentPage={page}
            goToPage={changePage}
            pages={totalPages}
          />
        ) : null}
      </div>
    </>
  );
};

export default ProjectsIncrease;
