import { act, renderHook } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { server } from "../../mocks/node";
import { usePayments } from "../usePayments";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePayments - page reset", () => {
  test("searching resets to page 1", () => {
    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => result.current.setPagination({ page: 3, pageSize: 5 }));
    expect(result.current.pagination.page).toBe(3);

    act(() => result.current.handleSearch({ preventDefault() {} } as React.FormEvent));

    expect(result.current.pagination.page).toBe(1);
  });

  test("clearing filters resets to page 1", () => {
    const { result } = renderHook(() => usePayments(), { wrapper });

    act(() => result.current.setPagination({ page: 3, pageSize: 5 }));
    expect(result.current.pagination.page).toBe(3);

    act(() => result.current.handleClear());

    expect(result.current.pagination.page).toBe(1);
  });
});
