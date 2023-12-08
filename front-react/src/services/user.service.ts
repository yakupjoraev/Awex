import { AuthenticatedService } from "@awex-api"
import { object, string, number } from "yup"

const userSchema = object({
  email: string().required(),
  token: string().required(),
  expiration: number().required(),
})

const USER_KEY = "user"

export interface User {
  sessionId: number
  email: string
  token: string
  expiration: number
}

export type LoginStatus = 'Ok' | 'Error' | 'Not authorized'

export function setUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser(): User | null {
  const userRaw = localStorage.getItem(USER_KEY)

  if (userRaw === null) return null
  let user: User

  try {
    user = JSON.parse(userRaw)
  } catch (error) {
    if (error instanceof SyntaxError) return null
    throw error
  }

  if (userSchema.isValidSync(user)) {
    if((user.expiration * 1000) <= Date.now()) {
      removeUser()
      return null
    }
    return user
  }
  return null
}

export function removeUser() {
  localStorage.removeItem(USER_KEY)
}

export async function checkUser(): Promise<LoginStatus> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AuthenticatedService.ipGet() /// <<<--- There need another method
      if(!response) {
        resolve('Error')
      }
      resolve('Ok')
    } catch(error: any) {
      if(error.status === 403) {
        removeUser()
        resolve('Not authorized')
      }
      resolve('Error')
    }
  })
}

export async function logOut(): Promise<boolean> {
  let user: User | null = getUser()

  if(!user) return false
  let id: string = user.sessionId.toString()

  try {
    const rezult = await AuthenticatedService.sessionDelete(id)
    if(rezult) return true
    return false
  } catch(error) {
    console.error(error)
    return false
  }
}