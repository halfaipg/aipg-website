import assert from "node:assert/strict";
import test from "node:test";

import {
  linuxCohortCommands,
  SYSTEMD_HELPER_COMMIT,
  SYSTEMD_HELPER_SHA256,
  SYSTEMD_HELPER_URL,
  VALIDATOR_RELEASE_TAG,
} from "../../app/validate/linuxServiceContract.mjs";

test("pins the cohort binary and systemd helper independently", () => {
  assert.equal(VALIDATOR_RELEASE_TAG, "v0.1.0-preview.15");
  assert.match(SYSTEMD_HELPER_COMMIT, /^[0-9a-f]{40}$/);
  assert.match(SYSTEMD_HELPER_SHA256, /^[0-9a-f]{64}$/);
  assert.equal(
    SYSTEMD_HELPER_URL,
    `https://raw.githubusercontent.com/AIPowerGrid/grid-validator/${SYSTEMD_HELPER_COMMIT}/scripts/install-systemd.sh`,
  );
});

test("renders a credential-free, checksum-gated Linux service path", () => {
  const commands = Object.values(linuxCohortCommands()).join("\n");

  assert.match(commands, /aipg-validator enroll/);
  assert.match(commands, /aipg-validator check --no-probe/);
  assert.match(commands, /sha256sum -c -/);
  assert.match(commands, /systemctl status aipg-validator/);
  assert.match(commands, new RegExp(SYSTEMD_HELPER_SHA256));
  assert.doesNotMatch(commands, /\/master\//);
  assert.doesNotMatch(commands, /curl[^\n]*\|\s*(?:ba)?sh/);
  assert.doesNotMatch(commands, /private[_ -]?key/i);
  assert.doesNotMatch(commands, /grid_[A-Za-z0-9_-]{12,}/);
});
