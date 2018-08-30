var express=require('express');
//登录,注册,客人查询
var router=require('./router/index');
//汽车档案
var archives=require('./router/archives');
//类别档案
var type=require('./router/type');
//租赁
var zulin=require('./router/zulin');
//统计
var tongji=require('./router/tongji');
//归还
var gui=require('./router/guihuan');

var session = require('express-session');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/car');

var app=express();
app.set('view engine','ejs')
app.use(express.static('static'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.get('/',router.login);
app.get('/reg',router.reg);

app.get("/checkuser",router.checkuser);//验证用户名
app.post("/doreg",router.doreg);//注册js
app.post("/checklogin",router.checklogin);//登录js

app.get('/index',router.index);
app.get('/moren',router.moren);
//退出登录
app.get('/tuichu',router.tuichu)

app.get('/doadd', router.getAll);


//添加客户信息
app.post('/doadd', router.doAdduser);
app.propfind('/people/:id',router.check);	
//删除客户信息
app.delete('/doadd/:id', router.delete);
//更新客户信息
app.post    ('/people/:id'	, router.updateuser);
app.get     ('/people/:id'	, router.showUpdate);





//汽车档案
app.get('/archives',archives.archives);
app.get('/getAllcartype',archives.getAllcartype);
app.get('/doaddcar', archives.getAllcar);
app.post('/doaddcar', archives.doAddcar);
app.propfind('/car/:id',archives.checkcar);	
app.delete('/doaddcar/:id', archives.deletecar);
app.post    ('/car/:id'	, archives.updatecar);
app.get     ('/car/:id'	, archives.showUpdatecar);

//类别档案
app.get('/type',type.type);

app.get('/doaddtype', type.getAlltype);
app.post('/doaddtype', type.doAddtype);
app.propfind('/type/:id',type.checktype);	
app.delete('/doaddtype/:id', type.deletetype);
app.post    ('/type/:id'	, type.updatetype);
app.get     ('/type/:id'	, type.showUpdatetype);



//租赁
app.get('/zulin',zulin.zulin);
//获取类别
app.get('/leibie',zulin.leibie);
//获取客人
app.get('/keren',zulin.keren);
//获取状态
app.post('/state/:id',zulin.state);
app.get('/doaddzulin', zulin.getAllzulin);
app.post('/doaddzulin', zulin.doAddzulin);
app.propfind('/zulin/:id',zulin.checkzulin);
app.post    ('/zulin/:id'	, zulin.updatezulin);
app.get     ('/zulin/:id'	, zulin.showUpdatezulin);

//归还
app.get('/guihuan',gui.gui);
app.get('/getAllguihuan',gui.getAllguihuan);
app.post('/doaddguihuan', gui.doAddguihuan);
app.propfind('/guihuan/:id',gui.checkguihuan);
app.post    ('/guihuan/:id'	, gui.updateguihuan);
app.get     ('/guihuan/:id'	, gui.showUpdateguihuan);
app.post('/stategh/:id',gui.stategh);
app.delete('/delet/:id',gui.delet)


//统计
app.get('/tongji',tongji.tongji)
//租出登记
// app.get('/zuchu',tongji.tongji);
app.get('/getAllzuchu',tongji.getAllzuchu);
app.get('/getAllgh',tongji.getAllgh);

app.listen(3002);   