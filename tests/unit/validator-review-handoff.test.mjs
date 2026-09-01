import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const lookupUrl = new URL(
  "../../app/validate/ValidatorStatusLookup.jsx",
  import.meta.url,
);

test("unreviewed validators receive a safe cohort-review handoff", async () => {
  const source = await readFile(lookupUrl, "utf8");

  assert.match(source, /qualification\.status === "unreviewed"/);
  assert.match(source, /AIPowerGrid\/grid-validator\/issues\/5/);
  assert.match(source, /registration alone does not prove/);
  assert.match(source, /public validator\s+ID/);

  for (const secret of [
    "API key",
    "private key",
    "wallet address",
    "IP address",
    "config file",
    "raw diagnostics",
  ]) {
    assert.match(source, new RegExp(secret));
  }
});
