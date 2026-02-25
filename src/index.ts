export { VERSION } from "./version.js";

export interface RelayOptions {
  url: string;
  token: string;
}

export interface Relay {
  track(tool: string, event: string, version: string, properties?: Record<string, unknown>): Promise<void>;
}

export function createRelay(options: RelayOptions): Relay {
  const baseUrl = options.url.replace(/\/+$/, "");

  return {
    async track(tool, event, version, properties = {}) {
      try {
        await fetch(`${baseUrl}/v1/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${options.token}`,
          },
          body: JSON.stringify({ tool, event, version, properties }),
        });
      } catch {
        // Fire-and-forget — swallow errors
      }
    },
  };
}
