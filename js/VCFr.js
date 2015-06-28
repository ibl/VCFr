"use strict";
/*jshint multistr: true */  //use while developing
/*jslint devel: true */
/*jslint es5: true */

var mydomain = "http://diegopenhanut.github.io/vcf-resources/v4_2/";
var vcfJson={};
var vcfJsonLd={};

// test variables
// var mystring = '##fileformat=VCFv4.0\n\
// ##fileDate=20111031\n\
// ##center=UCSC\n\
// ##source="bambam pipeline v1.4"\n\
// ##reference=<ID=grch37-lite,source="ftp://ftp.ncbi.nih.gov/genbank/genomes/Eukaryotes/vertebrates_mammals/Homo_sapiens/GRCh37/special_requests/GRCh37-lite.fa.gz">\n\
// ##phasing=none\n\
// ##INDIVIDUAL=TCGA-AN-A0FN\n\
// ##SAMPLE=<ID=NORMAL,SampleUUID=cab9af86-5f00-4d36-8d62-424add7d7492,SampleTCGABarcode=TCGA-AN-A0FN-10A-01W-A055-09,Individual=TCGA-AN-A0FN,Description="Normal Sample",File=/inside/home/cwilks/bb_pipeline/runs/brca_freeze/bams/TCGA-AN-A0FN-10A-01W-A055-09_IlluminaGA-DNASeq_exome.bam,Platform=Illumina,Source=CGHub,Accession=14870d32-bbf4-4ec0-8d06-f42d4f7eb869,SequenceSource=WXS,softwareName=<bambam>,sotwareVer=<1.4>,softwareParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
// ##SAMPLE=<ID=PRIMARY,SampleUUID=8f583981-b257-43ee-9c9e-71a192a49d38,SampleTCGABarcode=TCGA-AN-A0FN-01A-11W-A050-09,Individual=TCGA-AN-A0FN,Description="Primary Tumor",File=/inside/home/cwilks/bb_pipeline/runs/brca_freeze/bams/TCGA-AN-A0FN-01A-11W-A050-09_IlluminaGA-DNASeq_exome.bam,Platform=Illumina,Source=CGHub,Accession=9916ae94-ee9a-469d-a560-d5b457c9e02a,SequenceSource=WXS,softwareName=<bambam>,sotwareVer=<1.4>,softwareParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
// ##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership">\n\
// ##INFO=<ID=SOMATIC,Number=0,Type=Flag,Description="Indicates if record is a somatic mutation">\n\
// ##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth across samples">\n\
// ##INFO=<ID=DEL,Number=1,Type=Integer,Description="Deletion X bps away">\n\
// ##INFO=<ID=INS,Number=1,Type=Integer,Description="Insertion X bps away">\n\
// ##INFO=<ID=ProtCh,Number=1,Type=String,Description="Protein change due to somatic variant">\n\
// ##INFO=<ID=SS,Number=1,Type=Integer,Description="Somatic status of sample">\n\
// ##INFO=<ID=fa20,Number=0,Type=Flag,Description="Fraction of ALT below 20% of reads">\n\
// ##FILTER=<ID=q10,Description="Genotype Quality < 10">\n\
// ##FILTER=<ID=blq,Description="Position overlaps 1000 Genomes Project mapping quality blacklist">\n\
// ##FILTER=<ID=bldp,Description="Position overlap 1000 Genomes Project depth blacklist">\n\
// ##FILTER=<ID=ma,Description="Position in germline has 2+ support for 2+ alleles">\n\
// ##FILTER=<ID=idl10,Description="Position is within 10 bases of an indel">\n\
// ##FILTER=<ID=idls5,Description="Less than 5 reads supporting indel in appropriate tissue">\n\
// ##FILTER=<ID=pbias,Description="Positional bias, all reads supporting ALT are in first or last third of read">\n\
// ##FILTER=<ID=sbias,Description="Strand bias, majority of reads supporting ALT are on forward OR reverse strand">\n\
// ##FILTER=<ID=mc3,Description="Greater than 3 reads of somatic allele in germline">\n\
// ##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">\n\
// ##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read depth at this position in the sample">\n\
// ##FORMAT=<ID=BQ,Number=.,Type=Integer,Description="Average base quality for reads supporting alleles">\n\
// ##FORMAT=<ID=MQ,Number=1,Type=Integer,Description="Phred style probability score that the variant is novel with respect to the genomes ancestor">\n\
// ##FORMAT=<ID=MQA,Number=.,Type=Float,Description="Average mapping quality for reads supporting alleles">\n\
// ##FORMAT=<ID=SB,Number=.,Type=Float,Description="Strand Bias for reads supporting alleles 0/1/2/3">\n\
// ##FORMAT=<ID=AD,Number=.,Type=Integer,Description="Depth of reads supporting alleles 0/1/2/3...">\n\
// ##FORMAT=<ID=FA,Number=1,Type=Float,Description="Fraction of reads supporting ALT">\n\
// ##FORMAT=<ID=SS,Number=1,Type=Integer,Description="Variant status relative to non-adjacent Normal,0=wildtype,1=germline,2=somatic,3=LOH,4=post-transcriptional modification,5=unknown">\n\
// ##FORMAT=<ID=SSC,Number=1,Type=Integer,Description="Somatic score between 0 and 255">\n\
// ##tcgaversion=1.1\n\
// ##vcfProcessLog=<InputVCF=</inside/home/singer/data/brca/original/TCGA-AN-A0FN_W_IlluminaGA-DNASeq_exome.vcf>,InputVCFSource=<bambam>,InputVCFVer=<1.4>,InputVCFParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
// ##SnpEffVersion="4.1a (build 2015-01-14), by Pablo Cingolani"\n\
// ##SnpEffCmd="SnpEff  -no-upstream -no-downstream -formatEff hg19 ../tcga/brca/ucsc.edu_BRCA.IlluminaGA_DNASeq_Cont.Level_2.1.1.0/data/TCGA-AN-A0FN_W_IlluminaGA-DNASeq_exome.vcf.gz "\n\
// ##INFO=<ID=EFF,Number=.,Type=String,Description="Predicted effects for this variant.Format: Effect ( Effect_Impact | Functional_Class | Codon_Change | Amino_Acid_Change| Amino_Acid_length | Gene_Name | Transcript_BioType | Gene_Coding | Transcript_ID | Exon_Rank  | Genotype_Number [ | ERRORS | WARNINGS ] ) ">\n\
// ##INFO=<ID=LOF,Number=.,Type=String,Description="Predicted loss of function effects for this variant. Format: Gene_Name | Gene_ID | Number_of_transcripts_in_gene | Percent_of_transcripts_affected ">\n\
// ##INFO=<ID=NMD,Number=.,Type=String,Description="Predicted nonsense mediated decay effects for this variant. Format: Gene_Name | Gene_ID | Number_of_transcripts_in_gene | Percent_of_transcripts_affected ">\n\
// #CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	NORMAL	PRIMARY\n\
// 1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7\n\
// 1	889158	rs56262069	G	C	26.0	PASS	SS=1;VT=SNP;DB;DP=11;EFF=splice_region_variant+intron_variant(LOW|||c.888+4C>G|749|NOC2L|protein_coding|CODING|NM_015658.3|8|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:5:0,5:0,36:0:0,0.2:1.0:0:26:0,60.0	1/1:6:0,6:0,35:0:0,0.167:1.0:1:26:0,60.0\n\
// 1	889159	rs13302945	A	C	26.0	PASS	SS=1;VT=SNP;DB;DP=11;EFF=splice_region_variant+intron_variant(LOW|||c.888+3T>G|749|NOC2L|protein_coding|CODING|NM_015658.3|8|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:5:0,5:0,36:0:0,0.2:1.0:0:26:0,60.0	1/1:6:0,6:0,35:0:0,0.167:1.0:1:26:0,60.0';



 var shortstring = '##source="bambam pipeline v1.4"\n\
 ##reference=<ID=grch37-lite,source="ftp://ftp.ncbi.nih.gov/genbank/genomes/Eukaryotes/vertebrates_mammals/Homo_sapiens/GRCh37/special_requests/GRCh37-lite.fa.gz">\n\
 ##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership">\n\
 #CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	NORMAL	PRIMARY\n\
 1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7\n\
 1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7';

 var dissetationString = '##fileformat=VCFv4.0\n\
 ##INFO=<ID=DB,Number=0,Type=Flag,Description=\"dbSNP membership">\n\
 ##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth across samples">\n\
 ##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">\n\
 ##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read depth at this position in the sample">\n\
 ##FORMAT=<ID=BQ,Number=.,Type=Integer,Description="Average base quality for reads supporting alleles">\n\
 ##SAMPLE=<ID=PRIMARY,SampleUUID=8f583981-b257-43ee-9c9e-71a192a49d38,SampleTCGABarcode=TCGA-AN-A0FN-01A-11W-A050-09,Individual=TCGA-AN-A0FN,Description="Primary Tumor">\n\
 #CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	PRIMARY\n\
 1	888659	rs3748597	T	C	81.0	PASS	DB;VT=SNP;DP=41	GT:DP:AD	1/1:21:0,21';


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


