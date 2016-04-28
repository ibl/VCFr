"use strict";
/*jshint multistr: true */  //use while developing
/*jslint devel: true */
/*jslint es5: true */

var mydomain = "http://vcf2rdf.org/app/v4_2/";
var vcfJson={};
var vcfJsonLd={};


//functions in use
var set_context_rec = function generate_context(domain, object) {
	var key, res, res_temp, attr;
    res = {};
	for (key in object) {
        if (object.hasOwnProperty(key)) {
            if (key !== "@context") {
                res[key] = domain + key;
                if (!Array.isArray(object[key]) && typeof object[key] === "object") {
                    res_temp = (generate_context(domain, object[key]));
                    for (attr in res_temp) {
                        if (res_temp.hasOwnProperty(attr)) {
                            res[attr] = res_temp[attr];
                        }
                    }
                }
            }
        }
    }
    return res;
};

function parse_head_line(head_line) {
    var res, key, i, h;
    res = {};
    res.data = {};

    head_line = head_line.slice(2); //drop ## at start of the line
        
    head_line = head_line.match(/([^\,\<]+=\"[^\>]+)|([^\,\<]+=[^\,\>]+)/g)
            .map(function (a) {return a.split("="); });

    if (head_line[0].length === 3 && head_line[0][1] === "<ID" && head_line[0][0] !== "") {
        key = head_line[0][0] + "_ID_" + head_line[0][2];
        res.name = key;
        for (i = 1; i < head_line.length; i += 1) {
            h = head_line[i];
            res.data[h[0]] = h[1];
        }
        res.data["@type"] = "v:" + head_line[0][0];

    } else if (head_line[0].length === 2 && head_line[0][0] !== "") {
        res.name = head_line[0][0];
        res.data = head_line[0][1];
    }

	return res;
}

function parse_format(FORMAT) {
	return FORMAT.split(":")
        .map(function (a) {
            return "FORMAT_ID_" + a;
        });
}

function parse_info(INFO) {
	var res = {};
	INFO.split(";")
                .map(function (a) {
                    return a.split("=");
		})
		.map(function (a) {
			if (a.length === 1) {
				res["INFO_ID_" + a[0]] = true;
			} else if (a.length === 2) {
				res["INFO_ID_" + a[0]] = a[1];
			} else if (a.length === 3) {
				console.log("error found on INFO field.");
			}
		});
	return res;
}


function parse_sample(FORMAT, Sample) {
	var res = {}, i;
	Sample = Sample.split(":");
	if (FORMAT.length !== Sample.length) {
		console.log("FORMAT does not have the same length of Sample");
	} else {
		for (i = 0; i < FORMAT.length; i += 1) {
			res[FORMAT[i]] = Sample[i];
		}
	}
	return res;
}

function parse_gt(gt, ref, alt) {
	var res = {};
        var all = [ref];
        all = all.concat(alt)
        res.gtString = gt; //preserve original string
	gt = gt.split(/([\/\|])/);
        

	if (gt.length > 3) {
		console.log("polyploid found, parser is compromised");
	} else if (gt.length === 3) {
                if (gt[0] == 0){
                res.firstParentalAllele = all[gt[0]];
            } else {
                
            }
		res.secondParentalAllele = all[gt[2]];

		if (gt[1] === "|") {
			res.phased = true;
		} else if (gt[1] === "/") {
			res.phased = false;
		}
	} else if (gt.length === 1) {
		res.allele = all[gt[0]];
	}

	return res;
}

function parse_alt(alt) {
	return alt.split(",");
}

function parse_colnames(colnames) {
    return colnames.slice(1).split(/\t/);
}

function parse_body_line(body_line, colnames, n_line) {
    var res = {}, i, myobj;
    res.name = "";
    body_line = body_line.split(/\t/);
    myobj = {};
    for (i = 0; i < body_line.length; i += 1) {
        var fieldname = colnames[i];
        var value = body_line[i];
        myobj[fieldname] = value;
        switch(fieldname) {
            case "CHROM":
                myobj[fieldname] = value;
                break;
            case "POS":
                myobj[fieldname] = value;
                break;
            case "ID":
                myobj[fieldname] = value;
                break;
            case "REF":
                myobj[fieldname] = value;
                break;
            case "QUAL":
                myobj[fieldname] = value;
                break;
            case "FILTER":
                myobj[fieldname] = value;
                break;
            case "ALT":
                myobj[fieldname] = parse_alt(value);
                break;
            case "INFO":
                myobj[fieldname] = parse_info(value);
                break;
            case "FORMAT":
                myobj[fieldname] = parse_format(value);
                break;
            default:
                myobj[fieldname] = parse_sample(myobj["FORMAT"],value);
                myobj[fieldname]["FORMAT_ID_GT"] = parse_gt(myobj[fieldname]["FORMAT_ID_GT"],myobj["REF"], myobj["ALT"] );
                delete myobj["FORMAT"];
                delete myobj["ALT"];

        }
    }
    res.name = "row_" + n_line;
    res.data = myobj;
    return res;
}

function parse_vcf(vcf) {
	var res = {}, colnames = [], i, line;
    vcf = vcf.split("\n");
	res.head = {};
	res.body = {};

	for (i = 0; i < vcf.length; i += 1) {
		if (vcf[i].slice(0, 2) === "##") {
			line = parse_head_line(vcf[i]);
			res.head[line.name] = line.data;
		} else if (vcf[i][0] === "#" && vcf[i][1] !== "#") {
			colnames = parse_colnames(vcf[i]);
		} else if (vcf[i][0] !== "#") {
			line = parse_body_line(vcf[i], colnames, i);
			res.body[line.name] = line.data;
		}
	}
	return res;
}

function keyValueToJson(resourceName, url) {
    if (!url.endsWith("/")){
        url = url + "/";
    }
    var res = '{"@context":{';
    var i;
    for (i=0; i<resourceName.length ; i++){
        res = res + '"' + resourceName[i] + '":"' + url + resourceName[i] + '",';
    }
    if (res.endsWith(",")){
        res = res.substring(0, res.length-1);
    }
    res = res + "}}";
    return JSON.parse(res);
}

function addPrefix(prefix, obj){
    var build, key, value;

    build = {};
    for (key in obj) {
        value = obj[key];
        if (key !== "@type"){
            if (typeof value === "object") {
                value = addPrefix(prefix, value);
            }
            build[prefix + key] = value;
        } else {
            build[key] = value;
        }
            
    }
    return build;
}


function vcf2jsonLd(vcfObj, callback) {
    var docContext = [];
    var res=[];
    var i;
    var out;

    Papa.parse("https://rawgit.com/diegopenhanut/vcf-resources/gh-pages/v4_2/structure.csv", {
	   download: true,
	   complete: function(csv) {
           console.log("csv Loaded");
           for (var i = 0 ; i < csv["data"].length; i++){
           		res[i]=csv["data"][i][0];
            }
           
            vcfObj = addPrefix("v:", vcfObj);
            vcfObj["@context"] = {};
            vcfObj["@context"].v = mydomain;
            
            callback(vcfObj);
            console.log("vcfJsonLd object avaliable");
            
	   }
    });
}

function vcfJsonLd2nq(vcfJsonLdObj, callback){
    jsonld.toRDF(vcfJsonLdObj, {format: 'application/nquads'}, function(err, nquads) {
        callback(nquads);
    });
}



function vcf2rdf(vcfString, callback) {
    
    // service that alows to serve raw content of github
    var docContext = [];
    var vcf;
    var res=[];
    var i;
    var out;

    Papa.parse("https://rawgit.com/diegopenhanut/vcf-resources/gh-pages/v4_2/structure.csv", {
	   download: true,
	   complete: function(csv) {
           console.log("csv Loaded");
           for (var i = 0 ; i < csv["data"].length; i++){
           		res[i]=csv["data"][i][0];
           }
			
			vcf = parse_vcf(vcfString);
                        
                        vcf2jsonLd(vcf, function(a){
                            jsonld.toRDF(a, {format: 'application/nquads'}, function(err, nquads) {
                                out = nquads; 
                                callback(out);
                            });
                        });
            
	   }
    });
}

function getGenes(){
    Papa.parse("https://rawgit.com/ibl/VCFr/gh-pages/resources/allGenes.txt",  
    {download: true, complete: function(csv) { console.log(csv)}})    
}

