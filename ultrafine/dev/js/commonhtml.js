$("#leftMenu").html('<div class="nav-header">'+
            '<div class="nav-control">'+
                '<div class="hamburger">'+
                    '<span class="line"></span><span class="line"></span><span class="line"></span>'+
                '</div>'+
            '</div>'+
        '</div>'+
       '<div class="header">'+
            '<div class="header-content">'+
                '<nav class="navbar navbar-expand">'+
                    '<div class="collapse navbar-collapse justify-content-between">'+
                        '<div style="width: 100%;text-align: right;">Welcome '+getUserDetails()+'</div>'+                       
                    '</div>'+
                '</nav>'+
            '</div>'+
        '</div>'+
        '<div class="quixnav">'+
            '<div class="quixnav-scroll">'+
                '<ul class="metismenu" id="menu">'+
                    '<li><a id="accessMgmt" class="has-arrow" href="javascript:void()" aria-expanded="false">'+
                        '<i class="icon icon-app-store"></i><span class="nav-text">Access Management</span></a>'+
                        '<ul aria-expanded="false">'+
							checkAccess('User/Role Access')
                        +'<li><a href="#" onclick="logout()">LogOut</a></li></ul>'+
                    '</li>'+                    
                '</ul>'+
            '</div>'+
        '</div>');

$("#myfooter").html('<div class="footer">'+
            '<div class="copyright">'+
                '<p>Copyright &copy; Designed &amp; Developed by <a href="https://o2bizservices.com/" target="_blank">O2Biz Services</a> 2021</p>'+
            '</div>'+
        '</div>');
function checkAccess(code){
	var str="";
	$(JSON.parse(localStorage.getItem("access"))["Admin Portal"]).each(function(){  
			str= str + '<li><a href="'+$(this).attr("param")+'">'+$(this).attr("name")+'</a></li>';
	});
	return str;
}	
function logout(){
	localStorage.clear();
	location.href="../index.html";	
}
function getUserDetails(){
	var users = JSON.parse(localStorage.getItem("users"));
	return users.username;
	
}

$(function(){
	$(".mm-collapse").addClass('mm-show');
	$('#accessMgmt').attr('aria-expanded',true);
	$('.metismenu').find('li').eq(0).addClass('mm-active');
});
