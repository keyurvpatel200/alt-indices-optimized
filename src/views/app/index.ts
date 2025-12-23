import Features from '@/boot/registry'
import initialState, * as reducers from './state'

export const NAME = 'app'

export default Features.set({
  model: { NAME }, initialState, reducers,
})