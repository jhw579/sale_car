var admin=require('../models/admin')
var user=require('../models/user')
var archives=require('../models/car-archives')
var lease=require('../models/car-sale')
var type=require('../models/car-type')
var back=require('../models/car-gh')

var url = require("url");
var formidable = require("formidable");
var df = require("date-format");
var fs = require("fs");
var crypto=require('crypto');

//客户信息页面
exports.type=function(req,res){
    // res.render('index');
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";

    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }

    if(name) {
        admin.getK(name,function(err){
            res.render("type",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("type",{
            "login" : login,
            "name" : "",
        });
    }
}
//添加客户信息
exports.doAddtype = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
        // console.log(fields)
		type.addtype(fields,function(result){
			res.json({"result" : result});
		});
	});
}
exports.checktype = function(req,res){
	var id = req.params.id;
	
	type.typeid(id,function(torf){
		res.json({"result" : torf});
	});
}
//获取所有
exports.getAlltype=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
 	var pagesize = 10;
 	type.count({},function(err,count){
        type.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
			res.json({
			 	"pageAmount" : Math.ceil(count / pagesize),
				"results" : results
			});
		});
 	});	
}
//删除客户信息
exports.deletetype=function(req,res){
    var id= req.params.id;

    type.find({'id':id},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }

        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }

            res.json({'result':1})
        })
    })
}
//更新客户信息
exports.updatetype = function(req,res){
	var id = req.params.id;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//更改学生
        type.update({"id":id},{$set:{"name":fields.names}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
	});
}
exports.showUpdatetype = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
	var id = req.params.id;
	type.find({"id" : id},function(err,results){
		if(results.length == 0){
            res.json({"result" : -1});
            return;
		}else{
            res.json({"result" : results[0]});
		}
	});
}

