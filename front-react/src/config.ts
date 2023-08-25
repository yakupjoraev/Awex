if (typeof process.env.REACT_APP_JWT_KEY !== "string") {
  throw new Error("REACT_APP_JWT_KEY: string requed");
}
export const JWT_KEY: string = process.env.REACT_APP_JWT_KEY;
