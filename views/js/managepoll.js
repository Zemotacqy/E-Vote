let username = document.getElementById("username").value().toString().trim();
const baseuri = 'localhost:1310/api/user/';

$.get( baseuri+username, function(){

}).done((data)=>{
	console.log(data);
}).fail(()=>{
	console.log("Invalid Api access!")
})