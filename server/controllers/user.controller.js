const User = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const user = await User.find();
    res.json(user);
};

userCtrl.createUser = async (req,res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: 'User '+user.name+' saved'
    });
};

userCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile:  req.body.mobile,
        userType: req.body.userType/*,
        project: req.body.project*/
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json({
        status: 'User '+user.name+' Updated'
    });
};

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params
    const { name } = await User.findById(id);
    await User.findByIdAndRemove(id);
    res.json({
        status: 'User '+name+' Deleted'
    });
};

module.exports = userCtrl;