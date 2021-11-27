var quarryOwners = [];
var users = [];
var allscreen;
var allroles;

/***
 * Load all users
 */
const SERVER_URL = getServerUrl();
function loadUsers() {
    $.ajax({
        url: SERVER_URL + 'admin/web/user/list',
        type: 'post',
		headers: {
                'token': localStorage.getItem("token"),
        },
        complete: function (response) {
            if (response.status == 200) {
				//loadAllRoles();
                users = response.responseJSON;
                var tableBody = prepareUserTableBody(users);
                $('#idUserTableBody').html(tableBody);
            } else {
               errorRequest(response.status);
            }
        }
    });

}

function loadAllScreen(){
	 const SERVER_URL = getServerUrl();
    $.ajax({
        url: SERVER_URL + 'admin/web/screen/listScreen',
        type: 'post',
		headers: {
                'token': localStorage.getItem("token"),
        },
        complete: function (response) {
            if (response.status == 200) {
                users = response.responseJSON;
                //screenDetails(response);
				allscreen = response;
				loadAllRoles();
		    } else {
               errorRequest(response.status);
            }
        }
    });	
}
function loadAllRoles(reqtype){
	 const SERVER_URL = getServerUrl();
    $.ajax({
        url: SERVER_URL + 'admin/web/role/listRole',
        type: 'post',
		headers: {
                'token': localStorage.getItem("token"),
        },
        complete: function (response) {
			allroles=response.responseJSON;
            if (response.status == 200) {
				if(reqtype == 'U'){
					loadUsers();
				}else{
					prepareRoleList(response.responseJSON);
				
				}
            } else {
                errorRequest(response.status);
            }
        }
    });	
}

function prepareRoleList(response){
	$("#idRoleTableBody").html('');
	$(response).each(function(index,obj){		
		var str="<tr><td>"+(++index)+"</td><td class='roleClass'>"+$(obj).attr('code')+"</td><td>"+$(obj).attr('description')+"</td>";
		str += '<td>';
        str += '<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="' + $(obj).attr('id') + '" onClick="editRole(this)"><i class="fa fa-edit"></i></button>';
        str += '&nbsp;&nbsp;';
		str += '<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="' + $(obj).attr('id') + '" onClick="viewRoleUser(this)"><i class="fa fa-users"></i></button>';
        str += '&nbsp;&nbsp;';
        str += '<button type="button" class="btn btn-danger" title="Remove" alt="Remove" data-id="' + $(obj).attr('id') + '" onClick="deleteRole(this)"><i class="fa fa-trash"></i></button>';
        str += '</td></tr>';		
		$("#idRoleTableBody").append(str);		
	});
}

function viewRoleUser(obj){
	var map = {};
		map["roleid"]=$(obj).attr("data-id");
		$.ajax({
				url: SERVER_URL + 'admin/web/role/rolewiseuser',
				type: 'post',
				headers: {
                'token': localStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
					$('#showModalRoleDialog').modal('show');
						var str="";
							$(response.responseJSON).each(function(key,val){
								str = str + (++key) +". " +val+"<br>" ;
							});
							if(str == ""){
								str="<h2>This role is not assign to any user.</h2>";
							}
							$("#rolewiseuserlist").html(str);
						
				} else {
					errorRequest(response.status);
				}
			}
		});	
}

function deleteRole(obj){
	if(confirm("Are you sure you want to delete this record?")){
		var map = {};
		map["id"]=$(obj).attr("data-id");
		$.ajax({
				url: SERVER_URL + 'admin/web/role/deleteRole',
				type: 'post',
				headers: {
                'token': localStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
						alert(response.responseJSON);
						loadAllRoles();
				} else {
					errorRequest(response.status);
				}
			}
		});
	}	
}
function deleteUser(userId) {
	if(confirm("Are you sure you want to delete this record?")){
		var map = {};
		map["id"]=userId;
		$.ajax({
				url: SERVER_URL + 'admin/web/user/deleteUser',
				type: 'post',
				headers: {
                'token': localStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
						alert(response.responseJSON);
						loadUsers();
				} else {
					errorRequest(response.status);
				}
			}
		});
	}
}
function editRole(obj){	

	var map = {};
	map["id"]=$(obj).attr("data-id");
	$.ajax({
			url: SERVER_URL + 'admin/web/role/getByIdRole',
			type: 'post',
			headers: {
                'token': localStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					$('#showModalDialog').modal('show');
					$("input[type='checkbox']").prop('checked', false);
					screenDetails(allscreen);
					$("#txtRoleName").val(response.responseJSON.code);
					$("#txtDesc").val(response.responseJSON.description);
					$("#txtid").val(response.responseJSON.id)
					$.each(response.responseJSON.featuresMap,function(key,val){		
						$("#"+key).prop('checked', true);
						$("#"+val+"_"+key).prop('checked', true);
					});
				} else {
					errorRequest(response.status);
				}
			}
		});
}

