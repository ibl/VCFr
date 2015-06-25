window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		//var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
                                    //load vcf object as global
                                    vcf = parse_vcf(reader.result)
                                    //create button obj
                                    btn = document.createElement("button");
                                    btn.innerText = "Send JsonLd to Console";
                                    btn.className = "btn btn-default btn-file";
                                    btn.onclick = function(){
                                        vcf2jsonLd(vcf, function(a){vcfJsonLd = a})
                                    };
                                    
                                    document.getElementById("secondaryButtons").appendChild(btn);
				    
                                    console.log("vcf object avaliable")
                                    
                                    vcf2rdf(reader.result, function(res){
                                        var blob = URL.createObjectURL(new Blob([res]));
                                            a = document.createElement("a");
                                            a.href = blob;
                                            a.className = "btn btn-default btn-file";
                                            a.download = 'myquad.nq';
                                            a.innerText = 'Save output';
                                            document.getElementById("secondaryButtons").appendChild( a );
                                            fileDisplayArea.innerText = res;
					})

				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
}