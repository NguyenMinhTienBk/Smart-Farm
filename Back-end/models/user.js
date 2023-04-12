const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: Buffer
    }

});

userSchema.pre('save', function (next) {//cơ chế hash code
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8,  (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function (password) { // so sánh passwords vì theo cơ chế hashcode
    if (!password) throw new Error('Password is mission, can not compare password!')
    try {
        const result = await bcrypt.compare(password, this.password)
        return result; 
    } catch (error) {
        console.log("Error while comparing password! ", error.message);
    }
}

userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({ email });
        if (user) return false;
        return true;
    } catch (error) {
        console.log('err inside isThisEmailInUse method ', error.message);
        return false;
    }

}

module.exports = mongoose.model('User', userSchema);

