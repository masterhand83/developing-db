const User = require('../models/user');
const Project = require('../models/project');
const userCtrl = {};

const CryptoJS = require("crypto-js");

userCtrl.getUsers = async (req, res) => {
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.find().populate('projects').exec();
    res.json(user);
};

userCtrl.getResidents = async (req, res) => {
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.find({userType: 2}).populate("projects").exec();
    res.json(user);
};

userCtrl.getDesigners = async (req, res) => {
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.find({userType: 3}).populate("projects").exec();
    res.json(user);
};

userCtrl.removeIdProject = async (id) => {
    const user = await User.find({projects: id}, {projects: 1});
    for (var item of user) {
        await User.findByIdAndUpdate(item._id,{$pull: {projects: id}});
    }
};

userCtrl.createUser = async (req,res) => {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(req.body), 'secret key 123');
    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);
    const user = new User(req.body);
    await user.save()
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
    /*res.json({
        status: 'saved'
    });*/
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
    const { projects } = await User.findById(id).populate("projects").lean().exec();
    for (var item of projects) {
        const { name } = await User.findOne({projects: item._id, userType: 2}).lean();
        item.resident = name;
    }
    res.json(projects);
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    user.email = req.body.email;
    user.password = req.body.password;
    user.mobile = req.body.mobile;
    await User.findByIdAndUpdate(id, {$set: user}, {new: true})
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

userCtrl.addProjectToUser = async (idUser, idProject) => {
    await User.findByIdAndUpdate(idUser, {$addToSet: {projects: idProject}});
};

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    await User.findByIdAndRemove(id)
        .then(function () {
            res.json({
                status: 'User '+user.name+' Deleted'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to Delete User'
            });
        });
};

userCtrl.login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.find({email: email, password: password});
    res.json(user);
};

module.exports = userCtrl;