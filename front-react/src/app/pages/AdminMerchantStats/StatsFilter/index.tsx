import { useEffect, useMemo, useState } from "react";
import { AdminStatisticsSelector } from "../AdminStatisticsSelector";
import { currencyToName } from "@constants/currency-names";
import { DateRange } from "react-day-picker";
import { AdminStatsDateRange } from "../AdminStatsDateRange";
import { StatsSearch } from "../StatsSearch";

export interface StatsFilterState {
  currency?: string;
  range?: DateRange;
  search?: string;
}

const DEFAULT_FILTER_STATE: StatsFilterState = {};

const CURRENCY_VALUE_NONE = "none";

const CURRENCY_PREFIX = "_";

export interface StatsFilterProps {
  currencies: string[];
  onSubmit: (filterState: StatsFilterState) => void;
}

export function StatsFilter(props: StatsFilterProps) {
  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE);
  const [interactive, setInteractive] = useState(false);
  const [currencyValue, setCurrencyValue] =
    useState<string>(CURRENCY_VALUE_NONE);
  const [rangeValue, setRangeValue] = useState<DateRange | undefined>(
    undefined
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const nextFilterState = createFilterState(
      currencyValue,
      rangeValue,
      searchValue
    );
    if (!equalsFilterState(filterState, nextFilterState)) {
      setFilterState(nextFilterState);
      props.onSubmit(createFilterState(currencyValue, rangeValue, searchValue));
    }
  };

  const handleCurrencyChange = (value: string) => {
    setCurrencyValue(value);
    props.onSubmit(createFilterState(currencyValue, rangeValue, searchValue));
  };

  const handleDateRangeChange = (value: DateRange | undefined) => {
    setRangeValue(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInteractive = (nextInteractive: boolean) => {
    setInteractive(nextInteractive);
  };

  useEffect(() => {
    if (!interactive) {
      const nextFilterState = createFilterState(
        currencyValue,
        rangeValue,
        searchValue
      );
      if (!equalsFilterState(filterState, nextFilterState)) {
        setFilterState(nextFilterState);
        props.onSubmit(
          createFilterState(currencyValue, rangeValue, searchValue)
        );
      }
    }
  }, [interactive]);

  const currencyOptions: Record<string, string> = useMemo(() => {
    const options = Object.fromEntries(
      props.currencies.map((currency): [string, string] => {
        if (Object.prototype.hasOwnProperty.call(currencyToName, currency)) {
          return [CURRENCY_PREFIX + currency, currencyToName[currency]];
        }
        return [CURRENCY_PREFIX + currency, currency];
      })
    );
    options[CURRENCY_VALUE_NONE] = "Все";
    return options;
  }, [props.currencies]);

  return (
    <form className="admin-statistic__form" onSubmit={handleSubmit}>
      <AdminStatisticsSelector
        label="Валюта"
        value={currencyValue}
        options={currencyOptions}
        onChange={handleCurrencyChange}
      />
      <AdminStatsDateRange
        label="Период"
        value={rangeValue}
        onChange={handleDateRangeChange}
        onInteractive={handleInteractive}
      />
      <StatsSearch
        value={searchValue}
        onChange={handleSearchChange}
        onInteractive={handleInteractive}
      />
    </form>
  );
}

function createFilterState(
  currencyValue: string,
  rangeValue: DateRange | undefined,
  searchValue: string
): StatsFilterState {
  const currency: string | undefined =
    currencyValue === CURRENCY_VALUE_NONE
      ? undefined
      : currencyValue.slice(CURRENCY_PREFIX.length);

  let search: string | undefined = searchValue.trim();
  if (search.length === 0) {
    search = undefined;
  }

  return { currency, range: rangeValue, search };
}

function equalsFilterState(
  filterStateA: StatsFilterState,
  filterStateB: StatsFilterState
): boolean {
  if (filterStateA.currency !== filterStateB.currency) {
    return false;
  }

  const rangeFromA: number | undefined = filterStateA.range?.from?.getTime();
  const rangeFromB: number | undefined = filterStateB.range?.from?.getTime();
  if (rangeFromA !== rangeFromB) {
    return false;
  }

  const rangeToA: number | undefined = filterStateA.range?.to?.getTime();
  const rangeToB: number | undefined = filterStateB.range?.to?.getTime();
  if (rangeToA !== rangeToB) {
    return false;
  }

  if (filterStateA.search !== filterStateB.search) {
    return false;
  }

  return true;
}
