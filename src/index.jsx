import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './views/app/App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <SkeletonTheme baseColor="#173153" highlightColor="#2f4665">
      <App />
    </SkeletonTheme>
  </StrictMode>
)

reportWebVitals()
