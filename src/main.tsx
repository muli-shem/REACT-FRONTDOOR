import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {store} from './redux/store.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" 
        toastOptions={{
          duration: 4000,
          style : {
            background: '#fff',
            color: '#333',
            border: '1 px solid #ddd'
          },
          success:{
            iconTheme :{
                primary: '#D4A017',
                secondary: '#fff',       
            },
          },
          error:{
            iconTheme: {
              primary: '#D4A017',
              secondary: '#fff',
            },
          },
        }} 
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
