import assert from "node:assert/strict";
import test from "node:test";

import { selectTextRoutePriority } from "../../app/run/operatorOpportunityLogic.mjs";

test("balances real workload against missing text-route replicas", () => {
  const priority = selectTextRoutePriority([
    { name: "gpt-oss-120b", type: "text", workers: 2, jobs30d: 3900 },
    {
      name: "deepseek-v4-flash-nvfp4",
      type: "text",
      workers: 1,
      jobs30d: 4300,
    },
    {
      name: "qwen38-flash-next-125b-nvfp4",
      type: "text",
      workers: 1,
      jobs30d: 40,
    },
  ]);

  assert.deepEqual(priority, {
    name: "deepseek-v4-flash-nvfp4",
    workers: 1,
    jobs30d: 4300,
    missingReplicas: 2,
  });
});

test("does not recommend media, fully redundant, offline, or malformed routes", () => {
  const priority = selectTextRoutePriority([
    { name: "Krea 2 Turbo", type: "image", workers: 1, jobs30d: 9000 },
    { name: "already-covered", type: "text", workers: 3, jobs30d: 8000 },
    { name: "offline", type: "text", workers: 0, jobs30d: 7000 },
    { name: "bad-count", type: "text", workers: "many", jobs30d: 6000 },
    { name: "useful-route", type: "text", workers: 2, jobs30d: 5000 },
  ]);

  assert.equal(priority?.name, "useful-route");
  assert.equal(selectTextRoutePriority([]), null);
  assert.equal(selectTextRoutePriority(null), null);
});

test("uses missing replicas when under-target routes have no workload yet", () => {
  assert.equal(
    selectTextRoutePriority([
      { name: "two-workers", type: "text", workers: 2, jobs30d: 0 },
      { name: "one-worker", type: "text", workers: 1, jobs30d: 0 },
    ])?.name,
    "one-worker",
  );
});
