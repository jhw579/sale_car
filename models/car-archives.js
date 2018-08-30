var mongoose = require('mongoose');

var archivesSchema =new mongoose.Schema({
    id:Number,
    name:String,
    typ:String,
    zulin:String,
	danwei:String,
	state:String,
})

// var archives = mongoose.model('archives', archivesSchema)

archivesSchema.statics.addcar = function(json,callback){
	archives.carid(json.id,function(torf){
		if(torf){
			var s = new archives(json);
			s.save(function(err){
				if(err){
					callback(-2);
					return;
				}
				callback(1);
			});
		}else{
			callback(-1);
		}
	});
}


archivesSchema.statics.carid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		// console.log(results)
		callback(results.length == 0);
	});
}


var archives = mongoose.model("archives",archivesSchema);
module.exports = archives;
