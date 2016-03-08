var token = getUrlParameter('token');
var categoriesMap = {};
var categoriesArr = [];
var eventList = [], jobList = [], adList = [], bubbleList = [], courseList = [];
var debug_url = "https://acp.velho.xyz";
$(document).ready(function(){
	console.log("TOKEN FROM URL:", token);

	var NOTIFY_DEVICE = {
		token: "test",
		event_id: 1
	};

	$.ajax({
		url: (debug_url+"/categories"),
		type: "GET",
		success: function(response) {
			for (var i = response.length - 1; i >= 0; i--) {
				categoriesMap[response[i].category] = response[i].id;
				categoriesArr.push(response[i].id);
			}
			console.log("Got categories:", categoriesMap);
			pollServer();
		},
		error: function(err) {
			console.log(err);
		}
	});
});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function pollServer() {
	getEvents(1, [categoriesMap['bubble']], updateBubble, 'bubbleStream');
	getEvents(2, [categoriesMap['event']], update, 'events');
	getEvents(2, [categoriesMap['job']], update, 'jobs');
	getEvents(2, [categoriesMap['adverisement']], update, 'ads');
	getEvents(4, [categoriesMap['course']], updateCourse, 'courseMore');
  //getEvents(10, [categoriesMap['course']], updateCourseDouble, 'course1');
  //getEvents(10, [categoriesMap['course']], updateCourseDouble, 'course2');
	setTimeout(function() {
		pollServer();
	}, 5000);
}

function getEvents(limit, cat, callback, divId) {
	var req = {
		token: token,
		categories: cat,
		limit: limit
	}

	$.ajax({
		url: debug_url+"/display/events",
		type: "POST",
		data: JSON.stringify(req),
		contentType: "application/json; charset=utf-8",
  		dataType: "json",
		crossDomain: true,
		success: function(data) {
			console.log("Got events:", data);
			callback(data, divId);
		},

		error: function(err){
			console.log(err);
		},
	});

}

function sendPhoneFromDispaly(data, callback) {
	$.ajax({
		url: debug_url+"/display/notify",
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
  	dataType   : "json",
		success: function(response) {
			console.log("Response:"+ response);
			callback(response);
		},
		error: function(xhr,textStatus, error) {
			console.log(xhr,status);//now is 400
			console.log(xhr.responseText);//true (but it is wrong now);
			console.log(textStatus);
			console.log(error);
			callback(xhr.status);
		},
		crossDomain: true
	});
}

function updateBubble(bubbleList, divId) {
	var div = document.getElementById(divId);
		var childDivs = div.getElementsByTagName("p");
		var len = childDivs.length;
		for (i = 0; i < len; i++) {
			div.removeChild(childDivs[0]);
		}

		bubbleList.forEach(function(item) {
			var newNode = document.createElement("p");
			console.log(item.description);
			newNode.innerHTML = item.description;
			newNode.className = "w3-display-topleft w3-xlarge w3-padding-xlarge";
			newNode.style = "cursor: pointer";
			div.appendChild(newNode);

			//create new popup window to download info of bubble
			newNode.addEventListener("click", function() {
					console.log(item.image_url);
					var divDialog = document.getElementById("divDialog");
					divDialog.style.display = "block";
					divDialog.firstChild.nextElementSibling.childNodes[1].src = item.image_url;
					var paragraph = document.getElementById("eventDescription");
					paragraph.innerHTML = item.description;

					var sendBtn = document.getElementById("sendToPhone");
					$(sendBtn).off("click").on("click", function(e) {
					    var _data = {
					        token: "test",
					        event_id: item.id
					    };
					    sendPhoneFromDispaly(_data, function(response) {
					        console.log(response);
					        if(response != "200")
					            alert("Sent error!");
					        else{
					            alert("Sent successfully!");
					            divDialog.style.display = "none";
					        }
					    });
					});
			} , false);
		});
}

