import React, { JSXElementConstructor } from 'react'
import { Redirect, Route } from 'react-router-dom'

type Props = {
  path: string
  fallback: string
  condition: boolean
  component: JSXElementConstructor<any>
}

export const ProtectedRoute = ({
  path,
  fallback,
  condition,
  component,
}: Props) => {
  const Item = component
  return (
    <Route path={path}>
      {condition ? <Item /> : <Redirect to={fallback} />}
    </Route>
  )
}
