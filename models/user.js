var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    id:Number,
    name:String,
    tel:String,
    addr:String,
    Idcard:String,
    jiashi:String,
})

userSchema.statics.adduser = function(json,callback){
	user.checkSid(json.id,function(torf){
		if(torf){
			var s = new user(json);
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


userSchema.statics.checkSid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		// console.log(results)
		callback(results.length == 0);
	});
}


var user = mongoose.model("user",userSchema);
module.exports = user;
