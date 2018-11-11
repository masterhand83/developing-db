const cryptoCtrl = {};

var CryptoJS = require("crypto-js");

cryptoCtrl.encrypt = async (req, res) => {
    var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(req.body), 'secret key 117');
    var cryptedText = cryptedData.toString();
    res.json({
        cryptedData: cryptedText
    });
};

cryptoCtrl.decrypt = async (req, res) => {
    const { cryptedData } = req.body;
    var bytes = CryptoJS.AES.decrypt(cryptedData.toString(), 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    res.json(decryptedData);
};

module.exports = cryptoCtrl;