"""
 Creates a condensed view of the dictionary  with the unicode and name in same column

   fontforge -script imageref.py infile outfile')
     Example: fontforge -script genesis.csv genout.csv\n')

"""

import sys
from pathlib import Path
#import io		#python 2
import os
import subprocess
import csv
import time, datetime

script = sys.argv[0]
logname = script.split('.')[0]
#sys.stdout = open(logname+".log", "w",encoding="utf-8")

IMAGEPOS = 0
NAMEPOS = 1
UECPOS = 3
SYNPOS = 2
XREFPOS = 4

js_out = "sun.js"

def convert2csv(filename):
	print('convert2csv ', filename)
	result = subprocess.call(["C:\Program Files\LibreOffice\program\soffice",  "--convert-to", "csv", "--infilter=CSV:44,34,76,1,,,true", filename])
	print('convert2csv ', result)

def convert2ods(filename):	
	print('convert2ods ', filename)
	result = subprocess.call(["C:\Program Files\LibreOffice\program\soffice", "--headless", "--convert-to", "ods", "--infilter=CSV:44,34,76,1,,,true", filename])
	print('convert2ods ', result)
	

def read_csv_data(path, outfile):
    outdata = "csvData = '"
    outArray = []
    f = open(path, 'r', encoding="utf-8")
    #data = csv.reader(f, delimiter=',', quotechar='"')
    csvReader = csv.reader(f, delimiter=',', quotechar='"')
    dt = "%s" % time.ctime(os.path.getmtime(path))
    print(dt) 
    #line = '"'+""+'"|"'+csv_file+'"|"'+""+'"|"'+""+'"\\n'  
    line = ' '+path+' '+dt+' \\n'
    outdata = outdata+line 
    print(outdata)
    for row in csvReader:
        #print(len(row),row)
        if len(row)>2:
            name = row[NAMEPOS]
            uec = row[UECPOS]
            image = row[IMAGEPOS]
            synname = row[SYNPOS]
            if len(row) < 3:
                xref = ""
            else:
                xref = row[XREFPOS]
            line = '"'+image+'"|"'+name+'"|"'+synname+'"|"'+uec+'"|"'+xref+'"\\n'    #,'+syn;
            outdata = outdata+line 

    outdata = outdata+"';"
    outdata = outdata+'\nconsole.log(csvData);'
    #print(outdata)
    with open(outfile, 'w' , encoding="utf-8") as f:
        f.write(outdata)
#        
#ods_file = sys.argv[1]
#csv_file = Path(ods_file).stem + ".csv"
#convert2csv(ods_file)
#
csv_file = sys.argv[1]
read_csv_data(csv_file, js_out)
