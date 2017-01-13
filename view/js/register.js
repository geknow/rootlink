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
  var x2=document.forms["myForm"]["password2"].value;
  if(x2==null||x2=="")
  {
  	alert("确认密码不能为空");
  	return false;
  }
  var x3=document.forms["myForm"]["r_way"].value;
  if(x3==null||x3=="")
  {
  	alert("邮箱不能为空");
  	return false;
  }
  window.location.href="skip.html";
}