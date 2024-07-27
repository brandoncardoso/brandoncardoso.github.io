import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
