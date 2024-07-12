import mongoose from "mongoose";

const vanSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        imageURL: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        hostId: {
            type: String,
            required: true,
        },

    }, {timestamps: true}

);

const Van = mongoose.model('Van', vanSchema);

export default Van;
