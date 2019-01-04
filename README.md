# Hapi + Wreck + ApplicationInsights

## Prerequisites

- `npm` or `Yarn` installed and configured

The following command will be describe with `yarn`

## Issues

It's seems the combination of ApplicationInsights + Wreck on a Hapi server have some waste of time on test unit purpose.

I expect my unit test take a bit more time for the `flush` operation from application insight client.

But wait a minute, it's quite too long. Some others application develop in .Net Core doesn't have this issues.

## Step to reproduce

To reproduce, follow the following command

```bash
yarn install
<...>

yarn test

yarn run v1.12.3
warning package.json: No license field
$ mocha --timeout=3000


  Repro
    √ Without starting server (925ms)
Server started
    √ With starting server (785ms)
Server stopped


  2 passing (2s)

Done in 63.81s.
```

## Different combination

|                                                     | Wreck Request | Without Wreck request |
|-----------------------------------------------------|:-------------:|:---------------------:|
| ApplicationInsights with `real instrumentation key` | 63.81s        | 1.06s                 |
| ApplicationInsights with `ikey`                     | 2.47s         | 1.08s                 |

- ApplicationInsights with `ikey`: set at the line 10 the instrumentation key value `ikey`
- ApplicationInsights with `real instrumentation key`: set at the line 10 the real instrumentation key value `42ee94e1-d6c9-4cf0-a4ec-171c79a6aa2f`
- Without Wreck request: commented the line `const { payload } = await Wreck.get('https://github.com/hapijs');` (line 37 in file `foo.js`)

### Hapi + ApplicationInsights with `real instrumentation key` + Wreck request

```bash
yarn run v1.12.3
warning package.json: No license field
$ mocha --timeout=3000


  Repro
    √ Without starting server (925ms)
Server started
    √ With starting server (785ms)
Server stopped


  2 passing (2s)

Done in 63.81s.
```

### Hapi + ApplicationInsights with `ikey` + Wreck request

```bash
yarn run v1.12.3
warning package.json: No license field
$ mocha --timeout=3000


  Repro
    √ Without starting server (838ms)
Server started
    √ With starting server (635ms)
Server stopped


  2 passing (2s)

Done in 2.47s.
```

### Hapi + ApplicationInsights with `real instrumentation key` + without Wreck request

```bash
yarn run v1.12.3
warning package.json: No license field
$ mocha --timeout=3000


  Repro
    √ Without starting server (66ms)
Server started
    √ With starting server
Server stopped


  2 passing (120ms)

Done in 1.06s.
```

### Hapi + ApplicationInsights with `ikey` + without Wreck request

```bash
yarn run v1.12.3
warning package.json: No license field
$ mocha --timeout=3000


  Repro
    √ Without starting server (67ms)
Server started
    √ With starting server
Server stopped


  2 passing (120ms)

Done in 1.08s.                           
```
