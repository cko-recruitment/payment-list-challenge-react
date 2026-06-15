import { Container, ErrorBox, TableWrapper } from '../components/components'
import { PaymentsTable } from "../components/PaymentsTable";

import { usePayments } from '../hooks/usePayments';
import { Pagination } from '../components/Pagination';
import { Search } from '../components/Search';

export const PaymentsPage = () => {
  const {
    draftFilters,
    setDraftFilters,
    pagination,
    setPagination,
    data,
    errorMessage,
    isLoading,
    isFetching,
    handleSearch,
    handleClear,
  } = usePayments();

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 1;

  return <Container>
    <Search
      onClear={handleClear}
      setDraftFilters={setDraftFilters}
      onSubmit={handleSearch}
      draftFilters={draftFilters} />



    {errorMessage && (
      <ErrorBox>{errorMessage}</ErrorBox>
    )}

    <TableWrapper>
      {!errorMessage &&
        <>
          <PaymentsTable
            isLoading={isLoading}
            payments={data?.payments || []} />

          <Pagination
            onNext={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            onPrevious={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            page={pagination.page}
            totalPages={totalPages}
            isFetching={isFetching}
          />

        </>
      }
    </TableWrapper>
  </Container>;
};
