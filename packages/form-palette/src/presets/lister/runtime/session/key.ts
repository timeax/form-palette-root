// packages/form-palette/src/presets/lister/runtime/session/key.ts

/**
 * Create a stable-ish unique runtime key for sessions/inflight ownership.
 * Uses crypto.randomUUID when available, otherwise falls back.
 */
export function createRuntimeKey(prefix = "rt"): string {
    const anyCrypto = (globalThis as any)?.crypto;
    if (anyCrypto?.randomUUID) return `${prefix}_${anyCrypto.randomUUID()}`;

    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
