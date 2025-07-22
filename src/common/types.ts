import { User } from "src/modules/users/entities/user.entity";

export interface UserJWTPayload {
  id: number;
}



declare module 'express' {
  interface Request {
    user: User; // or whatever type you return from JwtStrategy
  }
}