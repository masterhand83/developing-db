const pdfCtrl = {};

const Project = require('../models/project');
const User = require('../models/user');

const PDFDocument = require('pdfkit');
var sizeOf = require('image-size');
var moment = require('moment');
moment().format();
moment.locale('es');

pdfCtrl.createPDF = async (req, res) => {
  const doc = new PDFDocument({
    info: {
      Title: 'Informe',
      Author: 'Virtual Assistant'
    }
  });
  sizeOf('uploads/'+req.file.filename, function (err, dimensions) {
    console.log(dimensions.width, dimensions.height);
  });
  res.json({});
  /*doc.image('uploads/'+req.file.filename);
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
    'Content-Disposition': 'attachment; filename=Informe.pdf'
  });
  doc.pipe(res);
  doc.end();*/
  /*
  const { id } = req.params;
  var now = moment().format('L');
  await Project.findById(id)
  .then(async (project) => {
    const resident = await User.findOne({projects: project._id, userType: 2});
    const designer = await User.findOne({projects: project._id, userType: 3});
    console.log(resident);
    const doc = new PDFDocument({
      info: {
        Title: 'Informe',
        Author: 'Virtual Assistant'
      }
    });
    doc.image('src/Logo.jpg',156,60, {
      width: 300
    });
    doc.moveDown(4);
    doc.font('Times-Roman').fontSize(20).text('   INFORME DE CIERRE DE OBRA   ', {
      align: 'center',
      underline: true
    });
    doc.moveDown(1);
    doc.font('Helvetica-Bold').fontSize(18).text(project.name, {
      align: 'center'
    });
    doc.font('Helvetica').fontSize(15).text(project.description, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Nombre de la Tienda: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(project.storeName, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Número de la Tienda: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(project.storeNumber, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Metraje: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(project.m2, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Ubicación: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(project.location, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Residente a Cargo: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(resident.name, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Proyectista a Cargo: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(designer.name, {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Fecha de Recepción del Local: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(moment(project.localReception).format('LL'), {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Fecha de Pedido de Muebles: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(moment(project.furnitureDate).format('LL'), {
      align: 'justify'
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('Fecha de Apertura del Local: ', {
      align: 'justify',
      continued: true
    });
    doc.font('Helvetica').fontSize(15).text(moment(project.openingDate).format('LL'), {
      align: 'justify'
    });
    doc.font('Courier-Oblique').fontSize(9).text('Generado el ' + now, 248, 710);
    doc.addPage();
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': 'attachment; filename=Informe.pdf'
    });
    doc.pipe(res);
    doc.end();
  })
  .catch(() => {
    res.json({
      status: 'No File'
    });
  });
  */
  };//Almost Finished

module.exports = pdfCtrl;