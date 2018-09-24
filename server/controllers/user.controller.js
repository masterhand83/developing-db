const User = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.find().populate("projects").exec();
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
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.findById(id).populate("projects").exec();
    res.json(user);
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile:  req.body.mobile,
        userType: req.body.userType,
        projects: req.body.projects
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