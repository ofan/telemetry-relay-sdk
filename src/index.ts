export { VERSION } from "./version.js";

export interface RelayOptions {
  url: string;
  token: string;
}

export type DeviceType = "cli" | "ci" | "server" | "desktop" | "mobile" | "web";

export interface TrackOptions {
  properties?: Record<string, unknown>;
  deviceType?: DeviceType;
  machineId?: string;
}

export interface Relay {
  track(tool: string, event: string, version: string, options?: TrackOptions): Promise<void>;
}

export function createRelay(options: RelayOptions): Relay {
  const baseUrl = options.url.replace(/\/+$/, "");

  return {
    async track(tool, event, version, trackOptions = {}) {
      const { properties = {}, deviceType, machineId } = trackOptions;
      try {
        await fetch(`${baseUrl}/v1/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${options.token}`,
          },
          body: JSON.stringify({
            tool, event, version, properties,
            ...(deviceType && { deviceType }),
            ...(machineId && { machineId }),
          }),
        });
      } catch {
        // Fire-and-forget — swallow errors
      }
    },
  };
}
