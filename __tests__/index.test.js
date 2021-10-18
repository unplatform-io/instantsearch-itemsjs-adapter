import { sum, InstantSearchItemsjsAdapter } from "../src/index";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds "test" + 2 to equal "test 2"', () => {
  expect(InstantSearchItemsjsAdapter("test", 2)).toBe("test 2");
});
