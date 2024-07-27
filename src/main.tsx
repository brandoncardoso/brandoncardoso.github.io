import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import App from './App.tsx'

import '@mantine/core/styles.css'
import './index.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} />
	)
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
