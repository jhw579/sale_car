var mongoose=require('mongoose');

var crypto=require('crypto');

var adminSchema=mongoose.Schema({
    'id':Number,
    'name':String,
    'mima':String,
})

var admin=mongoose.model('admin',adminSchema);

exports.findadmin = function(id , callback){
    admin.findOne({"id" : id} , function(err,doc){
        callback(err,doc);
    });
}

exports.findname = function(name , callback){
    admin.findOne({"name" : name} , function(err,doc){
        callback(err,doc);
    });
}

exports.addadmin = function(id,name,mima,callback){
    var jiamidemima = crypto.createHmac('sha256', mima).digest('hex');
    admin.create({'id':id,"name" : name , "mima" : jiamidemima},function(err,doc){
       callback(err,doc)
    });
}

// exports.addShuxing = function(name,k,v,callback){
//     user.findOne({"name":name},function (err,doc) {
//         if(err){
//             return;
//         }
//         if(!doc){
//             return;
//         }
//         doc[k]=v;
//         doc.save(callback);
//     })
// }


exports.getK = function (name,callback) {
    admin.findOne({"name":name},function (err,doc) {
        callback(err,doc);
    })
}

