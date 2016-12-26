var countdown=61; 
function settime(obj) { 
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="获取验证码"; 
        countdown = 61; 
        return;
    } else { 
    	var count=countdown-1;
        obj.setAttribute("disabled", true); 
        obj.innerHTML="再次发送(" + count + ")"; 
        obj.style.backgroundColor="#e1e4eb";
        obj.style.color="#969696";
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
    if(countdown==0){
    	obj.removeAttribute("disabled");
    	obj.innerHTML="再次发送";
    	obj.style.backgroundColor="#00a2e0";
    	obj.style.color="#ffffff";
    }
}
