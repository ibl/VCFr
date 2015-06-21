window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		//var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {

				    vcf2rdf(reader.result, function(res){
                                        var blob = URL.createObjectURL(new Blob([res]));
                                            a = document.createElement("a");
                                            a.href = blob;
                                            a.download = 'myquad.nq';
                                            a.innerText = 'Save output';
                                            document.getElementById("vcfInput").appendChild( a );
                                            fileDisplayArea.innerText = res;
					})


				    console.log(parse_vcf(reader.result));
					
// 					fileDisplayArea.innerText = JSON.stringify( parse_vcf(reader.result) , null, 4);
					

				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
}