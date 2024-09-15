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
// The old-n-busted callback way

const resultObject = {};

function getFile(file) {

	fakeAjax(file,function(text){
		resultObject[file] = text;

		if (file === 'file1'){
			console.log(text);
			delete resultObject[file];
		}

		if (file === 'file2'){
			if (resultObject['file1']){
				console.log(resultObject['file1'])
				console.log(resultObject['file2'])
				delete resultObject['file1'];
				delete resultObject['file2'];
			}
		}

		if (file === 'file3'){
			if (resultObject['file1'] && resultObject['file2']){
				console.log(resultObject['file1'])
				console.log(resultObject['file2'])
				delete resultObject['file1'];
				delete resultObject['file2'];
				delete resultObject['file3'];
			}
		}


	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
