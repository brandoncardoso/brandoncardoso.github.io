import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'

import { Home, Movies } from './pages'
import Root from './root'

import './i18n'

import '@radix-ui/themes/styles.css'
import './index.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route path="/" element={<Home />} />
			<Route path="/movies" element={<Movies />} />
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" defaultTheme='dark'>
			<Theme accentColor='grass' radius='small' scaling='90%'>
				<RouterProvider router={router} />
			</Theme>
		</ThemeProvider>
	</React.StrictMode>,
)
