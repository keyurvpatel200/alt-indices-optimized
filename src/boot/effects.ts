import {
  createListenerMiddleware,
  TypedStartListening,
  ListenerEffectAPI, UnknownAction,
} from '@reduxjs/toolkit'

import RootState from '@/service/RootState'
import { AppDispatch } from '@/service/store'

export const listenerMiddleware = createListenerMiddleware()
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export const startAppListening = listenerMiddleware.startListening as AppStartListening

class Effects {

  set (type: string, effect: (action: UnknownAction, api: ListenerEffectAPI<RootState, AppDispatch>) => void | Promise<void>) {
    startAppListening({
      type,
      effect
    })
  }
}

export default new Effects()