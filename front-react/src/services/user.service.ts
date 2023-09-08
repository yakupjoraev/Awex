import { object, string, boolean, number } from "yup";

const userSchema = object({
  email: string().required(),
  token: string().required(),
  expiration: number().required(),
});

const USER_KEY = "user";

export interface User {
  email: string;
  token: string;
  expiration: number;
}

export function setUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const tokenRaw = localStorage.getItem(USER_KEY);
  if (tokenRaw === null) {
    return null;
  }
  let token;
  try {
    token = JSON.parse(tokenRaw);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }

  if (userSchema.isValidSync(token)) {
    return token;
  }
  return null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}
