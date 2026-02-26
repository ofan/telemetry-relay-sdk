import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRelay } from "../src/index";

describe("createRelay", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an object with a track method", () => {
    const relay = createRelay({ url: "https://relay.example.com", token: "abc" });
    expect(typeof relay.track).toBe("function");
  });

  it("posts event to the relay URL with bearer auth", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "uuid-123" }), { status: 202 }),
    );

    const relay = createRelay({ url: "https://relay.example.com", token: "abc" });
    await relay.track("my-cli", "command_run", "1.0.0", { command: "build" });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://relay.example.com/v1/events");
    expect((init as RequestInit).method).toBe("POST");
    expect((init as RequestInit).headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer abc",
    });

    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.tool).toBe("my-cli");
    expect(body.event).toBe("command_run");
    expect(body.version).toBe("1.0.0");
    expect(body.properties.command).toBe("build");
  });

  it("sends empty properties when none provided", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "uuid-123" }), { status: 202 }),
    );

    const relay = createRelay({ url: "https://relay.example.com", token: "abc" });
    await relay.track("my-cli", "started", "1.0.0");

    const body = JSON.parse(
      (vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body.properties).toEqual({});
  });

  it("sends deviceType and machineId from relay options", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "uuid-123" }), { status: 202 }),
    );

    const relay = createRelay({
      url: "https://relay.example.com",
      token: "abc",
      deviceType: "cli",
      machineId: "abc123",
    });
    await relay.track("my-cli", "evt", "1.0.0", { os: "linux" });

    const body = JSON.parse(
      (vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body.deviceType).toBe("cli");
    expect(body.machineId).toBe("abc123");
    expect(body.properties.os).toBe("linux");
  });

  it("strips trailing slash from URL", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "uuid-123" }), { status: 202 }),
    );

    const relay = createRelay({ url: "https://relay.example.com/", token: "abc" });
    await relay.track("my-cli", "evt", "1.0.0");

    const [url] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("https://relay.example.com/v1/events");
  });

  it("swallows errors and does not throw", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));

    const relay = createRelay({ url: "https://relay.example.com", token: "abc" });
    // Should not throw
    await relay.track("my-cli", "evt", "1.0.0");
  });
});
