import Features from '@/boot/registry'
import initialState, * as reducers from './state'

export const NAME = 'user'

export default Features.set({
  model: { NAME }, initialState, reducers,
})