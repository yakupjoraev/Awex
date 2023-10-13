import classNames from "classnames";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPaginationModel, ITEM_TYPES } from "ultimate-pagination";

interface MerchantPaginatorProps {
  className?: string;
  queryParamPage: string;
  currentPage: number;
  totalPages: number;
}

export function MerchantPaginator(props: MerchantPaginatorProps) {
  const location = useLocation();

  const model = useMemo(() => {
    return getPaginationModel({
      currentPage: props.currentPage,
      totalPages: props.totalPages,
    });
  }, [props.currentPage, props.totalPages]);

  if (props.totalPages <= 1) {
    return null;
  }

  return (
    <div className={classNames("page-list", props.className)}>
      {model.map((modelItem) => {
        switch (modelItem.type) {
          case ITEM_TYPES.PAGE: {
            const nextSearchParams = new URLSearchParams(location.search);
            nextSearchParams.set(
              props.queryParamPage,
              modelItem.value.toString()
            );
            const pageUrl =
              location.pathname + "?" + nextSearchParams.toString();
            return (
              <div
                className={classNames("page-list__item", {
                  active: modelItem.isActive,
                  last: modelItem.value === props.totalPages,
                })}
                key={modelItem.key}
              >
                <Link className="page-list__link" to={pageUrl}>
                  {modelItem.value.toString()}
                </Link>
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
