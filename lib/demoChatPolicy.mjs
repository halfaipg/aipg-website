// SPDX-License-Identifier: AGPL-3.0-or-later
// Public limits shared by the browser and server; no configuration or secrets.
export const GUEST_TURNS = 15;
export const IP_TURNS = 30;
export const MAX_MESSAGES = GUEST_TURNS * 2 - 1;
export const MAX_CONTEXT_BYTES = 48000;

export function conversationWindow(messages) {
  const window = messages.map(({ role, content }) => ({ role, content }));
  const encoder = new TextEncoder();
  let bytes = window.reduce((total, m) => total + encoder.encode(m.content).length, 0);
  // Recycle whole oldest exchanges, never orphan an assistant or drop the new question.
  while (window.length > 1 && (window.length > MAX_MESSAGES || bytes > MAX_CONTEXT_BYTES)) {
    for (const message of window.splice(0, 2)) bytes -= encoder.encode(message.content).length;
  }
  return window;
}
