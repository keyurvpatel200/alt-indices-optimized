import Effects from '@/boot/effects'

// eslint-disable-next-line
export interface AppState {
}

export default {
}

export function redirect () {
}

Effects.set('app/redirect', (action) => {
  window.location.href = action.payload as string
})