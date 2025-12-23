import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useSelector } from '@/boot/redux'

export default function PrivateRoute ({ children }: PropsWithChildren<any>) {
  const currentUser = useSelector(state => state.user.token)
  const location = useLocation()

  if (!currentUser)
    return (
      <Navigate to={ `/login?redirect=${ encodeURIComponent(
        location.pathname + location.search
      ) }` }/>
    )

  return <>{ children }</>
}