import { Radix } from "@common/radix"
import { expect, test } from "vitest";

test("Test PowerRadix", () => {
  const p = new Radix(1, 7)
  expect(p.digitPair).toStrictEqual([0, 1])
})
