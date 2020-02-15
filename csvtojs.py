"""
 Creates a condensed view of the dictionary  with the unicode and name in same column

   fontforge -script imageref.py infile outfile')
     Example: fontforge -script genesis.csv genout.csv\n')

"""

import sys
import io		#python 2
import subprocess
import csv
#import tkinter
#import tkinter.filedialog

script = sys.argv[0]
logname = script.split('.')[0]
#sys.stdout = open(logname+".log", "w",encoding="utf-8")

IMAGEPOS = 0
NAMEPOS = 1
UECPOS = 2
XREFPOS = 3


def convert2csv(filename):
	print('convert2csv ', filename)
	#result = subprocess.call(["C:\Program Files\LibreOffice\program\soffice", "--headless", "--convert-to", "csv", "--infilter=CSV:44,34,76,1,,,true", filename])
	#command = '"C:\Program Files\LibreOffice\program\soffice",  "--convert-to", "csv", "--infilter=CSV:44,34,76,1,,,true", '+ filename
	#print(command)
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
    
    for row in csvReader:
        print(len(row),row)
        name = row[NAMEPOS]
        uec = row[UECPOS]
        image = row[IMAGEPOS]
        if len(row) < 3:
            xref = ""
        else:
            xref = row[XREFPOS]
        #syn = row[0]
        #+ '"","boy","e001","small,few: man",\n'
        line = '"'+image+'"|"'+uec+'"|"'+name+'"|"'+xref+'"\\n'    #,'+syn;
        outdata = outdata+line 
        #outfile.write(line)
    #outdata=outdata[:-1]+']\n'        # remove last char 
    outdata = outdata+"';"
    outdata = outdata+'\nconsole.log(csvData);'
    print(outdata)
    with open(outfile, 'w' , encoding="utf-8") as f:
        f.write(outdata)



#csv_file = "kmn724_xref.csv"
csv_file = "724all_xref2 (4).csv"
js_out = "sun.js"
read_csv_data(csv_file, js_out)
