import { v4 as uuid } from "uuid";
import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  uuid: string; 
  username: string;
  password: string;

  constructor({ username, password }: Omit<UserEntity, "uuid" >) {
    this.uuid = uuid();
    this.username = username;
    this.password = password;
  }
}