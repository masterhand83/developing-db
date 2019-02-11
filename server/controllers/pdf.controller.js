const pdfCtrl = {};

const Project = require('../models/project');

pdfCtrl.createPDF = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  };//Testing

module.exports = pdfCtrl;