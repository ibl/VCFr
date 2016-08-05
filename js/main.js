window.onload = function() {
		var fileInput = document.getElementById('fileInput');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
                                    //load vcf object as global
                                    vcf = parse_vcf(reader.result)
                                    
                                        vcf2jsonLd(vcf, function(a){vcfJsonLd = a});
				    
                                    console.log("vcf object avaliable")
                                    
                                    vcf2rdf(reader.result, function(res){
					var innerJson = JSON.stringify(vcfJsonLd, null, 3)
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

				reader.readAsText(file);	
			} else {
				nquadsDisplayArea.innerText = "File not supported!"
				jsonDisplayArea.innerText = "File not supported!"
			}
		});
}
