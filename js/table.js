var fontCol = 0;
var nameCol = 1;
var synCol = 2;
var uniCol = 3;
var xrefCol = 4;
var noCols = 5;
	
// find font column and unicode column	
function findCol(arry) {
	var t0 = performance.now();
	var found = false;
	var rowx = 0;
	for (var i = 4; i < arry.length; i ++) {
		rowx = arry[i]
		//console.log(i, rowx.length, rowx);
		for (var j = 0;  j < rowx.length; j++) {  //  eeac8d = eb0d
			//	https://stackoverflow.com/questions/17267329/converting-unicode-character-to-string-format
			var	uni = rowx[j].charCodeAt(0).toString(16).toUpperCase();
			//console.log(i, j, '|'+uni+'|', uni.length);
		    if (uni.length == 4) { 
				fontCol = j;
				for (var k = 0;  k < rowx.length; k++){
					if (k === fontCol) continue;
					//console.log(j,k,uni, rowx[k], rowx[k].length, fontCol);
					if (rowx[k].toUpperCase() === uni) {
						console.log('found')
						uniCol = k;
						found = true;
						break;
					}
				}
			}	
		}
		if (i > 16) break;   
		if (found) break;
	}
	noCols = arry[5].length;
	if (fontCol === 0 && uniCol == 3) {
		nameCol = 1
		synCol = 2
		xrefCol = 4
	} 	
		
	console.log("#:%i f:%i n:%i r:%i u:%i x:%i",noCols,fontCol, nameCol, synCol, uniCol, xrefCol);
	var t1 = performance.now();
	console.log("findCol " + (t1 - t0) + " milliseconds.");
}

function generateTable(lines){
	//Clear previous data
	findCol(lines)
	console.log('generateTable');
	var t0 = performance.now();
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	table.id = "searchtable";
	table.className = 'xreftable';
	var len = 0;
	for (var i = 0; i < lines.length; i++) {
	  // find longest row
		if (lines[i].length > len) {
			len = lines[i].length;
		}
	}
	console.log(lines)

	table.createCaption();
	table.caption.innerHTML = lines[0];
	// make header
	var row = document.createElement('TR');
	for (var j = 0; j < len; j++) {
		var th = document.createElement("TH");
		th.appendChild(document.createTextNode('col '+j));
		var fontCol = 0;

		if (j === fontCol) {
			th.className = "fonticon";
			th.innerHTML = "Font";
		}
		if (j === uniCol) {
			th.className = "unicol";
			th.innerHTML = "Unicode";
		}
		if (j === nameCol) {
			th.className = "nameCol";
			th.innerHTML = "Name";
		}
		if (j === synCol) {
			th.className = "synCol";
			th.innerHTML = "Reference";
		}
		if (j === xrefCol) {
			th.className = "xrefCol";
			th.innerHTML = "XRef";
		}
		row.appendChild(th);
	}

	
	table.appendChild(row);
	var tbody = document.createElement('TBODY');
	for (var i = 1; i < lines.length; i++) {  // get line
		if (lines[i].length > 1) {	// process row
			var row = document.createElement('TR');
			row.className = "item";
			var mismatch = false;
			var c0;
		    var c1;
			for (var j = 0; j < lines[i].length; j++) {
				var txt = "";
				var td = document.createElement("TD");
				if (lines[i][j]) txt = lines[i][j].trim();
				if (j ===fontCol) {
					td.className = "fonticon";
					c0 = lines[i][fontCol].charCodeAt(0).toString(16).toLowerCase();
					//if (i <5) console.log('fontcol', j, toHex(txt), c0, lines[i][uniCol])
				}
				if (j === uniCol) {
					td.className = "unicol";
					c1 = lines[i][uniCol].toLowerCase();
				}
				if (j === nameCol) {
					td.className = "nameCol";
				}
				if (j === synCol) {
					td.className = "synCol";
				}
				if (j === xrefCol) {
					td.className = "xrefCol";
					xu = lines[i][xrefCol].slice(-1).charCodeAt(0).toString(16).toLowerCase()
					if (xu === 'f09e') {
						row.className = "nameerror";
						errText = lines[i][nameCol].trim();
						console.log('not equal',errText)
						var errdata = "Name error = " +errText+"\ndoes not match kmn file";
						row.setAttribute("rowdata", errdata);
						dispModal(row, fontCol, uniCol);
					}
					
				}
				td.appendChild(document.createTextNode(txt));
				row.appendChild(td);
			}  // end column process
			row.style.display = "";
			if (c0 !== c1) {
				if (i<5) console.log('not equal',i,c0, c1)
				var errdata = "Font error\nicon = " +c0+"\nunicode ="+ c1;
				row.className = "uerror";
				row.setAttribute("rowdata", errdata);
				dispModal(row, fontCol, uniCol);
			//} else {
				//if (i <5 ) console.log('equal',i,c0, c1)
			}

		}	// end row process
		tbody.appendChild(row);
	}  // end process line
	table.appendChild(tbody);
	document.getElementById("output").appendChild(table);
	var t1 = performance.now();
	console.log("generateTable " + (t1 - t0) + " milliseconds.");
}


  function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
	//console.log('toHex', str, result);
	 return result;
  }
   function toHexArray(str) {
    var result = [];
    for (var i=0; i<str.length; i++) {
      result.push(str.charCodeAt(i).toString(16));
    }
	//console.log('toHexArr', str, result);
	 return result;
  }
