
function saveOrderInShoppingBasket(attractionName, numberOfAdults, numberOfKids) {
	array = convertStringToArray(localStorage.getItem("sogyoadventures"));
	attraction = array.find(e => e.name == attractionName);
	if (attraction) {
		array.splice(array.indexOf(attraction), 1)
	}
	array.push({name: attractionName, adults: numberOfAdults, kids: numberOfKids})
	localStorage.setItem("sogyoadventures", convertArrayToString(array));
	document.querySelector("#shoppingbasket").querySelector(".badge").innerText = array.length;
	console.log("Order " + attractionName + " for " + numberOfAdults + " adults and " + numberOfKids + " children saved in shopping basket!");
}

function orderButtonClicked(e) {	
	var article = e.target.parentElement.parentElement;
	var attractionName = article.querySelector(".parkname").innerHTML;
	var numberOfAdults = parseInt(article.querySelector(".numberofadults").value);
	var numberOfKids = parseInt(article.querySelector(".numberofkids").value);
	console.log("Order button clicked!");
	if (!Number.isNaN(numberOfAdults) && !Number.isNaN(numberOfKids)) {
		saveOrderInShoppingBasket(attractionName, numberOfAdults, numberOfKids);
	} else  {
		console.log("Invalid input: no order placed!");
	}
}

function addChangeEventListener(item, template) {
	function onFieldChanged(e) {
		var article = e.target.parentElement.parentElement;
		var numberOfAdults = parseInt(article.querySelector(".numberofadults").value);
		var numberOfKids = parseInt(article.querySelector(".numberofkids").value);
		numberOfAdults = numberOfAdults ? numberOfAdults : 0;
		numberOfKids = numberOfKids ? numberOfKids : 0;
		var discount = numberOfAdults >= item.minimumNumberOfAdults && numberOfKids >= item.minimumNumberOfKids ? 1 - item.discount/100 : 1;
		article.querySelector(".adultprice").innerText = "Adults: €" + Math.floor(item.adultPrice*discount) + ",-";
		article.querySelector(".kidsprice").innerText = "Kids: €" + Math.floor(item.kidsPrice*discount) + ",-";
		article.querySelector(".total").innerText = ﻿"Total: €" + Math.floor((item.adultPrice*numberOfAdults + item.kidsPrice*numberOfKids)*discount) + ",-";
	}
	template.querySelector(".numberofadults").addEventListener("change", onFieldChanged)
	template.querySelector(".numberofkids").addEventListener("change", onFieldChanged)
}

function fillTemplate(item, template) {
	template.querySelector(".parkname").innerText = item.name;
	template.querySelector(".parkdescription").innerText = item.description;
	template.querySelector(".adultprice").innerText = "Adults: €" + item.adultPrice + ",-";
	template.querySelector(".kidsprice").innerText = "Kids: €" + item.kidsPrice + ",-";
	template.querySelector(".discountrequirement").innerHTML = ﻿"<em>Family ticket:</em> Buy " + item.minimumNumberOfAdults + " adult tickets & " + item.minimumNumberOfKids + " kid tickets for a " + item.discount + "% discount!";
	template.querySelector(".total").innerText = ﻿"Total: €0,-";
	addChangeEventListener(item, template);
	return template;
}

function appendItem(item) {
	if (item.available > 0) { //TODO: Disable order button instead of removing item
		var template = document.getElementById('article_template').content.cloneNode(true);
		template = fillTemplate(item, template);
		document.body.querySelector("main").appendChild(template);
		var orderButtons = document.querySelectorAll(".orderbutton");
		orderButtons.forEach((item) => item.addEventListener("click", orderButtonClicked));
	}
}

function onFetchSucceeded(json) {
	json.forEach(i => appendItem(i));
}

fetch("/api/attractions").then(data => data.json()).then(onFetchSucceeded);
