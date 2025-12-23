import { Suspense, memo } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import routes from '@/boot/routes'

const AppContent = () => {
  return (
    <div className="lg">
      <Suspense fallback={ <div className="loader" color="primary"/> }>
        <Routes>
          { routes.map((route, idx) => {
            return (
              route.element && (
                <Route key={ idx }
                  path={ route.path }
                  exact={ route.exact }
                  name={ route.name }
                  element={ <route.element/> }/>
              )
            )
          }) }
          {/* <Route path="/" /> */ }
          <Route path="*" element={ <Outlet/> }/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default memo(AppContent)