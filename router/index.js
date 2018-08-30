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

//登录页面
exports.login=function(req,res){
    res.render('login')
}
//注册页面
exports.reg=function(req,res){
    res.render('reg')
}

//判断注册
exports.checkuser = function(req,res,next){
    var queryobj = url.parse(req.url,true).query;
    if(!queryobj.id){
        res.send("请提供id参数！");
        return;
    }
    admin.findadmin(queryobj.id,function(err,doc){
        if(doc){
            res.json({"result" : -1});
        }else{
            res.json({"result" : 0});
        }
    });
}

//注册
exports.doreg = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var id=fields.id;
        var name = fields.name;
        var mima = fields.mima;
        admin.findadmin(id,function(err,doc){
            if(doc){
                res.json({"result" : -1});
                return;
            }
            admin.addadmin(id,name,mima,function(err,doc){
                if(err){
                    res.json({"result" : -2})
                    return;
                }
                req.session.login = 1;
                req.session.name = name;

                res.json({"result" : 1})
            });
        });
    });
}

//判断登录
exports.checklogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var id=fields.id;
        var name = fields.name;
        var mima = fields.mima;
        admin.findname(name,function(err,doc){
            if(!doc){
                res.json({"result":-1});
                return;
            }
            if(crypto.createHmac('sha256', mima).digest('hex') === doc.mima){
                req.session.login = 1;
                req.session.id=id;
                req.session.name = name;
                res.json({"result":1});
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        });
    });
}

//判断
exports.moren = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }

    if(name) {
        admin.getK(name,function(err){
            res.render("moren",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("moren",{
            "login" : login,
            "name" : "",
        });
    }
}

//退出
exports.tuichu = function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    res.render('login');
    // res.redirect('/')
}







//客户信息页面
exports.index=function(req,res){
    // res.render('index');
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }

    if(name) {
        admin.getK(name,function(err){
            res.render("index",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("index",{
            "login" : login,
            "name" : "",
        });
    }
}
//添加客户信息
exports.doAdduser = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		user.adduser(fields,function(result){
			res.json({"result" : result});
		});
	});
}
exports.check = function(req,res){
	var id = req.params.id;
	
	user.checkSid(id,function(torf){
		res.json({"result" : torf});
	});
}
//获取所有
exports.getAll=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
 	var pagesize = 2;
 	user.count({},function(err,count){
        user.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
			res.json({
			 	"pageAmount" : Math.ceil(count / pagesize),
				"results" : results
			});
		});
 	});	
}
//删除客户信息
exports.delete=function(req,res){
    var id= req.params.id;

    user.find({'id':id},function (err, results) {
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
exports.updateuser = function(req,res){
	var id = req.params.id;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//更改学生
        user.update({"id":id},{$set:{"name":fields.names,"tel":fields.tels,"addr":fields.addrs,"Idcard":fields.Idcards,"jiashi":fields.jiashis}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
	});
}
exports.showUpdate = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
	var id = req.params.id;
	user.find({"id" : id},function(err,results){
		if(results.length == 0){
            res.json({"result" : -1});
            return;
		}else{
            res.json({"result" : results[0]});
		}
	});
}

