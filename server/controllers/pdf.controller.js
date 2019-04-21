const pdfCtrl = {};

const Project = require('../models/project');
const User = require('../models/user');

const { unlink } = require('fs-extra');
const path = require('path');
const PDFDocument = require('pdfkit');
var sizeOf = require('image-size');
var moment = require('moment');
moment().format();
moment.locale('es');

pdfCtrl.createPDF = async (req, res) => {
  const { id } = req.params;
  var now = moment().format('L');
  const URI = 'uploads/'+req.file.filename;
  await Project.findById(id)
  .then(async (project) => {
    const resident = await User.findOne({projects: project._id, userType: 2});
    const designer = await User.findOne({projects: project._id, userType: 3});
    sizeOf(URI, function (err, dimensions) {
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
      doc.addPage({
        size: 'letter',
        layout: 'landscape'
      });
      if (dimensions.height >= doc.page.height) {
        var newHeight = (doc.page.height - 30);
        var newWidth = (newHeight * dimensions.width)/dimensions.height;
        if(newWidth >= doc.page.width){
          newWidth = (doc.page.width - 30);
          newHeight = (newWidth * dimensions.height)/dimensions.width;
          doc.image(URI, 15, (doc.page.height - newHeight)/2, {
            width: newWidth
          });
        }
        else{
          doc.image(URI, (doc.page.width - newWidth)/2, 15, {
            height: newHeight
          });
        }
      } else {
        doc.image(URI, (doc.page.width - dimensions.width)/2, (doc.page.height - dimensions.height)/2);
      }
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'attachment; filename=Informe.pdf'
      });
      doc.pipe(res);
      doc.end();
      unlink(path.resolve('./uploads/' + req.file.filename));
    });
  })
  .catch(() => {
    unlink(path.resolve('./uploads/' + req.file.filename));
    res.json({
      status: 'No File'
    });
  });
  };//Checked

module.exports = pdfCtrl;