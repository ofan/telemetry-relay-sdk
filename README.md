# telemetry-relay-sdk

Lightweight client SDK for [telemetry-relay](https://github.com/ofan/telemetry-relay). Fire-and-forget telemetry from any JS/TS runtime.

## Install

```bash
npm install @ofan/telemetry-relay-sdk
```

## Usage

```ts
import { createRelay } from "@ofan/telemetry-relay-sdk";

const relay = createRelay({
  url: "https://your-relay.workers.dev",
  token: "your-relay-token",
});

// Track an event
await relay.track("my-cli", "command_run", "1.0.0", {
  command: "build",
  duration_ms: 120,
});

// Properties are optional
await relay.track("my-cli", "started", "1.0.0");
```

## API

### `createRelay(options)`

Returns a `Relay` instance.

| Option | Type | Description |
|--------|------|-------------|
| `url` | `string` | Your telemetry-relay Worker URL |
| `token` | `string` | Bearer token for authentication |

### `relay.track(tool, event, version, properties?)`

Sends a single event to the relay. Returns `Promise<void>`.

| Param | Type | Description |
|-------|------|-------------|
| `tool` | `string` | Your tool/project name (e.g. `"my-cli"`) |
| `event` | `string` | Event name (e.g. `"command_run"`) |
| `version` | `string` | Your tool's version (e.g. `"1.2.0"`) |
| `properties` | `Record<string, unknown>` | Optional event metadata |

## Behavior

- **Fire-and-forget** — network errors are silently swallowed. Telemetry should never break your app.
- **No batching** — each `track()` call sends one HTTP request immediately.
- **No dependencies** — uses the global `fetch` API.
- **Universal** — works in Node.js 18+, Bun, Deno, and browsers.

## Example: CLI tool

```ts
import { createRelay } from "@ofan/telemetry-relay-sdk";

const relay = createRelay({
  url: process.env.TELEMETRY_URL!,
  token: process.env.TELEMETRY_TOKEN!,
});

// Track on startup
relay.track("my-cli", "started", version);

// Track commands
relay.track("my-cli", "command_run", version, {
  command: process.argv[2],
  flags: process.argv.slice(3),
});

// Track errors
process.on("uncaughtException", (err) => {
  relay.track("my-cli", "error", version, {
    message: err.message,
  });
});
```

## License

MIT
