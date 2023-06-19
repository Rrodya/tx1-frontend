export enum UserRole {
  DRIVER="DRIVER",
  PASSENGER="PASSENGER",
  USER="USER",
  ADMIN="ADMIN",
}

export const PORT = "3030";
export const HOST = "127.0.0.1";


export enum Errors {
  AUTH_LOGIN="wrong login",
  AUTH_TOKEN="authentication failed",
  NO_RIGHTS="you don't have rights",
  INCORRECT_AUTH_LOGIN="incorrect role",
}

