const User = require('../models/user');
const Project = require('../models/project');
const Alert = require('../models/alert');
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
    var newUsers = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        newUsers.push(cryptedText);
    }
    res.json(newUsers);
};

userCtrl.getDesigners = async (req, res) => {
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.find({userType: 3}).populate("projects").exec();
    var newUsers = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        newUsers.push(cryptedText);
    }
    res.json(newUsers);
};

userCtrl.removeIdProject = async (id) => {
    const user = await User.find({projects: id}, {projects: 1});
    for (var item of user) {
        await User.findByIdAndUpdate(item._id,{$pull: {projects: id}});
    }
};

userCtrl.createUser = async (req,res) => {
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData, 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const user = new User(decryptedData);
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
};

userCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    //populate().exec() es para agregar los datos de los objetos projects
    //en populate va el nombre del dato como esta en el schema User NO EL NOMBRE DEL SCHEMA PROJECT
    const user = await User.findById(id).populate("projects").exec();
    var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 117');
    var cryptedText = cryptedData.toString();
    res.json({
        data: cryptedText
    });
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
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData.toString(), 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    user.email = decryptedData.email;
    user.password = decryptedData.password;
    user.mobile = decryptedData.mobile;
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

userCtrl.getAlerts = async (req, res) => {
    const { id } = req.params;
    const { alerts } = await User.findById(id).populate('alerts.alert').populate('alerts.projectId', 'name');
    res.json(alerts);
};

userCtrl.deleteAlert = async (req, res) => {
    const { id } = req.params;
    await User.updateOne( { 'alerts.alert': id }, { $pull: {'alerts.$.alert': id } } );
    await Alert.findByIdAndDelete(id);
    res.json({
        status: 'Alert Deleted'
    });
};

userCtrl.login = async (req, res) => {
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData.toString(), 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const { email } = decryptedData;
    const { password } = decryptedData;
    const user = await User.find({email: email, password: password});
    var cryptedUser = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        cryptedUser.push(cryptedText);
    }
    res.json(cryptedUser);
};

module.exports = userCtrl;