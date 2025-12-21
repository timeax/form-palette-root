// src/core/registry/field-registry.ts

import type { Field } from "@/schema/field";
import { BinderRegistry } from "@/core/registry/binder-registry";

/**
 * Runtime helper: check if a DOM node is currently attached.
 *
 * Guards against SSR or test environments where document may not exist.
 */
export function isInDom(node: Element | null | undefined): boolean {
    if (!node || !(node instanceof Node)) return false;
    if (typeof document === "undefined") return false;
    return document.body.contains(node);
}

/**
 * Central store for all fields registered with the core runtime.
 *
 * Goals:
 * - Keep stable Field references (no cloning).
 * - Prefer mounted fields for all “get” operations.
 * - Prune stale/detached fields opportunistically.
 */
export class FieldRegistry {
    private list: Field[] = [];
    #binding: BinderRegistry | undefined;

    // ─────────────────────────────────────────────────────────
    // internals
    // ─────────────────────────────────────────────────────────

    private getEl(field: Field): Element | null {
        const anyField = field as any;
        const el = anyField?.ref?.current as Element | null | undefined;
        return el ?? null;
    }

    /** Mounted = has an element and that element is currently in the DOM. */
    private isMounted(field: Field): boolean {
        return isInDom(this.getEl(field));
    }

    /**
     * Detached = has an element but it is NOT currently in the DOM.
     * Note: if ref.current is null, we treat it as “unknown” (do NOT prune).
     */
    private isDetached(field: Field): boolean {
        const el = this.getEl(field);
        return !isInDom(el);
    }

    /** Mounted-first stable ordering (does not mutate input). */
    private sortMountedFirst(fields: Field[]): Field[] {
        if (fields.length <= 1) return fields.slice();
        return fields
            .slice()
            .sort(
                (a, b) => Number(this.isMounted(b)) - Number(this.isMounted(a))
            );
    }

    /** Prefer the first mounted candidate; else fall back to first candidate. */
    private pickPreferred(fields: Field[]): Field | undefined {
        if (!fields.length) return undefined;
        const mounted = fields.find((f) => this.isMounted(f));
        return mounted ?? fields[0];
    }

    /**
     * Remove detached fields.
     *
     * IMPORTANT: We only remove entries that have a non-null ref.current AND are
     * not in the DOM. We do not remove “unknown” (null-ref) fields because they
     * may be in the process of mounting.
     */
    private pruneDetached(): void {
        if (!this.list.length) return;
        this.list = this.list.filter((f) => !this.isDetached(f));
    }

    /**
     * Remove detached fields that conflict with an incoming field by identifier.
     * This prevents stale “same-name / same-bindId / same-groupId” entries from
     * hijacking lookups.
     */
    private pruneDetachedConflicts(incoming: Field): void {
        const anyIncoming = incoming as any;

        const name = (incoming.name ?? "").trim();
        const bindId = (anyIncoming.bindId as string | undefined) ?? "";
        const groupId = (anyIncoming.groupId as string | undefined) ?? "";

        if (!name && !bindId && !groupId) return;

        this.list = this.list.filter((f) => {
            if (!this.isDetached(f)) return true;

            const anyF = f as any;
            const fName = (f.name ?? "").trim();

            const sameName = !!name && fName === name;
            const sameBind = !!bindId && anyF.bindId === bindId;
            const sameGroup = !!groupId && anyF.groupId === groupId;

            // If it matches any identifier and is detached → prune it.
            return !(sameName || sameBind || sameGroup);
        });
    }

    /**
     * Whether this field should be tracked at all.
     *
     * We require at least one of: name, bindId, groupId.
     */
    hasIdentifier(field: Field): boolean {
        const anyField = field as any;
        const name = (field.name ?? "").trim();
        return !!(name || anyField.bindId || anyField.groupId);
    }

    // ─────────────────────────────────────────────────────────
    // mutations
    // ─────────────────────────────────────────────────────────

