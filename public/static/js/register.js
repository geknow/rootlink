function validateForm(){var r=document.forms.myForm.username.value;if(null==r||""==r)return alert("用户名不能为空"),!1;var e=document.forms.myForm.password.value;if(null==e||""==e)return alert("密码不能为空"),!1;var o=document.forms.myForm.password2.value;if(null==o||""==o)return alert("确认密码不能为空"),!1;var a=document.forms.myForm.r_way.value;return null==a||""==a?(alert("邮箱不能为空"),!1):void(window.location.href="skip.html")}