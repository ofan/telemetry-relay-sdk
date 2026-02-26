# Changelog

## [0.3.0](https://github.com/ofan/telemetry-relay-sdk/compare/v0.2.1...v0.3.0) (2026-02-26)


### ⚠ BREAKING CHANGES

* deviceType and machineId are now set once on createRelay() instead of per-track. track() 4th argument reverts to plain properties object.
* track() 4th argument changed from properties object to TrackOptions { properties?, deviceType?, machineId? }. Clients must wrap properties in the options object.

### Features

* add deviceType and machineId to track options ([5a3cc26](https://github.com/ofan/telemetry-relay-sdk/commit/5a3cc269de7bb59601022ae734fbda563f3d2ef2))
* auto-detect and forward browser User-Agent ([1545b61](https://github.com/ofan/telemetry-relay-sdk/commit/1545b61e2b6303a0eb66372c1b7bbd7ec5a148ea))
* move deviceType and machineId to createRelay options ([d305e16](https://github.com/ofan/telemetry-relay-sdk/commit/d305e16fdf5d1b8f3995c5d4e0f1088bb4be9f43))


### Bug Fixes

* disable component prefix in release tags ([6ce4d1a](https://github.com/ofan/telemetry-relay-sdk/commit/6ce4d1a98d25354e65e6a892607d1fc3bcb12e72))


### Reverts

* remove userAgent from SDK ([087dbe0](https://github.com/ofan/telemetry-relay-sdk/commit/087dbe05700e27c9ec6e480758547fd4cf2c9a3c))
* restore original SDK API ([aacf0f5](https://github.com/ofan/telemetry-relay-sdk/commit/aacf0f5f90163ffb8c786f3ee9f47713245a70cc))

## [0.2.1](https://github.com/ofan/telemetry-relay-sdk/compare/telemetry-relay-sdk-v0.2.0...telemetry-relay-sdk-v0.2.1) (2026-02-25)


### Bug Fixes

* remove NPM_TOKEN — use OIDC trusted publishing for auth ([42cb644](https://github.com/ofan/telemetry-relay-sdk/commit/42cb644c3008ea5ec1831d68b227261906e28821))

## [0.2.0](https://github.com/ofan/telemetry-relay/compare/telemetry-relay-sdk-v0.1.0...telemetry-relay-sdk-v0.2.0) (2026-02-25)


### Features

* add telemetry-relay-sdk client package ([b4159d3](https://github.com/ofan/telemetry-relay/commit/b4159d3e3a2f6fa6ded8ea3506973319dc51cdb0))
* add version generation script for SDK builds ([8f058c6](https://github.com/ofan/telemetry-relay/commit/8f058c6218b0c94a5958fba73ed3268184bbe7f8))
* scope SDK as @ofan/telemetry-relay-sdk for npm publishing ([3d11416](https://github.com/ofan/telemetry-relay/commit/3d11416b659ac6d1592ee258eae3b642d9fce5f6))
