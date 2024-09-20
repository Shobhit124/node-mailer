var nodemailer = require('nodemailer');
const path = require('path')
const handleBars = require('handlebars')
const fs = require('fs')
async function mailer(req, res) {

  const templatePath = path.join(__dirname, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8')
  var compiledTemplate = handleBars.compile(template);
  
  const replacements = {
    img1: req.body.img1,
    img2: req.body.img2,
    para1: req.body.para1,
    para2: req.body.para2,
    name: req.body.name,
    greeting: req.body.greeting,
    btnlink: req.body.btnlink,
    btnname: req.body.btnname
  }
  var result = compiledTemplate(replacements);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shobhitchadha7@gmail.com',
      pass: 'oyth xrin bprg jpgr'
    }
  });
  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: 'Sending Email using Node.js',
    html: result
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send({ message: 'Email sent' })
}
module.exports = mailer