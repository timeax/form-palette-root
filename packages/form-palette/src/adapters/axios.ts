// src/adapters/axios.ts
import axios, {
   type AxiosError,
   type AxiosRequestConfig,
   type AxiosResponse,
} from "axios";
import type {
   NamedAdapterFactory,
   AdapterResult,
   AdapterOk,
   AdapterError,
} from "@/schema/adapter";

// (Adapters augmentation is above in the same file)

export const createAxiosAdapter: NamedAdapterFactory<"axios"> = (config): AdapterResult<AdapterOk<"axios">> => {
   const { method, url, data, callbacks } = config;

   function buildRequestConfig(
      options?: unknown
   ): AxiosRequestConfig<any> {
      return {
         method,
         url,
         data,
         ...(options as AxiosRequestConfig<any> | undefined),
      };
   }

   function submit(options?: unknown): void {
      let finished = false;
      const finish = () => {
         if (finished) return;
         finished = true;
         callbacks?.onFinish?.();
      };

      axios
         .request(buildRequestConfig(options))
         .then((response: AxiosResponse<unknown>) => {
            callbacks?.onSuccess?.(response as AdapterOk<"axios">);
         })
         .catch((error: AxiosError | unknown) => {
            const axiosErr = error as AxiosError<unknown>;
            // Prefer response.data; this is usually where Laravel
            // puts `{ errors: {...} }` for validation failures.
            const payload =
               axiosErr?.response?.data ?? error;

            callbacks?.onError?.(payload as AdapterError<"axios">);
         })
         .finally(() => {
            finish();
         });
   }

   function send(options?: unknown): Promise<AdapterOk<"axios">> {
      return new Promise((resolve, reject) => {
         let finished = false;
         const finish = () => {
            if (finished) return;
            finished = true;
            callbacks?.onFinish?.();
         };

         axios
            .request(buildRequestConfig(options))
            .then((response: AxiosResponse<unknown>) => {
               callbacks?.onSuccess?.(response as AdapterOk<"axios">);
               resolve(response as AdapterOk<"axios">);
            })
            .catch((error: AxiosError | unknown) => {
               const axiosErr = error as AxiosError<unknown>;
               const payload =
                  axiosErr?.response?.data ?? error;

               callbacks?.onError?.(payload as AdapterError<"axios">);
               reject(payload as AdapterError<"axios">);
            })
            .finally(() => {
               finish();
            });
      });
   }

   function run(options?: unknown): Promise<AdapterOk<"axios">> {
      // "Smart" default: same as send(), so you can `await run()`.
      return send(options);
   }

   return {
      submit,
      send,
      run,
   };
};
