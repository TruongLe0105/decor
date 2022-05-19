const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
    {
        user: { type: Schema.Types.ObjectId, require: true },
        products: [
            {
                name: { type: String, require: true },
                price: { type: Number, require: true },
                imageUrl: { type: String, require: true },
                quantity: { type: Number, default: 1, require: true },
            }
        ],
        isDeleted: { type: Boolean, default: false, select: false },
        totalPrice: { type: Number, default: 0, require: true }
    },
    { timestamps: true }
);

// cartSchema.plugin(require("./plugins/isDeletedFalse"));

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;