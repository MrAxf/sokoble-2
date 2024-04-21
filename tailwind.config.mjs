import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'background': 'oklch(var(--background))',
				'background-alt': 'var(--background-alt)',
				'foreground': 'oklch(var(--foreground))',

				'muted': 'oklch(var(--muted))',
				'muted-hover': 'var(--muted-hover)',
				'muted-active': 'var(--muted-active)',
				'muted-foreground': 'oklch(var(--muted-foreground))',

				'player': 'oklch(var(--player))',
				'player-clear': 'var(--player-clear)',
				'player-dark': 'var(--player-dark)',

				'box': 'oklch(var(--box))',
				'box-clear': 'var(--box-clear)',
				'box-dark': 'var(--box-dark)',

				'success': 'oklch(var(--success))',
				'success-clear': 'var(--success-clear)',
				'success-dark': 'var(--success-dark)',
			},
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections(['heroicons']),
		}),
	],
}
