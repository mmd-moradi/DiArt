import { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
export interface User extends Document {
  name?: string;
  userName: string;
  email: string;
  password: string;
  createdArts?: string[];
  purchasedArts?: string[];
  profileImage?: string;
  bannerImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<User, {}, Methods>(
  {
    name: { type: String, required: false, trim: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    bannerImage: { type: String, required: false },
    createdArts: [{ type: String, ref: "DArt", default: uuidv4 }],
    purchasedArts: [{ type: String, ref: "DArt", default: uuidv4 }],
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model<User>("User", userSchema);

export default UserModel as Model<User, {}, Methods>;
