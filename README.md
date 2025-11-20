# Vite Starter with Cloudflare Workers, React, Tailwind & RPC

A modern full-stack starter template for building web applications with Cloudflare Workers, React, Tailwind CSS, and type-safe RPC communication.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Features

- 🚀 **Full-Stack Development**: Seamless integration between frontend and backend
- ⚡ **Vite + React**: Lightning-fast HMR with React 19 and TypeScript
- 💅 **Tailwind CSS + shadcn/ui**: Beautiful, customizable UI components
- 🔄 **Type-Safe RPC**: End-to-end type safety with automatic code generation
- 🌐 **Edge Computing**: Deploy globally with Cloudflare Workers
- 🛠️ **Modern Dev Tools**: ESLint, Prettier, and testing with Vitest

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Fast development environment
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible UI components built with Radix UI and Tailwind
- **TypeScript** - Type safety and developer experience
- **React Hooks** - Custom hooks for RPC communication
- **Lucide React** - Beautiful, consistent icons
- **use-toastr** - Toast notifications

### Backend

- **Cloudflare Workers** - Serverless edge runtime
- **Type-safe RPC** - End-to-end type safety between frontend and worker
- **TypeScript** - Strongly-typed API endpoints

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://yarnpkg.com/) or npm
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)

### Quick Start

1. Clone the repository:

```bash
git clone https://github.com/feliperohdee/cloudflare-react-tailwind-client.git my-project
cd my-project
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

This will start the Vite development server at http://localhost:3000 with hot module replacement for real-time updates.

## Project Structure

```
├── app/                  # React frontend application
│   ├── components/       # React components
│   │   └── ui/           # shadcn/ui components
│   ├── pages/            # Page components
│   └── styles/           # Global styles
│
├── worker/               # Cloudflare Worker code
│   └── rpc/              # RPC implementation
│
├── public/               # Static files
├── wrangler.toml         # Cloudflare Workers configuration
└── package.json          # Project dependencies and scripts
```

## Available Commands

### Development

- `yarn dev` - Start the development server
- `yarn build` - Build the project for production
- `yarn preview` - Preview the production build locally

### Deployment

- `yarn deploy` - Build and deploy to Cloudflare Workers

### Code Quality

- `yarn lint` - Run ESLint to check code quality
- `yarn test` - Run tests using Vitest testing framework
- `yarn cf-typegen` - Generate TypeScript types for Cloudflare Workers

### UI Components

- `yarn add-component [name]` - Install and configure shadcn/ui components

## Adding UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. You can add new components using:

```bash
yarn add-component button
```

Available components include: button, card, dialog, dropdown-menu, input, label, select, and many more from the shadcn/ui collection.

## RPC Communication

This starter uses type-safe RPC for communication between the frontend and the Worker:

```typescript
// Frontend (React component)
const { resource, rpc } = useRpc();
const { data, fetch, loading, setData } = resource('hello', {
	message: 'Cloudflare'
});

// Worker RPC Implementation
class Rpc {
	async hello({ message }: { message: string }) {
		return { message: `Hello, ${message}!` };
	}
}
```

Key benefits:

- Full type safety between frontend and backend
- Automatic code generation
- Simple, intuitive API with React hooks

## Deployment

1. Build your application:

```bash
yarn build
```

2. Deploy to Cloudflare Workers:

```bash
yarn deploy
```

## Documentation & Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Full Project Documentation](https://github.com/feliperohdee/cloudflare-react-tailwind-client/blob/main/README.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Felipe Rohde](mailto:feliperohdee@gmail.com)

## Author

**Felipe Rohde**

- Twitter: [@felipe_rohde](https://twitter.com/felipe_rohde)
- Github: [@feliperohdee](https://github.com/feliperohdee)
- Email: feliperohdee@gmail.com
