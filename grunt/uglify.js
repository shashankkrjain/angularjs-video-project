module.exports = {
  angular:{
    options : {
      //sourceMap : true,
      sourceMapIncludeSources : true,
      sourceMapIn : 'js/app.js.map'
    },
    src:[
      'js/app.js'
    ],
    dest:'js/app.min.js'
  }
};
