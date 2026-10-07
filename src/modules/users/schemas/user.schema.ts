import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";
import { Role } from "../../../common/enums/role.enum";

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.hashedRefreshToken;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop({ type: String, default: null })
  hashedRefreshToken?: string;

  @Prop({ type: String, default: null })
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Exclude deleted documents by default for find queries
UserSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

UserSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});
