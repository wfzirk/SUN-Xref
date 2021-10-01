@echo off
echo Create sun.js for inclusion in the xrefsearch tool
echo Create mfxxx.csv for madefrom tools


::python csv2js.py "%1"



set xrefin=xref921_930_EN.csv
set outfile=mf921_930_EN.csv

cmd /c python csv2js.py %xrefin%

cmd /c python mf.py %xrefin% %outfile%