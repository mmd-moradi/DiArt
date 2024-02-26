import { Document, Model, Schema, model, models } from "mongoose";

export interface DArt extends Document {
  name: string;
  nCopies: number;
  uuid: string;
  description: string;
  owner: Schema.Types.ObjectId;
  ownerUsername: string;
  imageUrl: string;
  price: number;
  featured: boolean;
  price_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const dArtSchema = new Schema<DArt>(
  {
    name: { type: String, required: true },
    nCopies: { type: Number, required: true },
    description: { type: String, required: true },
    uuid: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ownerUsername: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price_id: { type: String },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const DArtModel = models.DArt || model<DArt>("DArt", dArtSchema);
export default DArtModel as Model<DArt>;