function update(oneEventList, divId) {
	var div = document.getElementById(divId);
	if (div.firstChild) {
		var TITLE_DIV = div.firstChild;
		var childDivs = div.getElementsByTagName("div");
		var len = childDivs.length;
		for (i = 1; i < len; i++) {
			div.removeChild(childDivs[1]);
		}

		oneEventList.forEach(function(item) {
			//creat new a div "newNode" for image or text
			var newNode = document.createElement("div");
			//get id of event
			newNode.id = item.id;
			console.log(item.id);
			newNode.style.cursor = "pointer"
			newNode.className = "w3-image w3-padding-xlarge w3-round-large";

			//put img into the div "newNode"
			var img = document.createElement("img");
			img.src= item.image_url;
      img.alt = item.title;
			img.className = "w3-round-large";
			img.style.width = "100%";
			img.style.cursor = "pointer";
			$(img).height(260);

			//append img to the "newNode"
			newNode.appendChild(img);
      var divTitle = document.createElement("p");

      divTitle.style = "margin:0px 32px 0px 32px; width: 87.5%; position:absolute;bottom:5%;left:0;color:white; background-color: black; text-align:center; padding:4%; opacity:0.8";

      divTitle.innerHTML = item.title;

      newNode.appendChild(divTitle);
			//append div into events
			div.appendChild(newNode);

			//create new popup window for full info of an event
			img.addEventListener("click", function() {
			    console.log(item.image_url);
			    var divDialog = document.getElementById("divDialog");
			    divDialog.style.display = "block";
			    divDialog.firstChild.nextElementSibling.childNodes[1].src = item.image_url;
					var paragraph = document.getElementById("eventDescription");
					paragraph.innerHTML = item.description;

					var sendBtn = document.getElementById("sendToPhone");
					$(sendBtn).off("click").on("click", function(e) {
					    var _data = {
					        token: "test",
					        event_id: item.id
					    };
					    sendPhoneFromDispaly(_data, function(response) {
					        console.log(response);
					        if(response != "200")
					            alert("Sent error!");
					        else{
					            alert("Sent successfully!");
					            divDialog.style.display = "none";
					        }
					    });
					});
			} , false);
		});
	}
}

