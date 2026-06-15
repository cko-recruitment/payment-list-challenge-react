import { I18N } from "../constants/i18n"
import { PaginationButton, PaginationRow } from "./components"

interface PaginationProps{
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
};


export const Pagination = ({page, totalPages, isFetching, onPrevious, onNext }:  PaginationProps ) => {
    return (

        <PaginationRow >
            <PaginationButton
              onClick={onPrevious}
              disabled={isFetching || page <= 1}>
                {I18N.PREVIOUS_BUTTON}
            </PaginationButton>

            {/* eslint-disable-next-line @stylistic/jsx-newline */}
            <span>{I18N.PAGE_LABEL} {page}</span>

            <PaginationButton
              onClick={onNext}
              disabled={isFetching ||  page >= totalPages}>
                {I18N.NEXT_BUTTON}
            </PaginationButton>
        </PaginationRow>

    )

}