var mongoose=require('mongoose');

var ghSchema=mongoose.Schema({
    id:Number,
    xuanze:String,
    name:String,
    time:String,
    zujin:String,
    heji:String,
    heji2:String,
})
ghSchema.statics.addgh = function(json,callback){
	gh.ghid(json.id,function(torf){
		if(torf){
			var s = new gh(json);
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


ghSchema.statics.ghid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		callback(results.length == 0);
	});
}


var gh = mongoose.model("gh",ghSchema);
module.exports = gh;
// var gh=mongoose.model('gh',ghSchema)