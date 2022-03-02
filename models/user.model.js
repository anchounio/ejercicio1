import mongoose from 'mongoose';

export function userCreator(modelName = 'users') {
    const userSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        passwd: { type: String, required: true },
        items: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'items',
            },
        ],
    });

    userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
            delete returnedObject.passwd;
        },
    });

    let User;
    if (mongoose.default.models[modelName]) {
        User = mongoose.model(modelName);
    } else {
        User = mongoose.model(modelName, userSchema);
    }
    return User;
}
