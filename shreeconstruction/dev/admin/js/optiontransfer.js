function addRoles(){
	if($('#allRoles option:selected').length == 0){
		alert("Please select Some roles");
		return false
	}
	$('#allRoles option:selected').detach().appendTo('#assignRoles');
}
function addAllRoles(){
	$('#allRoles option').detach().appendTo('#assignRoles');
}
function removeRoles(){
	if($('#assignRoles option:selected').length == 0){
		alert("Please select Some roles");
		return false
	}
	$('#assignRoles option:selected').detach().appendTo('#allRoles');
}

function removeAllRoles(){
	$('#assignRoles option').detach().appendTo('#allRoles');
}


function addUsers(){
	if($('#allUsers option:selected').length == 0){
		alert("Please select Some Users");
		return false
	}
	$('#allUsers option:selected').detach().appendTo('#assignManager');
}
function addAllUsers(){
	$('#allUsers option').detach().appendTo('#assignManager');
}
function removeUsers(){
	if($('#assignManager option:selected').length == 0){
		alert("Please select Some Users");
		return false
	}
	$('#assignManager option:selected').detach().appendTo('#allUsers');
}

function removeAllUsers(){
	$('#assignManager option').detach().appendTo('#allUsers');
}