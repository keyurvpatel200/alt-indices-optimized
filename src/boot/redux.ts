import { TypedUseSelectorHook, useDispatch as dispatch, useSelector as selector } from 'react-redux'

import RootState from '@/service/RootState'
import { AppDispatch } from '@/service/store'

export const useDispatch = () => dispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selector