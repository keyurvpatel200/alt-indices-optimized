import Effects from '@/boot/effects'
import axios from '@/service/axios'

export interface UserState {
  token: undefined | string
}

export default {
  token: localStorage.getItem('token'),
}

export function onLogin (state: UserState, { payload }: { payload: string }) {
  state.token = payload
}

Effects.set('user/onLogin', (action, api) => {
  const token = api.getState().user.token
  axios.defaults.headers.Authorization = `Token ${ token }`
  localStorage.setItem('token', token as string)

  const urlParams = new URLSearchParams(window.location.search)
  const redirectUrl = urlParams.get('redirect') || '/layout/dashboard'
  api.dispatch({ type: 'app/redirect', payload: redirectUrl })
})