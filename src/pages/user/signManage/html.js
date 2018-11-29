const content = require('./content.ejs');
const layout = require('layout-without-nav');
const pageTitle = '签到';
module.exports = layout.init({ pageTitle }).run(content({ pageTitle }));
