var admin=require('../models/admin')
var user=require('../models/user')
var archives=require('../models/car-archives')
var sale=require('../models/car-sale')
var type=require('../models/car-type')
var gh=require('../models/car-gh')

var url = require("url");
var formidable = require("formidable");
var df = require("date-format");
var fs = require("fs");
var crypto=require('crypto');

//客户信息页面
exports.tongji=function(req,res){
    // res.render('index');
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
  
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(name) {
        admin.getK(name,function(err){
            res.render("tongji",{
                "login" : login,
                "name" : name,
            });
        });
    }else{
        res.render("tongji",{
            "login" : login,
            "name" : "",
        });
    }
}

exports.getAllzuchu=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
        sale.find({},function(err,results){
            res.json({
               "results" : results
           });
        })
}

exports.getAllgh=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var name = login ? req.session.name : "";
    if(!(req.session.login && req.session.name == name)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
        gh.find({},function(err,results){
            res.json({
               "results" : results
           });
        })
}