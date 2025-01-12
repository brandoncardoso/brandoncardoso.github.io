import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import {
	Container,
	createTheme,
	DEFAULT_THEME,
	MantineProvider,
	rem,
} from '@mantine/core'

import { Home, Movies } from './pages'

import '@mantine/core/styles.css'
import './index.css'
import Root from './root'
import './i18n'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route path="/" element={<Home />} />
			<Route path="/movies" element={<Movies />} />
		</Route>
	)
)

const CONTAINER_SIZES: Record<string, string> = {
	xxs: rem(300),
	xs: rem(400),
	sm: rem(500),
	md: rem(600),
	lg: rem(750),
	xl: rem(900),
	xxl: rem(1050),
};

const theme = createTheme({
	fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
	headings: {
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
	},
	lineHeights: {
		md: '2'
	},
	components: {
		Container: Container.extend({
			vars: (_, { size, fluid }) => ({
				root: {
					'--container-size': fluid
						? '100%'
						: size !== undefined && size in CONTAINER_SIZES
							? CONTAINER_SIZES[size]
							: rem(size)
				}
			})
		})
	},
	colors: {
		dark: [
			'#f2f2f2', // used for text color on dark colorscheme, but default is too dark/low-contrast
			DEFAULT_THEME.colors.dark[1],
			DEFAULT_THEME.colors.dark[2],
			DEFAULT_THEME.colors.dark[3],
			DEFAULT_THEME.colors.dark[4],
			DEFAULT_THEME.colors.dark[5],
			DEFAULT_THEME.colors.dark[6],
			DEFAULT_THEME.colors.dark[7],
			DEFAULT_THEME.colors.dark[8],
			DEFAULT_THEME.colors.dark[9],
		]
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider theme={theme} defaultColorScheme="auto">
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
