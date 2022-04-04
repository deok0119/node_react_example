if(process.env.NODE_DEV ==='production'){
    module.exports = require('./prod.js');
}

else{
    module.exports = require('./dev.js');
}