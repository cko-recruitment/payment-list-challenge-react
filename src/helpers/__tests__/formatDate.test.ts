import { describe, expect, test } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  test("formats a timestamp as dd/MM/yyyy, HH:mm:ss", () => {
    expect(formatDate("2024-04-15T11:00:00")).toBe("15/04/2024, 11:00:00");
  });
});
