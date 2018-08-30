var admin=require('../models/admin')
var user=require('../models/user')
var archives=require('../models/car-archives')
var sale=require('../models/car-sale')
var type=require('../models/car-type')
var back=require('../models/car-gh')

var url = require("url");
var formidable = require("formidable");
var df = require("date-format");
var fs = require("fs");
var crypto=require('crypto');

exports.zulin=function(req,res){

    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";

    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(name) {
        admin.getK(name,function(err){
            res.render("zulin",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("zulin",{
            "login" : login,
            "name" : "",
        });
    }
}


exports.leibie=function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    type.find({},function(err,results){
        res.json({
            'results':results
        })
    })
}
exports.keren=function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    user.find({},function(err,results){
        res.json({
            'results':results
        })
    })
}

exports.doAddzulin = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		sale.addsale(fields,function(result){
			res.json({"result" : result});
		});
	});
}
exports.checkzulin = function(req,res){
	var id = req.params.id;
	
	sale.saleid(id,function(torf){
		res.json({"result" : torf});
	});
}
//获取所有
exports.getAllzulin=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    archives.find({},function(err,results){
        res.json({
           "results" : results
       });
    })
}

exports.updatezulin = function(req,res){
	var id = req.params.id;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//更改学生
        sale.update({"id":id},{$set:{"state":fields.states}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
	});
}
exports.showUpdatezulin = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
	var id = req.params.id;
	sale.find({"id" : id},function(err,results){
		if(results.length == 0){
            res.json({"result" : -1});
            return;
		}else{
            res.json({"result" : results[0]});
		}
	});
}

exports.state = function (req, res) {
    var id = req.params.id;
    console.log(id);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //更改学生
        archives.update({"id":id},{$set:{"state":fields.state}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}