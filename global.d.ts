declare const __: (key: string, args?: Record<string | number>) => string;

declare module 'cloudflare:test' {
	interface ProvidedEnv extends Env {}
}
