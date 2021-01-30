@echo off
echo Create sun.js for inclusion in the xrefsearch tool
echo Create mfxxx.csv for madefrom tools


::python csv2js.py "%1"



set xrefin=xref78_1210_0130.csv
set outfile=mf78_1210_0130.csv

cmd /c python csv2js.py %xrefin%

cmd /c python mf.py %xrefin% %outfile%