function updateCourse(courseList, divId) {
	var div = document.getElementById(divId);
	if (div.firstChild) {
		var TITLE_DIV = div.firstChild;
    var childDivs = div.childNodes;
		//var childDivs = div.getElementsByTagName("div");
		var len = childDivs.length;
		for (i = len - 1; i > 1; i--) {
			div.removeChild(childDivs[i]);
		}

    var childDivs = document.getElementById("course1").childNodes;
    var len = childDivs.length;
    for (i = len - 1; i > 0; i--) {
			document.getElementById("course1").removeChild(childDivs[i]);
		}
    var childDivs = document.getElementById("course2").childNodes;
    var len = childDivs.length;
    for (i = len - 1; i > 0; i--) {
			document.getElementById("course2").removeChild(childDivs[i]);
		}
    var index = 0;
		courseList.forEach(function(item) {
      index++;
			var newNode = document.createElement("div");
      if(index>2) {
        newNode.id = item.id;
        console.log(item.id);
        newNode.style.cursor = "pointer"
        newNode.className = "w3-display-container w3-padding-xlarge w3-round-large";
        newNode.style = "height: 260px";

        var paragraph = document.createElement("div");
        var date = new Date(item.start_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedStart = hours + ':' + minutes.substr(-2);
        var date = new Date(item.end_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedEnd = hours + ':' + minutes.substr(-2);
        paragraph.innerHTML = "<p>"+item.title + "</p><p>"+
                            item.address + "</p><p>"+formattedStart+"-"+formattedEnd+"</p>";
        // paragraph.innerHTML = item.description;
        paragraph.className = "w3-display-topleft w3-xlarge w3-padding-xlarge";
        //$(paragraph).height(260);

        console.log(item.description);
        newNode.appendChild(paragraph);

        div.appendChild(newNode);

        //create new popup window to download info of bubble
        paragraph.addEventListener("click", function() {
            console.log(item.image_url);
            var courseDiv = document.getElementById("courseDiv");
            courseDiv.style.display = "block";
            courseDiv.firstChild.nextElementSibling.childNodes[1].innerHTML = item.description;

            //add adress on
            courseDiv.firstChild.nextElementSibling.childNodes[2].innerHTML = item.address;

            var sendBtn = document.getElementById("sendToPhone");
            $(sendBtn).off("click").on("click", function(e) {
                var _data = {
                    token: "test",
                    event_id: item.id
                };
                sendPhoneFromDispaly(_data, function(response) {
                    console.log(response);
                    if(response != "200")
                        alert("Sent error!");
                    else{
                        alert("Sent successfully!");
                        divDialog.style.display = "none";
                    }
                });
            });
        } , false);

      }
      if(index == 1) {
        // newNode.id = item.id;
        // console.log(item.id);
        // newNode.style.cursor = "pointer"
        // newNode.className = "w3-display-container w3-padding-xlarge w3-round-large";
        // newNode.style = "height: 260px";
        //
        // var paragraph = document.createElement("div");
        var date = new Date(item.start_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedStart = hours + ':' + minutes.substr(-2);
        var date = new Date(item.end_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedEnd = hours + ':' + minutes.substr(-2);
        document.getElementById("course1").innerHTML = "<p style=\"font-size:200%;\">"+item.address + "</p><p style=\"font-size:200%;\">"+
                            item.title + "</p><p style=\"font-size:200%;\">"+formattedStart+"-"+formattedEnd+"</p>";
        // paragraph.className = "w3-display-topleft w3-xlarge w3-padding-xlarge";
        //$(paragraph).height(260);

        console.log(item.description);
        // newNode.appendChild(paragraph);

        //document.getElementById("course2").appendChild(newNode);

        //create new popup window to download info of bubble
        document.getElementById("course1").addEventListener("click", function() {
            console.log(item.image_url);
            var courseDiv = document.getElementById("courseDiv");
            courseDiv.style.display = "block";
            courseDiv.firstChild.nextElementSibling.childNodes[1].innerHTML = item.description;

            //add adress on
            courseDiv.firstChild.nextElementSibling.childNodes[2].innerHTML = item.address;

            var sendBtn = document.getElementById("sendToPhone");
            $(sendBtn).off("click").on("click", function(e) {
                var _data = {
                    token: "test",
                    event_id: item.id
                };
                sendPhoneFromDispaly(_data, function(response) {
                    console.log(response);
                    if(response != "200")
                        alert("Sent error!");
                    else{
                        alert("Sent successfully!");
                        divDialog.style.display = "none";
                    }
                });
            });
        } , false);
      }
      if(index == 2) {
        // newNode.id = item.id;
        // console.log(item.id);
        // newNode.style.cursor = "pointer"
        // newNode.className = "w3-display-container w3-padding-xlarge w3-round-large";
        // newNode.style = "height: 260px";
        //
        // var paragraph = document.createElement("div");
        var date = new Date(item.start_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedStart = hours + ':' + minutes.substr(-2);
        var date = new Date(item.end_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedEnd = hours + ':' + minutes.substr(-2);
        document.getElementById("course2").innerHTML = "<p style=\"font-size:200%;\">"+item.address + "</p><p style=\"font-size:200%;\">"+
                            item.title + "</p><p style=\"font-size:200%;\">"+formattedStart+"-"+formattedEnd+"</p>";
        // paragraph.className = "w3-display-topleft w3-xlarge w3-padding-xlarge";
        //$(paragraph).height(260);

        console.log(item.description);
        // newNode.appendChild(paragraph);

        //document.getElementById("course2").appendChild(newNode);

        //create new popup window to download info of bubble
        document.getElementById("course2").addEventListener("click", function() {
            console.log(item.image_url);
            var courseDiv = document.getElementById("courseDiv");
            courseDiv.style.display = "block";
            courseDiv.firstChild.nextElementSibling.childNodes[1].innerHTML = item.description;

            //add adress on
            courseDiv.firstChild.nextElementSibling.childNodes[2].innerHTML = item.address;

            var sendBtn = document.getElementById("sendToPhone");
            $(sendBtn).off("click").on("click", function(e) {
                var _data = {
                    token: "test",
                    event_id: item.id
                };
                sendPhoneFromDispaly(_data, function(response) {
                    console.log(response);
                    if(response != "200")
                        alert("Sent error!");
                    else{
                        alert("Sent successfully!");
                        divDialog.style.display = "none";
                    }
                });
            });
        } , false);
      }
		});
	}
}
