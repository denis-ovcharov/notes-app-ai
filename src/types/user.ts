import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId | string;
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  userId: string;
  email: string;
  username: string;
}
