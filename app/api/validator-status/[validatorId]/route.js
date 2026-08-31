import {
  isPublicValidatorId,
  normalizePublicValidatorStatus,
} from "../../../validate/publicStatus.mjs";

const GRID_API = (
  process.env.GRID_API_URL || "https://api.aipowergrid.io"
).replace(/\/$/, "");

export async function GET(_request, context) {
  const { validatorId: rawValidatorId } = await context.params;
  const validatorId = decodeURIComponent(rawValidatorId || "").trim();
  if (!isPublicValidatorId(validatorId)) {
    return Response.json(
      { error: "Enter a validator ID beginning with val_." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${GRID_API}/v1/validator/public/${encodeURIComponent(validatorId)}`,
      { cache: "no-store" },
    );
    if (response.status === 404) {
      return Response.json(
        { error: "Validator not found. Check the complete val_ ID." },
        { status: 404 },
      );
    }
    if (!response.ok) {
      return Response.json(
        { error: "Validator status is temporarily unavailable." },
        { status: 502 },
      );
    }
    const status = normalizePublicValidatorStatus(
      await response.json(),
      validatorId,
    );
    if (!status) {
      return Response.json(
        { error: "Validator status returned an invalid response." },
        { status: 502 },
      );
    }
    return Response.json(status, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Validator status is temporarily unavailable." },
      { status: 502 },
    );
  }
}
