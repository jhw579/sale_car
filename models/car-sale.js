var mongoose=require('mongoose');

var saleSchema=mongoose.Schema({
	id:Number,
	name:String,
    time:String,
    zujin:String,
    heji:String,
    xuanze:String,
	zhifu:String,
})

// var sale=mongoose.model('sale',saleSchema)

saleSchema.statics.addsale = function(json,callback){
	this.saleid(json.id,function(torf){
		if(torf){
			var s = new sale(json);
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


saleSchema.statics.saleid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		callback(results.length == 0);
	});
}


var sale = mongoose.model("sale",saleSchema);
module.exports = sale;