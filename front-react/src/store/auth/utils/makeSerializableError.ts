import { SerializedError } from "@reduxjs/toolkit";

export function makeSerializedError(
  error: Error,
  extra?: SerializedError
): SerializedError {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    code: undefined,
    ...extra,
  };
}