function editUser(userId) {
    	var map = {};
		map["userId"]=userId;
		$.ajax({
			url: SERVER_URL + 'admin/web/user/getById',
			type: 'post',
			headers: {
                'token': localStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					var user = response.responseJSON;
					$('#txtMobile').val(user.mobile).attr('readonly','readonly');
					$('#txtid').val(user.id);
					$('#txtEmail').val(user.email);
					$('#txtPassword').val(user.password).attr('readonly','readonly');
					$('#txtusername').val(user.username);
					$('#showModalDialog').modal('show');
					$("#assignRoles").empty();
					$("#allRoles").empty();
					$.each(allroles, function(key, value) {
						$("#allRoles").append('<option value="'+value.id+'">'+value.code+'</option>');
					});
					$.each(user.userRoles, function(key, value) {
						$('#allRoles option[value="'+value+'"]').detach().appendTo('#assignRoles');
					});
				}else{
					errorRequest(response.status);
				}
		}		
	});
}

function openAdd(){
	$('#showModalDialog').modal('show');
	$("input[type='checkbox']").prop('checked', false);
	$("#txtid").val(""); 
	$("#txtRoleName").val("");
	$("#txtDesc").val("");

	screenDetails(allscreen);
}
function openUserAdd(){
	$('#showModalDialog').modal('show');
	$('#txtMobile').attr('readonly',false);
	$('#txtPassword').attr('readonly',false);	
	$("#assignRoles").empty();
	$("#allRoles").empty();
	$('#txtMobile').val("");
	$('#txtEmail').val("");
	$('#txtPassword').val("");
	$('#txtusername').val("");
	$("#txtid").val("");	
	$.each(allroles, function(key, value) {
		$("#allRoles").append('<option value="'+value.id+'">'+value.code+'</option>');
	});
}


function screenDetails(response){
	var str ='<div ><div class="form-group col-md-12">';
	$.each(response.responseJSON.details, function(key, value) {
		str = str +  '<h3><u>'+key+'</u></h3>';
		$.each(value, function(key2, value2) {
		str = str +  '<ul style="margin-left:15px"><li><label for="txtEmail2" class="form-label">'+key2+'</label><ol>';
			$.each(value2, function(key3, value3) {				
				str = str +  '<li><input type="checkbox" name="mainid" id="'+value3.id+'" onclick="checkradioState(this)" ></input>&nbsp;&nbsp;<label>'+value3.name+'</label>&nbsp;&nbsp;[Read Access <input type="radio" name="myradio'+value3.id+'" value="R" id="R_'+value3.id+'"> | Full Access <input type="radio" value="F" name="myradio'+value3.id+'" id="F_'+value3.id+'">&nbsp;&nbsp;]</li>';
			});
			str=str+"</ol></li></ul>";
		});
		str=str+"<br>";
	});
	$("#screenDetails").html(str+"</div></div>");
	
}
function checkradioState(obj){
	if($(obj).is(":checked")){
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(1)).prop("checked",true);
	}else{
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(0)).prop("checked",false);
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(1)).prop("checked",false);
	}
}

function prepareUserTableBody(users) {
    var tableBody = '';
	var count = 1;
    users.forEach(user => {
        tableBody += '<tr>';
        tableBody += '<td>';
        tableBody += (count++);
        tableBody += '</td>';
		tableBody += '<td>';
        tableBody += user.username;
        tableBody += '</td>';
		tableBody += '<td class="mobileClass">';
        tableBody += user.mobile;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += user.email == null ? "" : user.email;
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += prepareRoles(user.userRoles);
        tableBody += '</td>';
        tableBody += '<td>';
        tableBody += '<button type="button" class="btn btn-primary" title="Update" alt="Update" onClick="editUser(\'' + user.id + '\')"><i class="fa fa-edit"></i></button>';
        tableBody += '&nbsp;&nbsp;';
        tableBody += '<button type="button" class="btn btn-danger" title="Remove" alt="Remove" onClick="deleteUser(\'' + user.id + '\')"><i class="fa fa-trash"></i></button>';
        tableBody += '</td>';

        tableBody += '</tr>';
    });

    if (users.length == 0) {
        tableBody += '<tr class="form-label">';
        tableBody += '<td colspan="7" align="center">';
        tableBody += 'No records avaialble.';
        tableBody += '</td>';
        tableBody += '</tr>';

    }

    return tableBody;
}

