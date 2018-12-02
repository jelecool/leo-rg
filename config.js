var config = {};


config.port = process.env.WEB_PORT || 3000;
config.dbuser = "jerioux";
config.dbpassword = "leopassword1";
config.dbhost = 'mongodb://' + config.dbuser + ':' + config.dbpassword + '@ds123434.mlab.com:23434/leo-rg';
config.title = "Leo-Rg";
config.pipedrive_key = "2fd6977604bb16232a5242b5af9f44bfd67d1c07";


module.exports = config;