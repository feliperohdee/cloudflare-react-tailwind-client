# Cloudflare Worker Starter

A starter template for building Cloudflare Workers with TypeScript, testing support, and modern development tools.

## Features

- 🚀 TypeScript support with strict type checking
- ⚡️ Fast development with hot reload
- 🧪 Testing setup with Vitest
- 🎨 Code formatting with Prettier
- 🛠️ Environment variable support
- 📝 Type generation for Cloudflare Workers

## Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- Yarn (recommended) or npm
- A Cloudflare account

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cloudflare-worker-starter.git
cd cloudflare-worker-starter
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

## Available Commands

### Development

- `yarn dev` - Start the development server with hot reload
- `yarn start` - Alias for `yarn dev`

### Deployment

- `yarn deploy` - Deploy your worker to Cloudflare

### Testing

- `yarn test` - Run tests using Vitest

### Code Quality

- `yarn lint` - Format code using Prettier

### Type Generation

- `yarn cf-typegen` - Generate TypeScript types for Cloudflare Workers

## Project Structure

```
├── src/
│   └── index.ts         # Main worker entry point
├── tests/
│   └── index.spec.ts    # Test files
├── .dev.vars            # Local development environment variables
├── wrangler.jsonc        # Cloudflare Workers configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Environment Variables

- Development environment variables can be set in `.dev.vars`
- Production variables are configured in `wrangler.jsonc` or through the Cloudflare dashboard

Example `.dev.vars`:

```
PRODUCTION=false
```

## Testing

This project uses Vitest for testing. Tests can be written in TypeScript and are located in the `test` directory.

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

describe('Worker', () => {
	it('responds with Hello World!', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toBe('Hello World!');
	});
});
```

## TypeScript Configuration

The project includes two TypeScript configuration files:

- `tsconfig.json` - Main TypeScript configuration
- `tests/tsconfig.json` - Test-specific TypeScript configuration

## Deployment

Before deploying, make sure you have:

1. A Cloudflare account
2. Wrangler CLI authenticated with your account

Then deploy using:

```bash
yarn deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
