#
#    mf.py - generates a unicode list based off the xref***.csv file 
#            converting the xref words to unicode 
#            Also generates a list of basic symbols
#
# rem print("\nsyntax: fontforge -script mf.py xrefin.csv   outfile.csv")
# rem print("   converts xref words to hex unicode string")
#import fontforge
import sys
import csv

import os.path



script = sys.argv[0]
logname = script.split('.')[0]
sys.stdout = open(logname+".log", "w",encoding="utf-8")


xsymbol = 0
xname = 1
xsynonym = 2
xunicode = 3
xxref = 4

def getXrefList(file, outfile):
    print('getXrefList',file)
    with open(file, 'r', encoding='utf8') as fr:
        reader = csv.reader(fr, delimiter=',', quotechar ='"')
        #fw = open(outfile, 'w')

        namList = {}

        for row in reader:
            if len(row) > 1:
                nfont = row[0]                         # glyph
                nkey = row[1].strip()                  #nkey = name
                nref = row[2].strip()                  # reference
                ukey = row[3].strip()                  #key = unicode
                nxref = row[4].strip()                 #nvalue = unicode
                namList[nkey.lower()] = [nfont, nkey, ukey, nxref, nref]

                #wr = nfont+","+nkey+","+ukey+","+nxref
                #fw.write(wr+'\n')
                  
    #fr.close()    
    #fw.close()
    print('namList',namList)
    return namList
    
def basicSymbols(file, outfile):
    print('basicSymbols',file)
    fr = open(file, encoding='utf8')
    reader = csv.reader(fr, delimiter=',', quotechar ='"')
    fw = open(outfile, 'w')

    basicList = {}

    for row in reader:
        if len(row) > 1:
            nfont = row[0].strip()                  # glyph
            nkey = row[1].strip()                   #nkey = name
            rsym = row[2].strip()                   # synonymn/ reference key    
            ukey = row[3].strip()                   #key = unicode
            nxref = row[4].strip()                  #xref list
            if len(nxref) > 0:
                continue
            if len(rsym) > 0:
                continue
            basicList[nkey.lower()] = ukey

            #wr = ' " '+nfont+' "," '+nkey+' "," '+ukey+' " '#," '+rsym+' "," '+str(len(nxref))+' " '
            wr = nfont+","+nkey+","+ukey
            #print(wr)
            fw.write(wr+'\n')

    fr.close()    
    fw.close()

    return basicList    

    
def madeFrom(nList, basicSym, outfile='madefrom.csv'):
    # 'zuzites': ['\ueef7', 'Zuzites', 'eef7', 'Argument: mouth,said,speak,confession: wild: no,not: peace: sleep,rest,lie_down: love,compassion: people']
    mfList = []
    bsList = {}
    #for c in basicSym:
    #    bsList[c.lower] = basicSym[c]
        
    with open(outfile, mode='w',encoding='utf8', newline='') as mf:
        csvWriter = csv.writer(mf)
        #outStr = 'Font,Word,Ref,Unicode'
        #mf.write(str(outStr)+'\n')
        
        for n in nList:
            #print('n',nList[n])
            xList = nList[n][3].replace(":",", ").replace('"',' ')  #.replace("  "," ")           # xref list
            
            fnt = nList[n][0].strip()
            name = nList[n][1].strip()            # original  key word keep case
            ucode = nList[n][2].strip()
            ref = nList[n][4].strip()
            #if name in basicSym:
            #    continue
                
            mfRow = []
            mfRow.append(fnt)
            mfRow.append(name)
            mfRow.append(ref)
            mfRow.append(ucode)

            ccs= xList.split(',')
            pList = ""
            uList = ""
            for cc in ccs:
                c = cc.replace("'"," ").replace(' ','').strip()
                if c.lower() in basicSym:
                    mfRow.append(basicSym[c.lower()])
                    uList = uList+'", "'+basicSym[c.lower()]
                    #pList = pList+','+c
            #print(len(uList), uList)
            '''if len(uList) > 0:
                outStr = ' "'+fnt+'","'+name+'","'+ref+'","'+ucode+'",'+uList[3:]+'"'.strip()
            else:
                outStr = ' "'+fnt+'","'+name+'","'+ref+'","'+ucode+'"'.strip()
             
            if len(uList) > 0:
                outStr = fnt+','+name+','+ref+','+ucode+','+uList[3:].strip()
            else:
                outStr = fnt+','+name+','+ref+','+ucode.strip()

            print('outstr',outStr) 
            mf.write(outStr+'\n')
            #mf.write('\n')
            '''
            print(mfRow)
            csvWriter.writerow(mfRow)
 
if len(sys.argv) > 1: 
    xrefFile = sys.argv[1]
    outfile = sys.argv[2]
    basicSym = basicSymbols(xrefFile, "basicsymbols.csv")
    nl = getXrefList(xrefFile, "xref.csv")
    #print(nl)
    #print(basicSym["man"])
    madeFrom(nl, basicSym, outfile)
    
else:
    print("\nsyntax: fontforge -script mf.py xrefin.csv   outfile.csv")
    print("   converts xref words to hex unicode string")
    sys.exit()

print('Done')

    