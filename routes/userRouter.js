var express = require('express');
var router = express.Router();
var multer  = require('multer') //上传图片的中间件
var bcrypt = require('bcryptjs')  //密码加密的中间件
const userModel=require('../models/userModel')
/* GET users listing. */
router.get('/add', (req,res)=>{//注册
  let {username,pwd,autorimg,content,state,sex,birth}=req.query
  // let {username,pwd} = req.body;
  userModel.find({username}).then((result)=>{
      if(result.length>0){ //如果查到了同名用户，直接返回状态码给前端
          res.send({
              code:-666,
              msg:'用户已存在'
          })
          return false
      }
      
      bcrypt.hash(pwd,10,(err,hashPwd)=>{
          if(!err){
              // console.log(hashPwd)
              new userModel({
                  username,
                  pwd:hashPwd,
                  autorimg:'/images/df_photo.png',
                  content,
                  sex,
                  birth,
                  state:true
              }).save().then((regResult)=>{
                  res.send({
                      code:1,
                      msg:'注册成功'
                  })
              })
          }
      })
  })
});
var store = multer.diskStorage({
  destination: function (req, file, cb) { //配置存放路径
      cb(null, 'public/images')
  },
  filename: function (req, file, cb) { //自定义文件名称
      console.log(file)
      let origname = file.originalname.split('.');
      let Len = origname.length;
      let ext = origname[Len-1];   //提取图片后缀
      let imgname = new Date().getTime()+parseInt(Math.random()*999) //生成一个绝对唯一的随机字符串，作为每个新图片的名称
      cb(null, imgname+'.'+ext)
  }
})

var upload = multer({ storage: store})

router.post('/upload',upload.single('myImg'),(req,res)=>{
  console.log(req.file)
  res.set({
      'Access-Control-Allow-Origin':'*'
  })
  let path = req.file.path.split('public')[1]
  
  userModel.update({username:"张丽"},{autorimg:path},()=>{
    res.send({
      code:1,
      msg:'上传成功',
      data: path
  })
  })
})
router.get('/find',(req,res)=>{//整体cha找
  userModel.find().then((data)=>{
    console.log(data)
    res.send({code:1,msg:data})
  }).catch((err)=>{
    res.send("查找失败")
  })
})
//修改
router.post('/update',(req,res)=>{
  console.log(req.body)
  let{_id,username,pwd,autorimg,content,state,sex,birth}=req.body
  userModel.updateOne({_id},{state}).then((data)=>{
    console.log("data")
    res.send({code:1,msg:"修改成功"})
  }).catch((err)=>{
    console.log(err)
    res.send("修改失败")
  })

})
//分页查询
router.post('/getinfos',(req,res)=>{
 
  let page=req.body.page||1 //查询的第几页数据
  let pageSize=req.body.pageSize||5
  let finduserByPage = async (page,pageSize)=>{
    let  alluser = await userModel.find() 
    // 总数据条数
    let  allCount = alluser.length
    // 每一页的数据
    let result =await userModel.find().skip((Number(page)-1)*pageSize).limit(Number(pageSize))
    return {result,allCount}
  }
  finduserByPage(page,pageSize).then((data)=>{
    console.log(data)
    res.send({code:1,msg:data})
  }).catch((err)=>{
    console.log(err)
    res.send("查询失败")
  })
})
//关键字查询
router.post('/key',(req,res)=>{
  let kw = req.body.kw ||''
  let page=req.body.page||1 //查询的第几页数据
  let pageSize=req.body.pageSize||5
  let finduserByKw = async (kw,page,pageSize)=>{
    // 通过正则表达式匹配关键字
    
    let regex = new RegExp(kw)
    // 满足条件的所有数据
   let alluser =userModel.find({$or:[{content:{$regex:regex}},{username:{$regex:regex}}] })
    let allCount= alluser.length
   console.log(allCount)
    // 分页后满足关键字的数据
    let result= await userModel.find({$or:[{content:{$regex:regex}},{username:{$regex:regex}}] })
    .skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    return  {result,allCount}
  }
  finduserByKw(kw,page,pageSize).then((data)=>{
    console.log(data)
    res.send({code:1,msg:data})
  }).catch((err)=>{
    console.log(err)
    console.log("查询不成功")
  })
})
module.exports = router;
