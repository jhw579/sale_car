var mongoose=require('mongoose');

var typeSchema=new mongoose.Schema({
    id:Number,
    name:String,
})

// var type=mongoose.model('type',typeSchema)

typeSchema.statics.addtype = function(json,callback){
	this.typeid(json.id,function(torf){
		if(torf){
			var s = new type(json);
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


typeSchema.statics.typeid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		// console.log(results)
		callback(results.length == 0);
	});
}


var type = mongoose.model("type",typeSchema);
module.exports = type;