//TODO ##INFO=<ID=VT,Number=1,Type=String,Description="Variant type, can be SNP, INS or DEL">\n\ 
// fix the parser to handle correctly this line. I should capture <>, "", and then \,


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
            //res.data["@type"] = "";
            //res.data["@type"] = mydomain+head_line[0][0];
        }

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
	res.INFO = {};
	
	INFO.split(";")
                .map(function (a) {
                    return a.split("=");
		})
		.map(function (a) {
			if (a.length === 1) {
				res.INFO[a[0]] = true;
			} else if (a.length === 2) {
				res.INFO[a[0]] = a[1];
			} else if (a.length === 3) {
				console.log("error found on INFO field.");
			}
		});
                
             
	return res;
}


function parse_sample(FORMAT, Sample) {
	var res = {}, i;
	res.FORMAT = {};
	Sample = Sample.split(":");
	if (FORMAT.length !== Sample.length) {
		console.log("FORMAT does not have the same length of Sample");
	} else {
		for (i = 0; i < FORMAT.length; i += 1) {
			res.FORMAT[FORMAT[i]] = Sample[i];
		}
	}
	return res;
}

function parse_gt(gt) {
	var res = {};
	res.gt = {};
	gt = gt.split(/([\/\|])/);

	if (gt.length > 3) {
		console.log("polyploid found, parser is compromised");
	} else if (gt.length === 3) {
		res.gt.firstParentalAllele = gt[0];
		res.gt.secondParentalAllele = gt[2];

		if (gt[1] === "|") {
			res.gt.phased = true;
		} else if (gt[1] === "/") {
			res.gt.phased = false;
		}
	} else if (gt.length === 1) {
		res.gt.allele = gt[0];
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
		myobj[colnames[i]] = body_line[i];
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
        res = res + '"' + resourceName[i] + '":"' + url + resourceName[i] + '",'
    }
    if (res.endsWith(",")){
        res = res.substring(0, res.length-1)
    }
    res = res + "}}";
    return JSON.parse(res);
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
            docContext = keyValueToJson(res , mydomain);
           //vcf = parse_vcf(vcfObj);
            vcfObj["@context"] = set_context_rec(mydomain, vcfObj);	
            $.extend( true , docContext, vcfObj);
//             console.log(JSON.stringify(docContext, null, 4));
            callback(docContext);
            console.log("vcfJsonLd object avaliable")
            
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
			docContext = keyValueToJson(res , mydomain);
			
			vcf = parse_vcf(vcfString);
			vcf["@context"] = set_context_rec(mydomain, vcf);
			
           	
           	$.extend( true , docContext, vcf);
//             console.log("########")
//             console.log(JSON.stringify(docContext, null, 4));

            jsonld.toRDF(docContext, {format: 'application/nquads'}, function(err, nquads) {
            	out = nquads; 
            	callback(out);
            	});
	   }
    });
}

function getGenes(){
Papa.parse("https://rawgit.com/ibl/VCFr/gh-pages/resources/allGenes.txt",  
{download: true, complete: function(csv) { console.log(csv)}})    
}
