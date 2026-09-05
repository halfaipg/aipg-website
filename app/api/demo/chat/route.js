// SPDX-License-Identifier: AGPL-3.0-or-later
import { createDemoHandler } from "@/lib/demoChat.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 70;
const handle = createDemoHandler();
export const GET = handle;
export const POST = handle;
