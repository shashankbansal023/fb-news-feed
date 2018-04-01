
let myFacebookToken;

$(document).ready(() => {

	myFacebookToken = prompt("Enter your facebook token: "," ");
	if(myFacebookToken==null || myFacebookToken == ''){
		alert('Incorrect input');
	}
	else{
		getAllDetails();
	}
})


let getAllDetails= () =>{

	$.ajax({
		type:'GET',
		dataType:'json',
		async:true,
		url:'https://graph.facebook.com/me?fields=name,friends,feed{description,message,name,full_picture},cover,picture.type(large)&access_token=' + myFacebookToken,

		success:(response) =>{

			$('.container').css('display','block');
			
			console.log(response);

			$('#profilePhoto').html('<img src="'+response.picture.data.url+'" class="img-fluid profileHeight">');
			
			$('#cover').css('background-image','url(' + response.cover.source+ ')');

			$(".feed1").attr('src',response.feed.data[0].full_picture);
			$(".feed2").attr('src',response.feed.data[3].full_picture);
			$(".feed3").attr('src',response.feed.data[11].full_picture);
			$(".feed4").attr('src',response.feed.data[15].full_picture);
			$(".feed5").attr('src',response.feed.data[8].full_picture);
			


			$("#feed1").append(response.feed.data[0].message);
			$("#feed2").append(response.feed.data[3].message);
			$("#feed3").append(response.feed.data[11].message);
			$("#feed4").append(response.feed.data[15].name);
			$("#feed5").append(response.feed.data[8].name);
			
		},
		error:(err) =>{

			console.log(err.responseJSON.error.message);
			alert(err.responseJSON.error.message);
		}
	});


	// fields=posts{created_time,type,full_picture,story,message,source}

}

