
#评论模块(需要登录)
###获取评论接口:
**/forum/index**
**Method:GET**
```json
RequestData:{
    page: INT, //null(true)，默认第一页
    count: INT, //null(true) 默认返回10条信息
}
```
```json
Response:{
    list: list //帖子的对象数组
}
```


###添加评论接口:
**/forum/addTopic**
**Method:POST**
```json
RequestData:{
    图片: //null(true)(name = file)
    text: INT, //null(false)
}
```
```json
Response:{
    code: 0,
    imageUrl: "http://172.6.2.39:4040/" + newname,
    text: text,
    UserId: ,//用户id
    PostId:   //该帖子id
}
```


###回复评论接口（可搜索）:
**/forum/addComment**
**Method:GE**
```json
RequestData:{
    id: INT, //null(false) 回复的帖子的id，可以是楼主，也可以是某个评论
    text: INT, //null(false)
    type: INT //null(false) 1是回复楼主，2是回复某个帖子
}
```
```json
Response:{
    code: 0,
    UserId: ,
    PostId: ,
    id: 
}
```


###获取评论回复接口:
**/forum/getComment**
**Method:GET**
```json
RequestData:{
    id : INT //该帖子的id
}
```
```json
Response:{
    code: 0,
    list: //对象数组 , 该帖子的所有回复
}
```