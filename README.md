[![CodeQL](https://github.com/LukeStanbery89/stonks/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/LukeStanbery89/stonks/actions/workflows/codeql-analysis.yml)
[![Unit Tests CI](https://github.com/LukeStanbery89/stonks/actions/workflows/unit-tests.yml/badge.svg?branch=master)](https://github.com/LukeStanbery89/stonks/actions/workflows/unit-tests.yml)

# Stonks

A day trading/swing trading Node.js application.

## Getting Started

After checking out this repo locally for the first time, run:
```console
npm install
```

The first time you run this code, you will need to run the following command to initialize git pre-push hooks:
```console
npm run first-time
```

## Scripts

### Development

Build webpack bundle:
```console
npm run build-dev
```

Start server without hot reloading:
```console
npm run start-dev
```

**Note:** There is no hot reloading option at this point, but [contributions are welcome](https://github.com/LukeStanbery89/stonks/issues/50). :)

### Docker

Build Docker image:
```console
npm run docker-build-dev
```

Start Docker container:
```console
npm run docker-compose
```

### Unit Testing
Run Jest unit tests:
```console
npm run test-unit
```

### Production

Compile JS files:
```console
npm run build
```

Build Docker image:
```console
npm run docker-build
```

Start web server:
```console
npm run start
```
