import { VisitOptions, Page } from './../../../../node_modules/@inertiajs/core/types/types.d';
// src/adapters/inertia.ts
import type {
   NamedAdapterFactory,
   NamedAdapterConfig,
   AdapterResult,
   AdapterOk,
   AdapterError,
} from "@/schema/adapter";

// (Adapters augmentation is above in the same file)

/**
 * Lazy-load the Inertia router from '@inertiajs/react'.
 *
 * This keeps '@inertiajs/react' out of the main bundle until an
 * Inertia adapter is actually used.
 */
async function loadInertiaRouter() {
   const mod: any = await import("@inertiajs/react");
   const router = mod?.router ?? mod?.Inertia;

   if (!router || typeof router.visit !== "function") {
      throw new Error(
         "[form-palette] Inertia router not found in @inertiajs/react"
      );
   }

   return router as {
      visit: (url: string, options?: VisitOptions) => void;
   };
}

/**
 * Shape raw Inertia errors into something with `.errors`
 * so Form Palette's autoErr branch can pick them up.
 */
function normalizeInertiaError(
   raw: unknown
): { errors: Record<string, string | string[]> } | unknown {
   if (
      raw &&
      typeof raw === "object" &&
      "errors" in (raw as any) &&
      typeof (raw as any).errors === "object"
   ) {
      // Already in { errors: {...} } shape
      return raw as any;
   }

   if (
      raw &&
      typeof raw === "object" &&
      !("errors" in (raw as any))
   ) {
      // Inertia usually passes the error bag directly to onError.
      return { errors: raw as Record<string, string | string[]> };
   }

   return raw;
}

export const createInertiaAdapter: NamedAdapterFactory<"inertia"> = (
   config: NamedAdapterConfig<"inertia">
): AdapterResult<AdapterOk<"inertia">> => {
   const { method = 'post', url, data, callbacks } = config;

   const upperMethod = method.toUpperCase() as VisitOptions["method"];

   /**
    * Build VisitOptions with callbacks wired to AdapterCallbacks
    * + optional Promise resolve/reject.
    */
   function buildOptions(
      resolve?: (value: AdapterOk<"inertia">) => void,
      reject?: (reason: AdapterError<"inertia">) => void,
      extraOptions?: unknown
   ): VisitOptions {
      const merged: VisitOptions = {
         method: upperMethod,
         //@ts-ignore
         data,
         onSuccess: (page: Page) => {
            callbacks?.onSuccess?.(page as AdapterOk<"inertia">);
            resolve?.(page as AdapterOk<"inertia">);
         },
         onError: (rawErrors: any) => {
            const payload = normalizeInertiaError(rawErrors);
            callbacks?.onError?.(payload as AdapterError<"inertia">);
            reject?.(payload as AdapterError<"inertia">);
         },
         onFinish: () => {
            callbacks?.onFinish?.();
         },
         ...(extraOptions as VisitOptions | undefined),
      };

      return merged;
   }

   function submit(options?: unknown): void {
      // Fire-and-forget; we still propagate callbacks and finish.
      (async () => {
         let finished = false;
         const finish = () => {
            if (finished) return;
            finished = true;
            callbacks?.onFinish?.();
         };

         try {
            const router = await loadInertiaRouter();
            const visitOptions = buildOptions(undefined, undefined, options);
            // NOTE: buildOptions already wires onFinish, so we
            // call finish() only if the lazy import itself fails.
            router.visit(url, visitOptions);
         } catch (error) {
            const payload = normalizeInertiaError(error);
            callbacks?.onError?.(payload as AdapterError<"inertia">);
            finish();
         }
      })();
   }

   function send(options?: unknown): Promise<AdapterOk<"inertia">> {
      return new Promise(async (resolve, reject) => {
         let finished = false;
         const finish = () => {
            if (finished) return;
            finished = true;
            callbacks?.onFinish?.();
         };

         try {
            const router = await loadInertiaRouter();
            const visitOptions = buildOptions(
               (page) => {
                  // buildOptions' onFinish will call onFinish();
                  resolve(page);
               },
               (err) => {
                  reject(err);
               },
               options
            );
            router.visit(url, visitOptions);
         } catch (error) {
            const payload = normalizeInertiaError(error);
            callbacks?.onError?.(payload as AdapterError<"inertia">);
            finish();
            reject(payload as AdapterError<"inertia">);
         }
      });
   }

   function run(options?: unknown): Promise<AdapterOk<"inertia">> {
      // Same as send(), so the core can safely `await adapter.run()`
      // if it wants, or ignore the promise if it doesn't care.
      return send(options);
   }

   return {
      submit,
      send,
      run,
   };
};
