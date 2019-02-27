function convertStringToArray(string) {
	var entries = [];
	if (string)
		entries = string.split(";");
	var returnArray = [];
	for (e of entries) {
		if (e.length > 0) {
			var properties = e.split(",");
			returnArray.push({name: properties[0], adults: parseInt(properties[1]), kids: parseInt(properties[2])});
		}
	}
	return returnArray;
}

function convertArrayToString(array) {
	returnString = "";
	array.forEach((e) => returnString += e.name + "," + e.adults + "," + e.kids + ";");
	returnString.substr(0, returnString.length - 1);
	return returnString;
}