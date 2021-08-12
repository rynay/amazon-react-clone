type TUser = {
  uid: string
}

type TCartItem = {
  id: number
  price: number
  img: string
  title: string
  count?: number
  total?: number
}

type TNotification = {
  message: string
  id: number
  img?: string
}

type TError = string
type TPath = string
