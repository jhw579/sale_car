var admin=require('../models/admin')
var user=require('../models/user')
var archives=require('../models/car-archives')
var gh=require('../models/car-gh')
var type=require('../models/car-type')
var sale=require('../models/car-sale')

var url = require("url");
var formidable = require("formidable");
var df = require("date-format");
var fs = require("fs");
var crypto=require('crypto');

//客户信息页面
exports.gui=function(req,res){
    // res.render('index');
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
  
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(name) {
        admin.getK(name,function(err){
            res.render("guihuan",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("guihuan",{
            "login" : login,
            "name" : "",
        });
    }
}

exports.getAllguihuan=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
 	var pagesize = 10;
 	sale.count({},function(err,count){
        sale.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
			res.json({
			 	"pageAmount" : Math.ceil(count / pagesize),
				"results" : results
			});
		});
 	});	
}

exports.doAddguihuan = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		gh.addgh(fields,function(result){
			res.json({"result" : result});
		});
	});
}
exports.checkguihuan = function(req,res){
	var id = req.params.id;
	
	gh.ghid(id,function(torf){
		res.json({"result" : torf});
	});
}
//获取所有


exports.updateguihuan = function(req,res){
	var id = req.params.id;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//更改学生
        gh.update({"id":id},{$set:{"state":fields.states}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
	});
}
exports.showUpdateguihuan = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
	var id = req.params.id;
	gh.find({"id" : id},function(err,results){
		if(results.length == 0){
            res.json({"result" : -1});
            return;
		}else{
            res.json({"result" : results[0]});
		}
	});
}

exports.stategh = function (req, res) {
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

exports.delet = function (req,res) {
    var id= req.params.id;
    sale.find({'id':id},function (err, results) {
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