/*
function table_mismatch() {
    var t0 = performance.now();
	var table = document.getElementById("searchtable");
	var rows = table.getElementsByTagName("tr");
	for (i = 1; i < rows.length; i++) {
		if (rows[i].className === "nameerror") {
		
		}
		
		var c0 = rows[i].childNodes[fontCol].innerText.charCodeAt(0).toString(16).toLowerCase();

		c0 = rows[i][fontCol]
		c1 = rows[i][uniCol]
		if (c0 !== c1) {
			console.log('not equal', fontCol, uniCol)
			mismatch = true;	
			var fontname = rows[i].childNodes[1].innerText;
			var errdata = "Font error\nicon = " +c0+"\nunicode = "+c1;
			rows[i].className = "uerror";
			rows[i].setAttribute("rowdata", errdata);
			dispModal(rows[i], [fontCol, uniCol]);
		}
		
	}
	var t1 = performance.now();
	console.log("table_mismatch 2 " + (t1 - t0) + " milliseconds.");
	
}
*/
function jscsvToArray(txt) {
	console.log('xcsv...')
	row = [];
	lines = txt.split('\n');
	for (var i in lines){
		//l = lines[i].replace(/|/g, ",");
		console.log('lines',lines[i]);
		l = lines[i].split('|')
		for (var j in l) {
			l[j] = l[j].substring(1, l[j].length - 1)
		}
		row.push(l);
	}
	console.log(row[2])
	return row;
}

function csvToArray(txt) {
	var t0 = performance.now();
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, line;
	for (line of txt) {
	    if ('"' === line) {
            if (s && line === p) {
				row[i] += line;
			}
            s = !s;
        } else if (',' === line && s) {
      		line = row[++i] = '';
		} else if ('\n' === line && s) {
            if ('\r' === p) {
				row[i] = row[i].slice(0, -1);
			}
            row = ret[++r] = [line = '']; i = 0;
        } else {
			row[i] += line;
		}
        p = line;
    }
	//console.log('csv2array',ret[4]);
	var t1 = performance.now();
	console.log("csvToArray " + (t1 - t0) + " milliseconds.");
    return ret;
};

function search_Table(){
	var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	console.log('searchtable',srchType, input)	
	table = document.getElementById("searchtable");
	tr = table.getElementsByTagName("tr");
	for (i = 1; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td") ; 
		var txt = "+";
		for(j=1 ; j < td.length ; j++) {
			  let tdata = td[j] ;
			  if (tdata) {
				 txt = txt +'+'+ tdata.innerHTML.toUpperCase();
			  }
		}
		//console.log('srch',txt, 'filter',filter);
		if (srchType === 'word') {  // word search
			txt = txt +'+';
			txt = txt.replace(/ /g,'+')
			txt = txt.replace(/:/g,'+')
			txt = txt.replace(/,/g,'+')
			//txt = txt.split('+')
			
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				if (txt.indexOf('+'+filter[f]+'+')  === -1) { 
					found = false;
				}
			}
		} else {			// char search
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				if (txt.indexOf(filter[f])  === -1) { 
					found = false;
				}
			}
		}	
		//found = arrayContains(txt, filter)
		//console.log(i,input, txt, found)
		if (found) {
				tr[i].style.display = "";
		} else {
				tr[i].style.display = "none";
		}
	}
}


function showError() {
	//table_mismatch();
	var input =  document. getElementById("showerr");
	if (input.checked) {
		input.checked = false;
		input.value = "  ";
	} else {
		input.checked = true;
		input.value = "\u2713";  //    ✓ ✓
	}
	console.log(input.checked);
	var table = document.getElementById("searchtable");
	var tr = table.getElementsByTagName("tr");
	for (var i = 0; i < tr.length; i++) {
		if (input.checked) {
			if (tr[i].classList.contains("uerror") || tr[i].classList.contains("nameerror")) {
				tr[i].style.display = "";
			} 	else {
				tr[i].style.display = "none";
			}
		} else {
			tr[i].style.display = "";
		}
	}

	console.log(input.checked);
}   

function clearTable() {
    var input, filter, found, srchtable, tr, td, i, j;
    document.getElementById('xsearch').value = "";
	search_Table();
//	document.getElementById('xlf').value = ""; 
	console.log("clearall");
}