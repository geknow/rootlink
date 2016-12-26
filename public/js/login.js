function validateForm()
{
  var x=document.forms["myForm"]["username"].value;
  if (x==null || x=="")
  {
    alert("用户名不能为空");
    return false;
  }
  var x1=document.forms["myForm"]["password"].value;
  if(x1==null||x1=="")
  {
  	alert("密码不能为空");
  	return false;
  }
}