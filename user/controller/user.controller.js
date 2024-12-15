const userModel = require('../models/user.model');
const bcrypt    =   require('bcrypt');
const jwt       =   require('jsonwebtoken');
const blacklisttokenModel = require('../models/blacklisttoken.model');

module.exports.register = async(req,res)=>{
       const {email, password, name, phone, address, role} = req.body;
       console.log(req.body);
    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(400).json({error: 'Email already exists'});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({email, password: hashedPassword, name, phone, address, role});
        await user.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, expires: new Date(Date.now() + 1000*60*60)});
        res.status(201).json({message: 'User registered successfully'}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Server Error'});
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel
            .findOne({ email })
            .select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete user._doc.password;

        res.cookie('token', token);

        res.send({ token, user });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.profile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}