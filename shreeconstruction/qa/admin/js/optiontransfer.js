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


function addScreen(){
	if($('#allScreen option:selected').length == 0){
		alert("Please select Some Screen");
		return false
	}
	$('#allScreen option:selected').detach().appendTo('#assignScreen');
}
function addAllScreen(){
	$('#allScreen option').detach().appendTo('#assignScreen');
}
function removeScreen(){
	if($('#assignScreen option:selected').length == 0){
		alert("Please select Some Screen");
		return false
	}
	$('#assignScreen option:selected').detach().appendTo('#allScreen');
}

function removeAllScreen(){
	$('#assignScreen option').detach().appendTo('#allScreen');
}