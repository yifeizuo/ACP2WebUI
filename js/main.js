$(document).ready(function(){
	var DISPLAY_REQUEST = {
		token: "test",
		categories: [1,2,3,4,5],
		limit: 10
	};

	var NOTIFY_DEVICE = {
		token: "test",
		event_id: 1
	};

	pollServer(DISPLAY_REQUEST);
	//sendPhoneFromDispaly(NOTIFY_DEVICE, function(){});

	$.ajax({
		url: "https://acp.velho.xyz/categories",
		type: "GET",
		success: function(response) {
			console.log(response);
		}
	});
});

function pollServer(data) {
	var DisplayResponse = [{
		"id": 1,
		"title": "Asd",
		"categories" : [ 1,6,7],
		"description": "Flow Festival 2016 12.to 14.8.2016 Suvilahti, Helsink, is this the world's most achingly cool festival? '-'Forbes",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "https://darw0tdisu865.cloudfront.net/media/photos/FlowFestival2016_V2.jpg",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 2,
		"title": "Asd",
		"categories" : [ 2,6,8],
		"description": "asdasdasdasd",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "https://events.ucsb.edu/wp-content/uploads/2015/12/IMG-4707.jpg",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 3,
		"title": "Asd",
		"categories" : [ 3,6,8],
		"description": "Are you interested in recruiting or finding a job in Europe? Then the European Job Days are exactly what you need! European Job Days are dynamic recruitment events that bring jobseekers and employers together. Jobseekers can find not only recruitment opportunities but also practical information and...",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F17381208%252F103917075991%252F1%252Foriginal.jpg%3Frect%3D206%252C0%252C440%252C220%26s%3Dbde907500caccf1af329f6853f3a1285?h=230&w=460&s=cb7a788493f79f877b4dffd2129be012",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 4,
		"title": "Asd",
		"categories" : [ 3,6,8],
		"description": "asdasdasdasd",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "http://na2.www.gartner.com/imagesrv/careers/images/feature/featured-img-1.jpg;wa31c0ad993903c763",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 5,
		"title": "Asd",
		"categories" : [ 2,6,8],
		"description": "asdasdasdasd",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F17296008%252F90078831641%252F1%252Foriginal.jpg%3Frect%3D0%252C0%252C1688%252C844%26s%3D0907d673a969443566159edd76c75283?h=230&w=460&s=c084508066a4752c0e4d2e29246b2c41",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 6,
		"title": "Asd",
		"categories" : [ 4,6,8],
		"description": "McDonalds",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "http://edge.alluremedia.com.au/m/l/2014/08/McDonalds.jpg",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 7,
		"title": "Asd",
		"categories" : [ 4,6,8],
		"description": "asdasdasdasd",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "http://www.ixonos.com/backend/sites/default/files/img-ixonoscom/content/hullut_paivat.png",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 8,
		"title": "Asd",
		"categories" : [ 5,6,8],
		"description": "Machine Learning Lecture TS107",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "null",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	},
	{
		"id": 9,
		"title": "Asd",
		"categories" : [ 5,6,8],
		"description": "Big data process TS127",
		"address": "sesami street 2",
		"price" : "12,4€",
		"image_url": "null",
		"start_timestamp": 1456318976,
		"end_timestamp": 1456918976
	}];

	$.ajax({
		url: "https://acp.velho.xyz/display/events",
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
  	dataType: "json",
		success: function(response) {
			console.log("have response from server");
			//do sth
			response = DisplayResponse;
			/*setTimeout(function() {
				pollServer(data);
			}, 5000);*/

			var response = DisplayResponse;
			var length = response.length;
			var eventList = [], jobList = [], adList = [], bubbleList = [], courseList = [];

			response.forEach(function(item){
			  switch (item.categories[0]) {
			      //bubble
			    case 1:
			      bubbleList.push(item);
						break;
			    case 2:
			      eventList.push(item);
						break;
			    case 3:
			      jobList.push(item);
						break;
			    case 4:
			      adList.push(item);
						break;
			    case 5:
			      courseList.push(item);
						break;
					default:
						break;
			  }
			});
			console.log("eventList");
			console.log(eventList);
			console.log(bubbleList);

			updateBubble(bubbleList, "bubbleStream");

			update(eventList, "events");
			update(jobList, "jobs");
			update(adList, "ads");

			updateCourse(courseList,"courseMore");
		},
		fail: function(){
			console.log("fail");
		},
		crossDomain: true
	});
}

function sendPhoneFromDispaly(data, callback) {
	$.ajax({
		url: "https://acp.velho.xyz/display/notify",
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
					sendBtn.addEventListener("click", function() {
							var _data = {
									token: "test",
									event_id: item.id
							};
							sendPhoneFromDispaly(_data, function(response) {
									console.log(response);
									if(response != "200")
										alert("Sent error");//should be sent error, just using fake data;
									else {
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
			img.className = "w3-round-large";
			img.style.width = "100%";
			img.style.cursor = "pointer";
			$(img).height(260);

			//append img to the "newNode"
			newNode.appendChild(img);
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
			    sendBtn.addEventListener("click", function() {
			        var _data = {
			            token: "test",
			            event_id: item.id
			        };
			        sendPhoneFromDispaly(_data, function(response) {
			            console.log(response);
									if(response != "200")
										alert("Sent error");
									else {
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
		var childDivs = div.getElementsByTagName("div");
		var len = childDivs.length;
		for (i = 1; i < len; i++) {
			div.removeChild(childDivs[1]);
		}

		courseList.forEach(function(item) {
			var newNode = document.createElement("div");

			newNode.id = item.id;
			console.log(item.id);
			newNode.style.cursor = "pointer"
			newNode.className = "w3-display-container";
			newNode.style = "height: 260px";

			var paragraph = document.createElement("div");
			paragraph.innerHTML = item.description;
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

					var sendBtn = document.getElementById("sendToPhone");
					sendBtn.addEventListener("click", function() {
							var _data = {
									token: "test",
									event_id: item.id
							};
							sendPhoneFromDispaly(_data, function(response) {
									console.log(response);
									if(response != "200")
										alert("Sent error");
									else {
										alert("Sent successfully!");
										courseDiv.style.display = "none";
									}
							});
					});
			} , false);
		});
	}
}
