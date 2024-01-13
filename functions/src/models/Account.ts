import { ObjectId } from "mongodb";

// This is the model that holds user information (everything that is specific to a user will have to be under this model)
export default interface Account {
  _id?: ObjectId;
  uid?: string;
  name?: string;
  displayName: string;
  email: string;
  photoURL?: string;
}
