#url : 
#port : 

###注意：
*所有路由，除了静态文件的请求，都需要加上/api,例如注册: /api/register*
*修改了登录注册的路由*
*博客的添加路由改变*

#通用响应格式
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: STRING || OBJECT
}
```
 * status code:
 *   200-OK
 *   4xx-Invalid Request
 *   400-Bad Request 请求参数或请求格式错误
 *   401-Unauthorized 请求需要的用户状态不正确
 *   403-Forbidden 服务器禁止用户得到响应
 *   5xx-Server Error
 *   500-Internal Server Error

#用户模块
##登陆和注册和退出
###注册接口:
**/register**
Method:POST
```json
RequestData:{
    username: STRING,
    password: STRING,
    email: STRING
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {link : "邮箱验证链接"}
}
```
###登录接口:
**/login**
Method:POST
```json
RequestData:{
     username: STRING,
     email: STRING//二者必须至少有其一
     
     password: STRING
     remenberMe: boolean //(false)
}
或者
RequestData:{
     token: STRING
     
     remenberMe: boolean //(默认true)
}
```
响应格式:
cookies:LoginToken=......................
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {
    	LoginToken : STRING,
    	token: STRING //选择记住密码时不为null,最多记住30天,但是每次登录都会更新token
    }
}
```

###退出登录接口:
**/logout**
Method:POST
```json
RequestData:{
    token: STRING //null(allow)
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {
    	loginStatus: false
    }
}
```

###验证登录接口:
**/loginValidate**
Method:GET
```json
RequestData:{
	
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {loginStatus: true || false }
}
```

#公告模块
###获取接口:
**/blog/index**
Method:GET
```json
RequestData:{
     page: INT,//allowNull(true),默认为1,获取的第几页
     count: INT //allowNull(true),默认为10，获取的条数
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {list : `对象数组`}
}
```

###添加接口:
**/admin/blog/add**
**管理员才有的功能：测试账号name3 密码123**
Method:POST
```json
RequestData:{
     text : String //allowNull(false) 
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {}
}
```


#设备模块
###获取接口:
**/device/all**
Method:GET
```json
RequestData:{
     
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {devices: `对象数组`}
}
```

###添加接口:
**/device/add**
Method:POST
```json
RequestData:{
     name: STRING //allowNull(false),
     label: STRING //allowNull(false),
     description: STRING //allowNull(true)
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {device: }
}
```

###删除接口:
**/device/delete**
Method:POST
```json
RequestData:{
     token:  //allowNull(false)
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {count: }
}
```



#传感器模块
###获取接口:
**/sensor/all**
Method:GET
```json
RequestData:{
     deviceId: INT //allowNull(false)
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {sensors: `对象数组`}
}
```


###添加接口:
**/sensor/add**
Method:POST
```json
RequestData:{
     name: STRING //allowNull(false),
     label: STRING //allowNull(false),
     description: STRING //allowNull(true),
     deviceId: INT //allowNull(false),
     value: STRING //allowNull(false),
     value1: STRING //allowNull(true),
     value2: STRING //allowNull(true),
     value3: STRING //allowNull(true),
     value4: STRING //allowNull(true),
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {sensor: }
}
```

###删除接口:
**/sensor/add**
Method:POST
```json
RequestData:{
     sensorId: INT //allowNull(false)
}
```
响应格式:
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {count: }
}
```