    /**
     * Add a field to the registry if it has an identifier.
     *
     * Rules:
     * - Opportunistically prune detached fields.
     * - Prune detached conflicts (same name/bindId/groupId) before adding.
     * - If the same field instance is already tracked, ignore.
     * - If the same key already exists (rare), prefer mounted; otherwise replace.
     */
    add(field: Field): void {
        if (!this.hasIdentifier(field)) return;

        // Keep the list clean as fields remount/unmount.
        this.pruneDetached();

        // Remove stale entries that would conflict with lookups.
        this.pruneDetachedConflicts(field);

        // Same instance? do nothing.
        if (this.list.includes(field)) return;

        const incomingKey = (field as any)?.key as string | undefined;

        // If a field with the same key exists, prefer mounted one.
        if (incomingKey) {
            const idx = this.list.findIndex(
                (f) => (f as any)?.key === incomingKey
            );
            if (idx !== -1) {
                const existing = this.list[idx];
                const existingMounted = this.isMounted(existing);
                const incomingMounted = this.isMounted(field);

                // Prefer mounted; if neither mounted, prefer the incoming (newer).
                if (existingMounted && !incomingMounted) return;
                this.list[idx] = field;
                return;
            }
        }

        this.list.push(field);
    }

    /**
     * Remove a field from the registry.
     */
    remove(field: Field): void {
        const idx = this.list.indexOf(field);
        if (idx === -1) return;
        this.list.splice(idx, 1);
    }

    /**
     * Clear all tracked fields.
     */
    clear(): void {
        this.list = [];
    }

    // ─────────────────────────────────────────────────────────
    // accessors (mounted-preferred)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields tracked by this registry (mounted-first).
     */
    all(): Field[] {
        // Keep list tidy when reading too.
        this.pruneDetached();
        return this.sortMountedFirst(this.list);
    }

    /** All fields that have a non-empty name (mounted-first). */
    getAllNamed(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => !!(f.name && f.name.trim().length > 0))
        );
    }

    /** All fields that have a bindId (mounted-first). */
    getAllBound(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).bindId)
        );
    }

    /** All fields that have a groupId (mounted-first). */
    getAllGrouped(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).groupId)
        );
    }

    // ─────────────────────────────────────────────────────────
    // name-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /**
     * First field with a given name (exact, trimmed match).
     *
     * Behaviour:
     * - Prefer a field whose ref is currently in the DOM.
     * - If none are mounted, fall back to the first matching field.
     */
    getByName(name: string): Field | undefined {
        if (!name) return undefined;
        const target = name.trim();
        if (!target) return undefined;

        this.pruneDetached();

        const candidates = this.list.filter(
            (f) => (f.name ?? "").trim() === target
        );
        return this.pickPreferred(candidates);
    }

    /**
     * All fields with a given name (exact, trimmed match), mounted-first.
     */
    getAllByName(name: string): Field[] {
        if (!name) return [];
        const target = name.trim();
        if (!target) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f.name ?? "").trim() === target)
        );
    }

    // ─────────────────────────────────────────────────────────
    // groupId-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /** First field with the given groupId (prefer mounted). */
    getByGroupId(id: string): Field | undefined {
        if (!id) return undefined;

        this.pruneDetached();

        const candidates = this.list.filter((f) => (f as any).groupId === id);
        return this.pickPreferred(candidates);
    }

    /** All fields with the given groupId (mounted-first). */
    getAllByGroupId(id: string): Field[] {
        if (!id) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).groupId === id)
        );
    }

    // ─────────────────────────────────────────────────────────
    // bindId-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields that share the given bindId (mounted-first).
     */
    getAllByBind(id: string): Field[] {
        if (!id) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).bindId === id)
        );
    }

    /**
     * First field with the given bindId (prefer mounted).
     */
    getByBind(id: string): Field | undefined {
        if (!id) return undefined;

        const candidates = this.getAllByBind(id);
        return this.pickPreferred(candidates);
    }

    getBind(id: string): Field | undefined {
        return this.getByBind(id);
    }

    get binding(): BinderRegistry {
        if (!(this.#binding instanceof BinderRegistry)) {
            this.#binding = new BinderRegistry(this);
        }
        return this.#binding;
    }
}
