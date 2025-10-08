import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import { ConfigProvider, theme as antdTheme } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#7c3aed', // QuizCraft brand vibe (purple)
            colorInfo: '#2563eb',
            colorSuccess: '#22c55e',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            borderRadius: 8,
            fontSize: 14,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
