"use strict";
/*jshint multistr: true */  //use while developing
/*jslint devel: true */
/*jslint es5: true */

function loadObjects(
//test variables
mystring = '##fileformat=VCFv4.0\n\
##fileDate=20111031\n\
##center=UCSC\n\
##source="bambam pipeline v1.4"\n\
##reference=<ID=grch37-lite,source="ftp://ftp.ncbi.nih.gov/genbank/genomes/Eukaryotes/vertebrates_mammals/Homo_sapiens/GRCh37/special_requests/GRCh37-lite.fa.gz">\n\
##phasing=none\n\
##INDIVIDUAL=TCGA-AN-A0FN\n\
##SAMPLE=<ID=NORMAL,SampleUUID=cab9af86-5f00-4d36-8d62-424add7d7492,SampleTCGABarcode=TCGA-AN-A0FN-10A-01W-A055-09,Individual=TCGA-AN-A0FN,Description="Normal Sample",File=/inside/home/cwilks/bb_pipeline/runs/brca_freeze/bams/TCGA-AN-A0FN-10A-01W-A055-09_IlluminaGA-DNASeq_exome.bam,Platform=Illumina,Source=CGHub,Accession=14870d32-bbf4-4ec0-8d06-f42d4f7eb869,SequenceSource=WXS,softwareName=<bambam>,sotwareVer=<1.4>,softwareParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
##SAMPLE=<ID=PRIMARY,SampleUUID=8f583981-b257-43ee-9c9e-71a192a49d38,SampleTCGABarcode=TCGA-AN-A0FN-01A-11W-A050-09,Individual=TCGA-AN-A0FN,Description="Primary Tumor",File=/inside/home/cwilks/bb_pipeline/runs/brca_freeze/bams/TCGA-AN-A0FN-01A-11W-A050-09_IlluminaGA-DNASeq_exome.bam,Platform=Illumina,Source=CGHub,Accession=9916ae94-ee9a-469d-a560-d5b457c9e02a,SequenceSource=WXS,softwareName=<bambam>,sotwareVer=<1.4>,softwareParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership">\n\
##INFO=<ID=SOMATIC,Number=0,Type=Flag,Description="Indicates if record is a somatic mutation">\n\
##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth across samples">\n\
##INFO=<ID=DEL,Number=1,Type=Integer,Description="Deletion X bps away">\n\
##INFO=<ID=INS,Number=1,Type=Integer,Description="Insertion X bps away">\n\
##INFO=<ID=VT,Number=1,Type=String,Description="Variant type, can be SNP, INS or DEL">\n\
##INFO=<ID=ProtCh,Number=1,Type=String,Description="Protein change due to somatic variant">\n\
##INFO=<ID=SS,Number=1,Type=Integer,Description="Somatic status of sample">\n\
##INFO=<ID=fa20,Number=0,Type=Flag,Description="Fraction of ALT below 20% of reads">\n\
##FILTER=<ID=q10,Description="Genotype Quality < 10">\n\
##FILTER=<ID=blq,Description="Position overlaps 1000 Genomes Project mapping quality blacklist">\n\
##FILTER=<ID=bldp,Description="Position overlap 1000 Genomes Project depth blacklist">\n\
##FILTER=<ID=ma,Description="Position in germline has 2+ support for 2+ alleles">\n\
##FILTER=<ID=idl10,Description="Position is within 10 bases of an indel">\n\
##FILTER=<ID=idls5,Description="Less than 5 reads supporting indel in appropriate tissue">\n\
##FILTER=<ID=pbias,Description="Positional bias, all reads supporting ALT are in first or last third of read">\n\
##FILTER=<ID=sbias,Description="Strand bias, majority of reads supporting ALT are on forward OR reverse strand">\n\
##FILTER=<ID=mc3,Description="Greater than 3 reads of somatic allele in germline">\n\
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">\n\
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read depth at this position in the sample">\n\
##FORMAT=<ID=BQ,Number=.,Type=Integer,Description="Average base quality for reads supporting alleles">\n\
##FORMAT=<ID=MQ,Number=1,Type=Integer,Description="Phred style probability score that the variant is novel with respect to the genomes ancestor">\n\
##FORMAT=<ID=MQA,Number=.,Type=Float,Description="Average mapping quality for reads supporting alleles">\n\
##FORMAT=<ID=SB,Number=.,Type=Float,Description="Strand Bias for reads supporting alleles 0/1/2/3">\n\
##FORMAT=<ID=AD,Number=.,Type=Integer,Description="Depth of reads supporting alleles 0/1/2/3...">\n\
##FORMAT=<ID=FA,Number=1,Type=Float,Description="Fraction of reads supporting ALT">\n\
##FORMAT=<ID=SS,Number=1,Type=Integer,Description="Variant status relative to non-adjacent Normal,0=wildtype,1=germline,2=somatic,3=LOH,4=post-transcriptional modification,5=unknown">\n\
##FORMAT=<ID=SSC,Number=1,Type=Integer,Description="Somatic score between 0 and 255">\n\
##tcgaversion=1.1\n\
##vcfProcessLog=<InputVCF=</inside/home/singer/data/brca/original/TCGA-AN-A0FN_W_IlluminaGA-DNASeq_exome.vcf>,InputVCFSource=<bambam>,InputVCFVer=<1.4>,InputVCFParam=<minSuppSNP=1,minSuppIndel=1,minSuppSV=2,minQ=20,minNQS=10,minMapQ=20,minMapQIndel=1,avgMapQ=10,inProb=0.97,lProb=0.999,tProb=0.001,fracGerm=0.1>>\n\
##SnpEffVersion="4.1a (build 2015-01-14), by Pablo Cingolani"\n\
##SnpEffCmd="SnpEff  -no-upstream -no-downstream -formatEff hg19 ../tcga/brca/ucsc.edu_BRCA.IlluminaGA_DNASeq_Cont.Level_2.1.1.0/data/TCGA-AN-A0FN_W_IlluminaGA-DNASeq_exome.vcf.gz "\n\
##INFO=<ID=EFF,Number=.,Type=String,Description="Predicted effects for this variant.Format: Effect ( Effect_Impact | Functional_Class | Codon_Change | Amino_Acid_Change| Amino_Acid_length | Gene_Name | Transcript_BioType | Gene_Coding | Transcript_ID | Exon_Rank  | Genotype_Number [ | ERRORS | WARNINGS ] ) ">\n\
##INFO=<ID=LOF,Number=.,Type=String,Description="Predicted loss of function effects for this variant. Format: Gene_Name | Gene_ID | Number_of_transcripts_in_gene | Percent_of_transcripts_affected ">\n\
##INFO=<ID=NMD,Number=.,Type=String,Description="Predicted nonsense mediated decay effects for this variant. Format: Gene_Name | Gene_ID | Number_of_transcripts_in_gene | Percent_of_transcripts_affected ">\n\
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	NORMAL	PRIMARY\n\
1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7\n\
1	889158	rs56262069	G	C	26.0	PASS	SS=1;VT=SNP;DB;DP=11;EFF=splice_region_variant+intron_variant(LOW|||c.888+4C>G|749|NOC2L|protein_coding|CODING|NM_015658.3|8|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:5:0,5:0,36:0:0,0.2:1.0:0:26:0,60.0	1/1:6:0,6:0,35:0:0,0.167:1.0:1:26:0,60.0\n\
1	889159	rs13302945	A	C	26.0	PASS	SS=1;VT=SNP;DB;DP=11;EFF=splice_region_variant+intron_variant(LOW|||c.888+3T>G|749|NOC2L|protein_coding|CODING|NM_015658.3|8|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:5:0,5:0,36:0:0,0.2:1.0:0:26:0,60.0	1/1:6:0,6:0,35:0:0,0.167:1.0:1:26:0,60.0';


mydomain = "http://diegopenhanut.github.io/vcf-resources/v4_2/";

shortstring = '##source="bambam pipeline v1.4"\n\
##reference=<ID=grch37-lite,source="ftp://ftp.ncbi.nih.gov/genbank/genomes/Eukaryotes/vertebrates_mammals/Homo_sapiens/GRCh37/special_requests/GRCh37-lite.fa.gz">\n\
##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership">\n\
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	NORMAL	PRIMARY\n\
1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7\n\
1	888659	rs3748597	T	C	81.0	PASS	ProtCh=p.I97V;SS=1;DB;VT=SNP;DP=41;EFF=missense_variant(MODERATE|MISSENSE|Atc/Gtc|p.Ile300Val/c.898A>G|749|NOC2L|protein_coding|CODING|NM_015658.3|9|C)	GT:DP:AD:BQ:MQ:SB:FA:SS:SSC:MQA	1/1:21:0,21:0,37:0:0,0.81:1.0:0:81:0,53.0	1/1:20:0,20:0,36:0:0,0.75:1.0:1:81:0,55.7';

dissetationString = '##fileformat=VCFv4.0\n\
##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership">\n\
##INFO=<ID=VT,Number=1,Type=String,Description="Variant type, can be SNP, INS or DEL">\n\
##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth across samples">\n\
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">\n\
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read depth at this position in the sample">\n\
##FORMAT=<ID=BQ,Number=.,Type=Integer,Description="Average base quality for reads supporting alleles">\n\
##SAMPLE=<ID=PRIMARY,SampleUUID=8f583981-b257-43ee-9c9e-71a192a49d38,SampleTCGABarcode=TCGA-AN-A0FN-01A-11W-A050-09,Individual=TCGA-AN-A0FN,Description="Primary Tumor">\n\
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	PRIMARY\n\
1	888659	rs3748597	T	C	81.0	PASS	DB;VT=SNP;DP=41	GT:DP:AD	1/1:21:0,21';
)