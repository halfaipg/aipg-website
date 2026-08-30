import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateUrl = new URL(
  "../../.github/ISSUE_TEMPLATE/operator-interest.yml",
  import.meta.url,
);

test("operator intake collects only coarse public recruitment data", async () => {
  const source = await readFile(templateUrl, "utf8");

  for (const field of [
    "id: modalities",
    "id: gpu_model",
    "id: vram",
    "id: operating_system",
    "id: availability",
    "id: region",
    "id: public_boundary",
  ]) {
    assert.match(source, new RegExp(field));
  }

  assert.match(source, /This issue is public/);
  assert.match(source, /Do not include API keys/);
  assert.match(source, /I have not included credentials/);

  for (const forbiddenField of [
    "id: api_key",
    "id: private_key",
    "id: wallet",
    "id: ip_address",
    "id: hostname",
    "id: account_id",
  ]) {
    assert.doesNotMatch(source, new RegExp(forbiddenField));
  }
});
