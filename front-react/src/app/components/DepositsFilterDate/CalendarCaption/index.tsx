import React from "react";
import { format } from "date-fns";
import { CaptionProps, useNavigation } from "react-day-picker";

import { ru } from "date-fns/locale";

export function CalendarCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const hanlePrevMonthBtnClick = () => {
    if (previousMonth) {
      goToMonth(previousMonth);
    }
  };

  const handleNextMonthBtnClick = () => {
    if (nextMonth) {
      goToMonth(nextMonth);
    }
  };

  return (
    <div className="calendar__caption">
      <button
        className="calendar__nav-btn"
        type="button"
        disabled={!previousMonth}
        onClick={hanlePrevMonthBtnClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M13.5 7.5L9 12L13.5 16.5"
              stroke="currentcolor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </button>
      <div className="calendar__caption-label">
        {format(props.displayMonth, "LLLL yyy", { locale: ru })}
      </div>
      <button
        className="calendar__nav-btn"
        type="button"
        disabled={!nextMonth}
        onClick={handleNextMonthBtnClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M10.5 7.5L15 12L10.5 16.5"
              stroke="currentcolor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
