import { CURRENCIES } from "../constants";
import { I18N } from "../constants/i18n";
import { Filters } from "../types/filters";
import { ClearButton, FilterRow, SearchButton, SearchInput, Select } from "./components";

interface SearchProps {
  draftFilters: Filters;
  setDraftFilters: (filters: Filters) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
};

export const Search = ({draftFilters, setDraftFilters, onSubmit, onClear}:SearchProps) => {

    return (
            <form
              role="search"
              onSubmit={onSubmit}>
              <FilterRow>
                <SearchInput
                  value={draftFilters.search}
                  onChange={(e) => setDraftFilters({ ...draftFilters, search: e.target.value })}
                  placeholder={I18N.SEARCH_PLACEHOLDER}
                  aria-label={I18N.SEARCH_LABEL}
                />
        
                <Select
                  value={draftFilters.currency}
                  onChange={(e) => setDraftFilters({ ...draftFilters, currency: e.target.value })}
                  aria-label={I18N.CURRENCY_FILTER_LABEL}>
                  <option value="">{I18N.CURRENCIES_OPTION}</option>
        
                  {CURRENCIES.map((currency) => (
                    <option
                      key={currency}
                      value={currency}>{currency}</option>
                  ))}
                </Select>
        
                <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
        
                <ClearButton onClick={onClear}>
                  {I18N.CLEAR_FILTERS}
                </ClearButton>
              </FilterRow>
            </form>
    )
}