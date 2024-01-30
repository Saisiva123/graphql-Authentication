import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: String
})

const User = model("user", userSchema)
export default User