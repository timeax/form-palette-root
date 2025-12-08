// src/core/registry/field-registry.ts

import type { Field } from "@/schema/field";
import { BinderRegistry } from "@/core/registry/binder-registry";

/**
 * Runtime helper: check if a DOM node is currently attached.
 *
 * Guards against SSR or test environments where document may not exist.
 */
export function isInDom(node: Element | null | undefined): boolean {
    if (!node) return false;
    if (typeof document === "undefined") return false;
    return document.body.contains(node);
}

/**
 * Central store for all fields registered with the core runtime.
 *
 * Responsibilities:
 * - Keep a stable list of Field instances (no duplicates).
 * - Only track fields that have at least one identifier:
 *   - name (non-empty, trimmed)
 *   - bindId
 *   - groupId
 * - Provide convenient lookup methods:
 *   - all / getAllNamed / getAllBound / getAllGrouped
 *   - getByName / getAllByName
 *   - getByGroupId / getAllByGroupId
 *   - getByBind / getAllByBind (binder semantics, prefer mounted)
 */
export class FieldRegistry {
    private list: Field[] = [];
    #binding: BinderRegistry | undefined;

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

    /**
     * Add a field to the registry if it has an identifier.
     * Duplicate instances are ignored.
     */
    add(field: Field): void {
        if (!this.hasIdentifier(field)) return;
        if (this.list.includes(field)) return;
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

    /**
     * All fields tracked by this registry.
     */
    all(): Field[] {
        return this.list;
    }

    // ─────────────────────────────────────────────────────────
    // “views” over the list
    // ─────────────────────────────────────────────────────────

    /** All fields that have a non-empty name. */
    getAllNamed(): Field[] {
        return this.list.filter((f) => !!(f.name && f.name.trim().length > 0));
    }

    /** All fields that have a bindId. */
    getAllBound(): Field[] {
        return this.list.filter((f) => (f as any).bindId);
    }

    /** All fields that have a groupId. */
    getAllGrouped(): Field[] {
        return this.list.filter((f) => (f as any).groupId);
    }

    // ─────────────────────────────────────────────────────────
    // name-based lookups
    // ─────────────────────────────────────────────────────────

    /**
     * First field with a given name (exact, trimmed match).
     *
     * Note: expects the raw name used by the field, e.g.:
     *   "email"  or  "tags[]"
     */
    getByName(name: string): Field | undefined {
        if (!name) return undefined;
        const target = name.trim();
        if (!target) return undefined;

        return this.list.find((f) => (f.name ?? "").trim() === target);
    }

    /**
     * All fields with a given name (exact, trimmed match).
     */
    getAllByName(name: string): Field[] {
        if (!name) return [];
        const target = name.trim();
        if (!target) return [];

        return this.list.filter((f) => (f.name ?? "").trim() === target);
    }

    // ─────────────────────────────────────────────────────────
    // groupId-based lookups
    // ─────────────────────────────────────────────────────────

    /** First field with the given groupId. */
    getByGroupId(id: string): Field | undefined {
        if (!id) return undefined;
        return this.list.find((f) => (f as any).groupId === id);
    }

    /** All fields with the given groupId. */
    getAllByGroupId(id: string): Field[] {
        if (!id) return [];
        return this.list.filter((f) => (f as any).groupId === id);
    }

    // ─────────────────────────────────────────────────────────
    // bindId-based lookups (binder semantics)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields that share the given bindId.
     */
    getAllByBind(id: string): Field[] {
        if (!id) return [];
        return this.list.filter((f) => (f as any).bindId === id);
    }

    /**
     * First field with the given bindId.
     *
     * Behaviour:
     * - Prefer a field whose ref is currently in the DOM.
     * - If none are mounted, fall back to the first matching field.
     */
    getByBind(id: string): Field | undefined {
        if (!id) return undefined;

        const candidates = this.getAllByBind(id);
        if (!candidates.length) return undefined;

        const mounted = candidates.find((f) => {
            const anyField = f as any;
            const el = anyField.ref?.current as Element | null | undefined;
            return isInDom(el ?? null);
        });

        return mounted ?? candidates[0];
    }

    getBind(id: string): Field | undefined {
        return this.getByBind(id);
    }

    get binding(): BinderRegistry {
        if (!(this.#binding instanceof BinderRegistry))
            this.#binding = new BinderRegistry(this);
        return this.#binding;
    }
}
