const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user", },
    fullName: { type: String },
    address: { type: String },
    avatarUrl: { type: String },
    numberOfPhone: { type: Number },
    isDeleted: { type: Boolean, default: false, select: false }
},
    { timestamps: true },
)

userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.isDeleted;
    return obj;
}

userSchema.methods.generateToken = function () {
    const accessToken = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return accessToken;
}

// userSchema.plugin(require("./plugins/isDeletedFalse"));

const User = mongoose.model("Users", userSchema);
module.exports = User;