import { configureStore } from '@reduxjs/toolkit'

import { listenerMiddleware } from '@/boot/effects'
import App from '@/views/app'
import User from '@/views/user'
import Fund from '@/views/fund'
import Benchmark from '@/views/benchmark'
import Reports from '@/views/reports'

const store = configureStore({
  reducer: {
    [App.name]: App.reducer,
    [User.name]: User.reducer,
    [Fund.name]: Fund.reducer,
    [Benchmark.name]: Benchmark.reducer,
    [Reports.name]: Reports.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listenerMiddleware.middleware)
})

export type AppDispatch = typeof store.dispatch

export type StoreType = {
  funds: ReturnType<typeof Fund.reducer>
  app: ReturnType<typeof App.reducer>
  user: ReturnType<typeof User.reducer>
  benchmark: ReturnType<typeof Benchmark.reducer>
  report: ReturnType<typeof Reports.reducer>
}
export default store
