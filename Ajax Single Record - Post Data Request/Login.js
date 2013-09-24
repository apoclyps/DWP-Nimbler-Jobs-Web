$(document).ready(function() {
		//Stops the submit request
		$("#myAjaxRequestForm").submit(function(e){
			   e.preventDefault();
		});
		
		//checks for the button click event
		$("#myButton").click(function(e){
				
				//$.md5(password);

				//document.setAttribute('password',$.md5(document.getElementById('password'));

				//get the form data and then serialize that
				dataString = $("#myAjaxRequestForm").serialize();

			
				//make the AJAX request, dataType is set to json
				//meaning we are expecting JSON data in response from the server
				$.ajax({
					type: "POST",
					url: "http://192.168.137.1:8080/RhieHorn/Login",
					data: dataString,
					dataType: 'jsonp',
					jsonp: 'callback',
					jsonpCallback: 'jsonpCallback',
					 
					//if received a response from the server
					success: function( data, textStatus, jqXHR) {
						//our country code was correct so we have some information to display
						 if(data.success){

							 $("#ajaxResponse").html("");
 							 $("#ajaxResponse").append("<b>Login:</b> " + data.success + "\n<br><br>");

							 $("#ajaxResponse").append("<b>Email:</b> " + data.userInfo.email + "\n<br>");
							 $("#ajaxResponse").append("<b>Password :</b> " + data.userInfo.password + "\n<br>");

							 $("#ajaxResponse").append("<b> DataString :</b> " + dataString.toString() + "\n");
			
						 }
						 //display error message
						 else {
							 $("#ajaxResponse").html("<div><b>Login failed</b></div>");
						 }
					},
					 
					//If there was no resonse from the server
					error: function(jqXHR, textStatus, errorThrown){
						 console.log("Something really bad happened " + textStatus);
						  $("#ajaxResponse").html(jqXHR.responseText);
					},
					 
					//capture the request before it was sent to server
					beforeSend: function(jqXHR, settings){
						//disable the button until we get the response
						$('#myButton').attr("disabled", true);
					},
					 
					//this is called after the response or error functions are finsihed
					//so that we can take some action
					complete: function(jqXHR, textStatus){
						//enable the button
						$('#myButton').attr("disabled", false);
					}
		 
				});        
		});
		 
		function jsonpCallback(data) {
			console.log("callback",data);
			//do nothing   
		}

	 
	});