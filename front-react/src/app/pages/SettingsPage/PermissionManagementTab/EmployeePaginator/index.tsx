import { useMemo } from "react";
import { getPaginationModel, ITEM_TYPES } from "ultimate-pagination";

interface EmployeePaginatorProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

export function EmployeePaginator(props: EmployeePaginatorProps) {
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
    <ul className="settings-security__pages">
      {model.map((modelItem) => {
        switch (modelItem.type) {
          case ITEM_TYPES.PAGE: {
            return (
              <li
                className="settings-security__page"
                key={modelItem.key}
                data-type={modelItem.type}
              >
                {modelItem.isActive ? (
                  modelItem.value.toString()
                ) : (
                  <a
                    className="settings-security__page-link"
                    href="#"
                    data-page={modelItem.value.toString()}
                    onClick={handleNavBtnClick}
                  >
                    {modelItem.value.toString()}
                  </a>
                )}
              </li>
            );
          }
          case ITEM_TYPES.ELLIPSIS: {
            return (
              <li className="settings-security__page" key={modelItem.key}>
                ...
              </li>
            );
          }
          default: {
            return null;
          }
        }
      })}
      {/* <li className="settings-security__page">
        <a className="settings-security__page-link" href="#">
          1
        </a>
      </li>

      <li className="settings-security__page">2</li>

      <li className="settings-security__page">
        <a className="settings-security__page-link" href="#">
          3{" "}
        </a>
      </li> */}
    </ul>
  );
}
