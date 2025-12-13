# Vite Starter with Cloudflare Workers, React, Tailwind, Drizzle ORM & D1

A modern full-stack starter template for building web applications with Cloudflare Workers, React, Tailwind CSS, Drizzle ORM, Cloudflare D1 database, and type-safe RPC communication.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-792EE5?style=for-the-badge&logo=drizzle&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Features

- 🚀 **Full-Stack Development**: Seamless integration between frontend and backend
- ⚡ **Vite + React**: Lightning-fast HMR with React 19 and TypeScript
- 💅 **Tailwind CSS + shadcn/ui**: Beautiful, customizable UI components
- 🔄 **Type-Safe RPC**: End-to-end type safety with automatic code generation
- 🌐 **Edge Computing**: Deploy globally with Cloudflare Workers
- 🗄️ **Drizzle ORM + D1**: Type-safe database operations with Cloudflare D1
- 🌍 **i18n Support**: Built-in internationalization
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
- **Cloudflare D1** - Edge SQLite database
- **Drizzle ORM** - Type-safe SQL toolkit with TypeScript
- **Type-safe RPC** - End-to-end type safety between frontend and worker
- **TypeScript** - Strongly-typed API endpoints

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://yarnpkg.com/) or npm
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (installed via dependencies)

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

3. Create a D1 database (if you haven't already):

```bash
yarn db:create
```

This will create a new D1 database and output its configuration. Update `wrangler.jsonc` with the `database_id` if needed.

4. Run database migrations:

```bash
# For local development
yarn db:migrate:local

# For remote/production
yarn db:migrate
```

5. Seed the database (optional):

```bash
# For local development
yarn db:seed:local

# For remote/production
yarn db:seed
```

6. Start the development server:

```bash
yarn dev
```

This will start the Vite development server at http://localhost:3000 with hot module replacement for real-time updates.

## Project Structure

```
├── app/                      # React frontend application
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── footer.tsx       # Footer component
│   │   ├── hero.tsx         # Hero section component
│   │   └── nav.tsx          # Navigation component
│   ├── hooks/               # Custom React hooks
│   │   └── use-i18n.ts      # Internationalization hook
│   ├── libs/                # Utility functions
│   │   ├── cookies.ts       # Cookie utilities
│   │   └── utils.ts         # General utilities
│   ├── pages/               # Page components
│   │   ├── home.tsx         # Home page
│   │   ├── not-found.tsx    # 404 page
│   │   └── rpc.tsx          # RPC example page
│   ├── index.css            # Global styles
│   ├── index.tsx            # Application entry point
│   ├── router.tsx           # Client-side routing
│   └── tailwind.css         # Tailwind CSS configuration
│
├── worker/                  # Cloudflare Worker backend
│   ├── context.ts           # Worker context utilities
│   ├── index.ts             # Worker entry point and request handler
│   ├── index.spec.ts        # Worker tests
│   └── rpc.ts               # RPC implementation and handlers
│
├── db/                      # Database configuration
│   ├── migrations/          # Drizzle migration files
│   │   ├── meta/            # Migration metadata
│   │   └── *.sql            # SQL migration files
│   ├── schema.ts            # Drizzle schema definitions
│   └── seed.ts              # Database seeding script
│
├── i18n/                    # Internationalization
│   ├── en-us.json           # English translations
│   ├── es-es.json           # Spanish translations
│   ├── pt-br.json           # Portuguese translations
│   ├── index.ts             # i18n exports
│   └── loader.ts            # Translation loader
│
├── public/                  # Static files served by the worker
│   └── images/              # Public images
│
├── drizzle.config.ts        # Drizzle config for remote D1
├── drizzle.config.local.ts  # Drizzle config for local D1
├── wrangler.jsonc           # Cloudflare Workers configuration
├── wrangler.test.jsonc      # Test environment configuration
└── package.json             # Project dependencies and scripts
```

## Available Commands

### Development

- `yarn dev` - Start the development server with local D1 database
- `yarn build` - Build the project for production
- `yarn preview` - Preview the production build locally

### Deployment

- `yarn deploy` - Build and deploy to Cloudflare Workers

### Database Management

#### Local Development

- `yarn db:migrate:local` - Apply migrations to local D1 database
- `yarn db:migrate:list:local` - List applied migrations in local database
- `yarn db:seed:local` - Seed the local database with initial data
- `yarn db:studio:local` - Open Drizzle Studio for local database
- `yarn db:backup:local` - Export local database backup

#### Remote/Production

- `yarn db:create` - Create a new D1 database
- `yarn db:list` - List all D1 databases
- `yarn db:info` - Show database information
- `yarn db:migrate` - Apply migrations to remote D1 database
- `yarn db:migrate:list` - List applied migrations in remote database
- `yarn db:seed` - Seed the remote database with initial data
- `yarn db:studio` - Open Drizzle Studio for remote database
- `yarn db:backup` - Export remote database backup
- `yarn db:generate` - Generate new migration files from schema changes

### Code Quality

- `yarn lint` - Run ESLint and Prettier to check and fix code quality
- `yarn test` - Run tests using Vitest testing framework
- `yarn test:watch` - Run tests in watch mode
- `yarn cf-typegen` - Generate TypeScript types for Cloudflare Workers

### UI Components

- `yarn add-component [name]` - Install and configure shadcn/ui components

### Monitoring

- `yarn logs` - Tail Cloudflare Worker logs in real-time

## Database Setup

### Using Drizzle ORM with Cloudflare D1

This project uses [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations with Cloudflare D1.

#### Schema Definition

Define your database schema in `db/schema.ts`:

```typescript
import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		id: text('id').primaryKey(),
		email: text('email').notNull().unique(),
		namespace: text('namespace').notNull(),
		passwordHash: text('password_hash').notNull()
	},
	table => [
		index('users_namespace_email_idx').on(table.namespace, table.email)
	]
);
```

#### Generating Migrations

After modifying your schema, generate a migration:

```bash
yarn db:generate
```

This will create SQL migration files in `db/migrations/`.

#### Applying Migrations

Apply migrations to your database:

```bash
# Local development
yarn db:migrate:local

# Remote/production
yarn db:migrate
```

#### Seeding the Database

Seed your database with initial data using the script in `db/seed.ts`:

```bash
# Local development
yarn db:seed:local

# Remote/production
yarn db:seed
```

#### Database Studio

Explore and manage your database visually using Drizzle Studio:

```bash
# Local development
yarn db:studio:local

# Remote/production
yarn db:studio
```

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

## Environment Variables

For database operations, you may need to set environment variables:

- `ACCOUNT_ID` - Your Cloudflare account ID (for remote D1 operations)
- `API_TOKEN` - Cloudflare API token with D1 permissions

Create a `.env` file in the root directory:

```env
ACCOUNT_ID=your_account_id
API_TOKEN=your_api_token
```

## Deployment

1. Build your application:

```bash
yarn build
```

2. Deploy to Cloudflare Workers:

```bash
yarn deploy
```

The deployment process will:

- Build your React frontend
- Bundle your Worker code
- Apply database migrations to the remote D1 database
- Deploy everything to Cloudflare Workers

## Testing

Run tests using Vitest:

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch
```

## Documentation & Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
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
