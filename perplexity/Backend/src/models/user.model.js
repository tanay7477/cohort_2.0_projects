import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verified: {
        type: Boolean,
        default: false
    },
},{ timestamps: true}
)

const userModel = mongoose.model('User', userSchema);

// Hash the password before saving the user
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return next();
        //Agar password change nahi hua (jaise user ne sirf apna naam update kiya), 
        // to dobara hash karne ki zaroorat nahi. 
        // Warna ek already hashed password dobara hash ho jaayega aur user kabhi login nahi kar paayega.
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default userModel;