function prepareRoles(assignroles){
	var str = "";
	$(assignroles).each(function(key,val){
		str = str + getRoleName(val) + ", ";
	});
	return str
}
function getRoleName(id){
	var str="";
	$(allroles).each(function(key,value){
		if(value.id == id){
			str =  value.code;
		}
	});
	return str;
}

$('#btnUFSubmit').click(function (event) {
	if($("#txtMobile").val().length != 10){
		alert("Please Enter valid Mobile Number");
		return false;
	}
	if($("#txtusername").val() == ""){
		alert("Please Enter User Name");
		return false;
	}
	if($("#txtPassword").val() == ""){
		alert("Please Enter Password");
		return false;
	}
	if($("#txtEmail").val() != ""){
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $("#txtEmail").val() ) ) {
			alert("Please enter valid email id");
			return false;
		} 
	}
	if($("#assignRoles").find("option").length == 0){
		alert("Please add some roles to user");
		return false;
	}
	
	
	var map = {};
	var suffixurl="";	
	if($("#txtid").val() != ""){
		map["id"]=$("#txtid").val();	
		suffixurl="updateUser";		
	}else{
		map["password"]=$("#txtPassword").val();
		suffixurl="createUser";	
		var found="N";
		$(".mobileClass").each(function(){
			if($(this).html() == $("#txtMobile").val()){
				 found="Y";
			}
		});
		if(found == 'Y'){
			alert("Sorry This Mobile number is already used, Please enter different Mobile Number.");
			return false;
		}
	}
	map["mobile"]=$("#txtMobile").val();
	map["email"]=$("#txtEmail").val();	
	map["username"]=$("#txtusername").val();
	var array = new Array();
	$("#assignRoles option").each(function(){
		array.push($(this).val());  
	});
	map["userRoles"]=array;
	$.ajax({
			url: SERVER_URL + 'admin/web/user/'+suffixurl,
			type: 'post',
			headers: {
                'token': localStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					alert(response.responseJSON);
					loadUsers();
					$('#showModalDialog').modal('hide');
				} else {
					errorRequest(response.status);
				}
			}
		});
});

$('#btnRolesSubmit').click(function (event) {
	if($("#txtRoleName").val() == ""){
		alert("Role name must not be empty");
		return false;
	}
	if($("#txtDesc").val() == ""){
		alert("Role Description must not be empty");
		return false;
	}
	var map2={};
	$("input[name='mainid']:checked").each(function(){
		map2[$(this).attr("id")]=$('input[name="myradio'+$(this).attr("id")+'"]:checked').val();
	});
	
	var map = {};
	if($("#txtid").val() != ""){
		map["id"]=$("#txtid").val();
	}else{
		var found="N";
		$(".roleClass").each(function(){
			if($(this).html() == $("#txtRoleName").val()){
				 found="Y";
			}
		});
		if(found == 'Y'){
			alert("Sorry This Role name is already used, Please enter different Role name.");
			return false;
		}
		
	}
	map["code"]=$("#txtRoleName").val();
	map["description"]=$("#txtDesc").val();
	map["featuresMap"]=map2;
	$.ajax({
			url: SERVER_URL + 'admin/web/role/createRole',
			type: 'post',
			headers: {
                'token': localStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					alert(response.responseJSON);
					loadAllRoles();
					$('#showModalDialog').modal('hide');
				} else {
					errorRequest(response.status);
				}
			}
		});
});

$('#btnsignin').click(function (event) {
	if($("#mobile").val() == "" || $("#pass").val() == ""){
		alert("Please enter Mobile Number and Password");
		return false;
	}
	var map={};
	map["mobile"]=$("#mobile").val();
	map["password"]=$("#pass").val();
	$.ajax({
			url: SERVER_URL + 'admin/web/user/login',
			type: 'post',
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					if(typeof  response.responseJSON === "string"){
						alert(response.responseJSON);
					}else{
						localStorage.setItem("token",response.responseJSON.additionalDetails[0]);
						localStorage.setItem("access",JSON.stringify(response.responseJSON.details.AdminPortal));
						localStorage.setItem("users",JSON.stringify(response.responseJSON.users));
						location.href="views/index.html"					
					}
				} else {
					alert("Error occur while login");
				}
			}
		});
});

function errorRequest(sta){
	location.href="../index.html";
}
function showPass(){
	if($("#txtid").val() == ""){
		if($("#txtPassword").attr("type") == 'text'){	
			$("#txtPassword").attr("type","password");
			$("#eyePass").attr("class","fa fa-eye-slash");
		}else{
			$("#txtPassword").attr("type","text");
			$("#eyePass").attr("class","fa fa-eye");		
		}
	}
}