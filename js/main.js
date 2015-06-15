window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		//var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {

				    vcf2rdf(reader.result, function(a){
				        var lala = a;
					   fileDisplayArea.innerText = lala;
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
