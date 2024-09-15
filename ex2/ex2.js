function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	var resultFunc = function(text){
		return text;
	}
	fakeAjax(file, resultFunc);

	return resultFunc;
}

var thunk1 = getFile('file1');
var thunk2 = getFile('file2');
var thunk3 = getFile('file3');

thunk1(function(text){
	output(text);
	thunk2(function(text){
		output(text);
		thunk3(function(text){
			output(text);
			output("Completed!");
		})
	})
})