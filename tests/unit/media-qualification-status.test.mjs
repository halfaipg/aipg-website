import assert from "node:assert/strict";
import test from "node:test";

import { normalizeMediaQualificationStatus } from "../../app/run/qualificationStatus.mjs";

function fixture() {
  return {
    schema: "aipg-media-manager-qualification-status-v1",
    profile: {
      id: "ace-step-v1.5-xl-turbo",
      version: "0.2.4",
      digest: "a".repeat(64),
    },
    qualification_release: {
      tag: "manager-qualification-v0.1.0-preview.1",
      url: "https://github.com/AIPowerGrid/grid-media-worker/releases/tag/manager-qualification-v0.1.0-preview.1",
    },
    runs_per_evidence_set: 3,
    classes: ["minimum", "midrange", "datacenter"].map((id) => ({
      id,
      accepted_evidence_sets: 0,
      required_evidence_sets: 1,
      status: "needed",
    })),
    release_ready: false,
    updated_at: "2026-08-30T06:54:03Z",
    participation_url:
      "https://github.com/AIPowerGrid/grid-media-worker/issues/new?template=media-manager-qualification.yml",
    cohort_url: "https://github.com/AIPowerGrid/grid-media-worker/issues/8",
    runbook_url:
      "https://github.com/AIPowerGrid/grid-media-worker/blob/main/docs/MANAGER_QUALIFICATION.md",
  };
}

test("normalizes an evidence-bound media qualification status", () => {
  const status = normalizeMediaQualificationStatus(fixture());

  assert.equal(status.profileId, "ace-step-v1.5-xl-turbo");
  assert.equal(status.runsPerEvidenceSet, 3);
  assert.equal(status.releaseReady, false);
  assert.deepEqual(status.classes, [
    { id: "minimum", accepted: 0, required: 1, status: "needed" },
    { id: "midrange", accepted: 0, required: 1, status: "needed" },
    { id: "datacenter", accepted: 0, required: 1, status: "needed" },
  ]);
});

test("rejects inconsistent counts, release readiness, and untrusted links", () => {
  const inconsistent = fixture();
  inconsistent.classes[0].accepted_evidence_sets = 1;
  assert.equal(normalizeMediaQualificationStatus(inconsistent), null);

  const falseReady = fixture();
  falseReady.release_ready = true;
  assert.equal(normalizeMediaQualificationStatus(falseReady), null);

  const untrusted = fixture();
  untrusted.participation_url = "https://example.com/collect-secrets";
  assert.equal(normalizeMediaQualificationStatus(untrusted), null);
});

test("accepts a fully complete status only when every class is complete", () => {
  const complete = fixture();
  complete.classes = complete.classes.map((item) => ({
    ...item,
    accepted_evidence_sets: 1,
    status: "complete",
  }));
  complete.release_ready = true;

  assert.equal(normalizeMediaQualificationStatus(complete).releaseReady, true);
});
