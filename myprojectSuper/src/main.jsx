import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  
    <ContextProvider>
      <StrictMode>
          <App />
       </StrictMode>
    </ContextProvider>

)
