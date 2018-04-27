(function(){
    if( ! document.baseURI.includes('dataURL') ){
	var base_url = window.location.href; 
	console.log(base_url);
	var exampleLink = base_url + "?dataURL=https://raw.githubusercontent.com/vcftools/vcftools/master/examples/valid-4.1.vcf";
	//var exampleLink = base_url + "?dataURL=valid-4.1.vcf";
	console.log(exampleLink);
	var a = document.createElement("a");
	a.href = exampleLink;
	a.className = "btn btn-default btn-file";
	a.innerText = "Load Demo";
	document.getElementById("demo").appendChild( a );
    }
})();

populatePanelsWithReaderResult = function(rr) {
    vcf = parse_vcf(rr);
    vcf2jsonLd(vcf, function(a){vcfJsonLd = a});

    vcf2rdf(rr, function(res){
	var innerJson = JSON.stringify(vcfJsonLd, null, 3);
	var blobNquad = URL.createObjectURL(new Blob([res]));
	var blobJSON = URL.createObjectURL(new Blob([innerJson]));

	a = document.createElement("a");
	a.href = blobNquad;
	a.className = "btn btn-default btn-file col-md-6";
	a.download = 'myquad.nq';
	a.innerText = 'Save Nquad output';
	document.getElementById("secondaryButtons").appendChild( a );

	b = document.createElement("a");
	b.href = blobJSON;
	b.className = "btn btn-default btn-file col-md-6";
	b.download = 'vcfJsonLd.json';
	b.innerText = 'Save JSON output';
	document.getElementById("secondaryButtons").appendChild( b );

	nquadsDisplayArea.innerText = res;
	jsonDisplayArea.innerText = innerJson;;
    })
}

window.onload = function() {

    // Test if url has ?something
    if(document.baseURI.includes('dataURL')){
    var fileToGet = document.baseURI.split("?dataURL=")[1];
    
	
	$.get(fileToGet)
	    .then(function(a){
		console.log(a.slice(0,5000));
		vcf2rdf(a, function(b){
		    vcfJsonLd = b;
		    populatePanelsWithReaderResult(a)});

	    })
	    .fail(function(){
	    		
	    	var a = document.createElement("div");
	    	a.className="alert alert-danger";
	    	a.innerText = "Failed to get file.\n\nPlease provide a url like the one below:\n\n" + location.pathname + "?dataURL=<link a vcf file>";
	    	document.getElementById("demo").appendChild(a);
		});
    }

    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
	var file = fileInput.files[0];
	var textType = /text.*/;

	if (file.type.match(textType)) {
	    var reader = new FileReader();

	    reader.onload = function(e) {
		populatePanelsWithReaderResult(reader.result);

	    }

	    reader.readAsText(file);	
	} else {
	    nquadsDisplayArea.innerText = "Only VCF version 4.2 is supported"
		jsonDisplayArea.innerText = "Only VCF version 4.2 is supported" 
	}
    });
}
