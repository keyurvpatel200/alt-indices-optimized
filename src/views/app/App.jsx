import { createTheme, ThemeProvider } from '@mui/material/styles'
import { IKContext } from 'imagekitio-react'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PrivateRoute from '@/components/PrivateRoute'
import ScrollToAnchor from '@/components/ScrollToAnchor'
import store from '@/service/store'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' //includes Popper

const DefaultLayout = lazy(() => import('../../layout/DefaultLayout'))
const Login = lazy(() => import('../../views/pages/login/Login'))
const Register = lazy(() => import('../../views/pages/register/Register'))
const Landing = lazy(() => import('../../views/pages/landing/Landing'))

const imagekitKey = import.meta.env.IMAGEKIT_KEY
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
})

export default function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <BrowserRouter>
          <ScrollToAnchor />
          <IKContext
            publicKey={ imagekitKey }
            urlEndpoint='https://ik.imagekit.io/altindices'
            transformationPosition='path'
          >
            <Suspense fallback={ <div className='pt-3 text-center'></div> }>
              <Routes>
                <Route
                  exact
                  path='/login'
                  name='Login Page'
                  element={ <Login /> }
                />
                <Route
                  exact
                  path='/register'
                  name='Register Page'
                  element={ <Register /> }
                />
                <Route
                  exact
                  path='/landing'
                  name='Landing Page'
                  element={ <Landing /> }
                />
                <Route path='*' name='Home' element={ <Landing /> } />
                <Route
                  path='/layout/*'
                  name='Default Layout'
                  element={
                    <PrivateRoute>
                      <DefaultLayout />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </IKContext>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}
