const User = require('../models/user');

const createUser = async (req, res) => {
    const {fullname, email, password} = req.body
    console.log(req.body);

    const isNewUser =  await User.isThisEmailInUse(email);
    if (!isNewUser) return res.json({success: false, message: 'This email is already in use, try sign-in'});
    console.log('save..... user');
    const user = await User({
        fullname, 
        email, 
        password,
    });
    console.log('save..... user');
    await user.save();
    res.json(user);
};

const userSignIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email : email});
    
    if (!user) return res.json({success: false, message: 'user not found, with the given email'});
    const isMatch = await user.comparePassword(password);
    console.log(isMatch); 
    if (!isMatch) return res.json({success: false, message: 'email / password does not match!'});

    // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.json({success: true, user})
}

module.exports = {
    createUser : createUser,
    userSignIn : userSignIn
};