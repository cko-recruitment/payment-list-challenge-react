import { useRef, useState } from "react";
import { CURRENCIES } from "../../constants";
import { I18N } from "../../constants/i18n";
import {
  ClearButton,
  FilterRow,
  SearchButton,
  SearchInput,
  Select,
} from "../components";

type FiltersProps = {
  currency?: string;
  hasActiveFilters?: boolean;
  onSearchChange?: (search: string) => void;
  onCurrencyChange?: (currency: string) => void;
  onClearFilters?: () => void;
};

const Filters: React.FC<FiltersProps> = (props) => {
  const {
    currency,
    hasActiveFilters = false,
    onSearchChange,
    onCurrencyChange,
    onClearFilters,
  } = props;

  const formRef = useRef<HTMLFormElement>(null);
  const [hasDraftSearch, setHasDraftSearch] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = String(formData.get("search") ?? "").trim();
    onSearchChange?.(search);
  };

  const handleClear = () => {
    formRef.current?.reset();
    setHasDraftSearch(false);
    onClearFilters?.();
  };

  const showClearButton = hasActiveFilters || hasDraftSearch;

  return (
    <form
      ref={formRef}
      role="search"
      aria-label={I18N.FILTERS_LABEL}
      onSubmit={handleSubmit}
    >
      <FilterRow>
        <SearchInput
          aria-label={I18N.SEARCH_LABEL}
          placeholder={I18N.SEARCH_PLACEHOLDER}
          name="search"
          onChange={(e) => setHasDraftSearch(e.target.value.trim() !== "")}
        />
        <Select
          aria-label={I18N.CURRENCY_FILTER_LABEL}
          value={currency}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
        >
          <option value="">{I18N.CURRENCIES_OPTION}</option>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
        <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
        {showClearButton && (
          <ClearButton type="button" onClick={handleClear}>
            {I18N.CLEAR_FILTERS}
          </ClearButton>
        )}
      </FilterRow>
    </form>
  );
};

export default Filters;
