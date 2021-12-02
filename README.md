[![CodeQL](https://github.com/LukeStanbery89/stonks/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/LukeStanbery89/stonks/actions/workflows/codeql-analysis.yml)
[![Unit Tests CI](https://github.com/LukeStanbery89/stonks/actions/workflows/unit-tests.yml/badge.svg?branch=master)](https://github.com/LukeStanbery89/stonks/actions/workflows/unit-tests.yml)

# Node Boilerplate

A Node.js boilerplate app.

## Getting Started

After checking out this repo locally for the first time, in addition to running `npm install`, run:
```console
npm run first-time
```

This will configure git's pre-commit hooks.

## Scripts

### Development

The first time you run this code, you will need to run the following command to initialize git pre-commit hooks:
```console
npm run first-time
```

Start development server:
```console
npm run dev
```

Start server without hot reloading:
```console
npm run start
```

Start watching for changes to Typescript files:
```console
npm run ts-watch
```

### Docker

Build Docker image:
```console
npm run docker-build
```

Start Docker container:
```console
npm run docker-compose
```

### Testing
Run Jest unit tests:
```console
npm run test-unit
```

### Production

Compile Typescript files:
```console
npm run build
```
