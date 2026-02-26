export { VERSION } from "./version.js";

export type DeviceType = "cli" | "ci" | "server" | "desktop" | "mobile" | "web";

export interface RelayOptions {
  url: string;
  token: string;
  deviceType?: DeviceType;
  machineId?: string;
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
          body: JSON.stringify({
            tool, event, version, properties,
            ...(options.deviceType && { deviceType: options.deviceType }),
            ...(options.machineId && { machineId: options.machineId }),
          }),
        });
      } catch {
        // Fire-and-forget — swallow errors
      }
    },
  };
}
