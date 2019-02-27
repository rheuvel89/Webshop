function appendItem(item, attractions) {
	var template = document.getElementById('ticket').content.cloneNode(true);
	template.querySelector(".parkname").innerText = item.name;
	template.querySelector(".adults").innerText = "Adults: " + item.adults;
	template.querySelector(".kids").innerText = "Kids: " + item.kids;
	attraction = attractions.find(a => item.name === a.name);
	if (attraction) {
		var discount = item.adults >= attraction.minimumNumberOfAdults && item.kids >= attraction.minimumNumberOfKids ? 1 - attraction.discount/100 : 1;
		template.querySelector(".total").innerText = ﻿"Total: €" + Math.floor((attraction.adultPrice*item.adults + attraction.kidsPrice*item.kids)*discount) + ",-";
	} else {
		template.querySelector(".total").innerText = ﻿"Total: €" + "-,-";
	}
	document.body.querySelector("main").insertBefore(template, document.body.querySelector("#finalizepaymentbutton").parentNode);
}

function fetchCallback(response) {
	localStorage.setItem("sogyoadventures", "");
	document.querySelector("#shoppingbasket").querySelector(".badge").innerText = 0;
	window.location.replace("./orderplaced.html");
}

function payButtonClicked(e) {
	console.log("Pay button clicked!");
	var array = convertStringToArray(localStorage.getItem("sogyoadventures"));
	fetch("./api/placeorder", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(array), // body data type must match "Content-Type" header
    }).then(fetchCallback);
}
	
var array = convertStringToArray(localStorage.getItem("sogyoadventures"));
document.querySelector("#shoppingbasket").querySelector(".badge").innerText = array.length;

function onFetchSucceeded(json) {
	array.forEach(i => appendItem(i, json));
}
fetch("/api/attractions").then(data => data.json()).then(onFetchSucceeded);

var payButton = document.querySelector("#finalizepaymentbutton");
payButton.addEventListener("click", payButtonClicked);
/*
	if (ticket && ticket.adults >= item.minimumNumberOfAdults && ticket.kids >= item.minimumNumberOfKids ) {
		template.querySelector(".discountrequirement").innerText = ﻿"Total: €" + Math.floor((item.adultPrice*ticket.adults + item.kidsPrice*ticket.kids)*(1 - item.discount/100)) + ",-";
	} else {
		template.querySelector(".discountrequirement").innerText = ﻿"Total: €0,-";
	}
*/