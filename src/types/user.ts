import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId | string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  userId: string;
  username: string;
}
