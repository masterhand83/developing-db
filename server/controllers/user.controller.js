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
    const cb = await user.save()
        .then(function () {
            res.json({
                status: 'User '+user.name+' saved'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to save user'
            });
        });
};

userCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.findById(id).populate("projects").exec();
    res.json(user);
};

userCtrl.getUserProjects = async (req, res) => {
    const { id } = req.params;
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.findById(id).populate("projects").exec();
    const { projects } = user;
    res.json(projects);
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const newUser = {
        name: user.name,
        email: req.body.email,
        password: req.body.password,
        mobile:  req.body.mobile,
        userType: user.userType,
        projects: user.projects
    };
    await User.findByIdAndUpdate(id, {$set: newUser}, {new: true})
        .then(function () {
            res.json({
                status: 'User '+user.name+' Updated'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to update user'
            });
        });
};

userCtrl.addProjectToUser = async (req,res) => {
    const { id } = req.params;
    const { _id } = req.body;
    await User.findByIdAndUpdate(id, {$addToSet: {projects: _id}});
    res.json({
        status: 'Project Added to User'
    });
;}

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params
    const { name } = await User.findById(id);
    await User.findByIdAndRemove(id);
    res.json({
        status: 'User '+name+' Deleted'
    });
};

userCtrl.login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.find({email: email, password: password});
    res.json(user);
};

module.exports = userCtrl;