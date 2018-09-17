#!/usr/bin/env python
import csv
import os

def generateHtml (directory ,title, content):
    fh = open(directory+"/index.html", "w")
    with open('../template.html', 'r') as template_file:
        top = template_file.read()
    
    with open('../template_mid.html', 'r') as template_mid_file:
        mid = template_mid_file.read()
    
    with open('../template_bottom.html', 'r') as template_bottom_file:
        bottom = template_bottom_file.read()

    lines_of_text = [top,
            title,
            mid,
            "<h1>", title, "</h1>",
            content,
            bottom]
    
    fh.writelines(lines_of_text)
    fh.close()
    return

# older version don't work with "with"
# fix it later
with open('structure.csv', 'rU') as f:
    reader = csv.reader(f)
    fh = open('index.html', 'w')
    with open('../template.html', 'r') as template_file:
        top = template_file.read()
    
    with open('../template_mid.html', 'r') as template_mid_file:
        mid = template_mid_file.read()
    
    with open('../template_bottom.html', 'r') as template_bottom_file:
        bottom = template_bottom_file.read()
    title = "Main Class's"
    fh.writelines([top, title , mid, "<h1>", title, "</h1>"])
    
    for row in reader:
        fh.writelines("<a href='"+row[0]+"'>"+row[0]+"</a><br>\n")
    
    fh.writelines(bottom)
    fh.close()



with open('structure.csv', 'rU') as f:
    reader = csv.reader(f)
    for row in reader:
        if not os.path.exists(row[0]):
            os.mkdir(row[0])
        generateHtml(row[0], row[1], row[2])
        
    
