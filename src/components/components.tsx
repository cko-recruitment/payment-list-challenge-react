import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;

  &:focus {
    border-color: rgb(61, 70, 83);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: rgb(61, 70, 83);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: rgb(61, 108, 209);
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(33, 65, 154);
  }
`;

export const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }
`;

export const DefaultButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #7f8ca8;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(79, 85, 100);
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  margin-top: 1.5rem;
`;

export const Table = styled.table`
  min-width: 100%;
  text-sm: 14px;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 600;
  background-color: #f3f4f6;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;

  ${(props) =>
    props.status === "completed"
      ? `background-color: #d1fae5; color: #15803d;`
      : props.status === "pending"
      ? `background-color: #fef3c7; color: #92400e;`
      : `background-color: #fee2e2; color: #b91c1c;`}
`;

export const Spinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorBox = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  color: #b91c1c;
  background-color: #fee2e2;
  border-radius: 0.375rem;
`;

export const EmptyBox = styled.div`
  color: #4b5563;
  text-align: center;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.375rem;
`;

export const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #374151;
`;

export const PaginationButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TableHeaderWrapper = styled.thead`
  background-color: #f9fafb;
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid #e5e7eb;
`;

export const TableBodyWrapper = styled.tbody`
  background-color: white;
`;
