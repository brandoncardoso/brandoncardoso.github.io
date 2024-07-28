import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import Root from './root'
import { Home, Movies } from './pages'

import '@mantine/core/styles.css'
import './index.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Root />}>
			<Route path="/" element={<Home />} />
			<Route path="/movies" element={<Movies />} />
		</Route>
	)
)

const theme = createTheme({
	autoContrast: true,
	components: {
		NavLink: {
			styles: () => ({
				root: {
					"--nl-bg": "transparent",
					"--nl-hover": "transparent",
				}
			})
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
