#url : 
#port : 

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
##登陆和注册
###注册接口:
**/user/register**
Method:POST
```json
RequestData:{
    username: STRING,
    password: STRING,
    email: STRING,
    type: KEY || undefined //请联系后台管理员获得管理注册接口
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
**/user/login**
Method:POST
```json
RequestData:{
     username: STRING,
     email: STRING//二者必须至少有其一
     password: STRING
}
```
响应格式:
cookies:LoginToken=......................
```json
Response:{
    error: STRING,
    status: INTERGER,
    msg: {LoginToken : STRING}
}
```