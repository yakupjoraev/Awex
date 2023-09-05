import classNames from "classnames";
import { useMemo } from "react";
import { getPaginationModel, ITEM_TYPES } from "ultimate-pagination";

interface ActivePaginatorProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

export function ActivePaginator(props: ActivePaginatorProps) {
  const model = useMemo(() => {
    return getPaginationModel({
      currentPage: props.currentPage,
      totalPages: props.totalPages,
    });
  }, [props.currentPage, props.totalPages]);

  const handleNavBtnClick = (
    ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    ev.preventDefault();

    const pageRaw = ev.currentTarget.getAttribute("data-page");
    if (pageRaw === null) {
      return;
    }
    const page = parseInt(pageRaw, 10);
    if (isNaN(page)) {
      return;
    }
    if (page <= 0) {
      return;
    }
    props.onNavigate(page);
  };

  if (props.totalPages <= 1) {
    return null;
  }

  return (
    <div className="page-list">
      {model.map((modelItem) => {
        switch (modelItem.type) {
          case ITEM_TYPES.PAGE: {
            return (
              <div
                className={classNames("page-list__item", {
                  active: modelItem.isActive,
                  last: modelItem.value === props.totalPages,
                })}
                key={modelItem.key}
              >
                <a
                  className="page-list__link"
                  href="#"
                  data-page={modelItem.value.toString()}
                  onClick={handleNavBtnClick}
                >
                  {modelItem.value}
                </a>
              </div>
            );
          }
          case ITEM_TYPES.ELLIPSIS: {
            return <div className="page-list__item">. . .</div>;
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  );
}
