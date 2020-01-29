function generateTable(lines){
	//Clear previous data
	console.log('generateTable');
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
	
	table.createCaption();
	table.caption.innerHTML = lines[0];
	// make header
	// checkbox in each column header for compare

	var row = document.createElement('TR');
	for (var j = 0; j < len; j++) {
		var th = document.createElement("TH");
	//	th.onclick = function() {
	//		w3.sortHTML('#searchtable', '.item', 'td:nth-child('+j+')'); // " //style="cursor:pointer">Name</th>
	//		//sortTable(this.cellIndex); 
	//	};
		th.appendChild(document.createTextNode('col '+j));
		row.appendChild(th);
	}

	table.appendChild(row);
	var tbody = document.createElement('TBODY');
	for (var i = 1; i < lines.length; i++) {  // get line
		//console.log(lines[i]);
		if (lines[i].length > 1) {	// process row
			var row = document.createElement('TR');
			row.className = "item";
			var mismatch = false;
			var icontext = "";
			var col2text = "";
			for (var j = 0; j < lines[i].length; j++) {
				var text = "";
				var td = document.createElement("TD");
				if (lines[i][j]) text = lines[i][j].trim();
				if (j ===0) {
					//td.className = 'td0';
				}
				td.appendChild(document.createTextNode(text));
				row.appendChild(td);
			}  // end column process
				}	// end row process
		tbody.appendChild(row);
	}  // end process line
	table.appendChild(tbody);
	document.getElementById("output").appendChild(table);

}


  function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
	console.log('toHex', str, result);
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
  
function table_mismatch() {
	var chkCols = [];
	var fontCol = -1;
	var uniCol = -1;
	var found = false;
	var table = document.getElementById("searchtable");
	var rows = table.getElementsByTagName("tr");

	var rowx = 0;
	for (var i = 3; i < rows.length; i ++) {
		rowx = rows[i]
		console.log(i, rowx.childNodes.length, rowx);
		for (var j = 0;  j < rowx.childNodes.length; j++) {  //  eeac8d = eb0d
			//	https://stackoverflow.com/questions/17267329/converting-unicode-character-to-string-format
			var	uni = rowx.childNodes[j].innerText.charCodeAt(0).toString(16).toLowerCase();
			console.log(j, '|'+uni+'|', uni.length);
		    if (uni.length == 4) { 
				chkCols[0] = [j, uni];
				fontCol = j;
				console.log(uni);
				found = true;
				break;
			}	
		}
		if (found) break;
	}
    if (found) {
		for (var i = 0; i < rowx.childNodes.length; i++) {
			var c0 = rowx.childNodes[i].innerText.toString().toLowerCase();
			if (c0 === chkCols[0][1]) { 
				chkCols[1] = [i, c0];
				uniCol = i;
				break;
			}	
		}

		//var fontcol = chkCols[0][0];			// fonticon column
		//var unicol = chkCols[1][0];			// unicode column
		var ths = table.getElementsByTagName("th");
		var tds = table.getElementsByTagName("td");
		
		ths[fontCol].className = "fonticon";
		ths[fontCol].innerHTML = "Font";
		ths[uniCol].className = "Unicode";
		ths[uniCol].innerHTML = "unicol";
		/* i = fontCol;
		for (var i = 0; i < ths.length; i++) {
		//i = fontcol;
			if (i === fontCol) {
				ths[i].className = "fonticon";
				ths[i].innerHTML = 'Font';
				//console.log(i, ths[i]);
			}
		//i = unicol;
			if (i === uniCol) {
				ths[i].innerHTML = 'Unicode';
				ths[i].className = "unicol";
				//console.log(i, ths[i]);
			}	
		//ths[ths.length-1].className = "width100";
		}
	*/	
		console.log(fontCol, uniCol);
		for (i = 1; i < rows.length; i++) {
			var c0 = rows[i].childNodes[fontCol].innerText.charCodeAt(0).toString(16).toLowerCase();
			var c1 = rows[i].childNodes[uniCol].innerText.toLowerCase();
		//	var fontname = rows[i].childNodes[1].innerText;
		//	console.log(c0, c1, typeof(c0));
			rows[i].childNodes[fontCol].className = "fonticon";
			rows[i].childNodes[uniCol].className = "unicol";
			//console.log(rows[i].childNodes.length);
			//var len = rows[i].childNodes.length
			//rows[i].childNodes[len - 1].className = "width100";
			if (c0 !== c1) {
				console.log('not equal', fontCol, uniCol)
				mismatch = true;	
				var fontname = rows[i].childNodes[1].innerText;
				var errdata = "Font error\nicon = " +c0+"\nunicode = "+c1;
				rows[i].className = "uerror";
				rows[i].setAttribute("rowdata", errdata);
				dispModal(rows[i], chkCols);
			}
		}
	}   // if found
}

// Parse a CSV row, accounting for commas inside quotes   
// https://exceptionshub.com/how-to-read-data-from-csv-file-using-javascript-2.html                
function parse(row){
  var insideQuote = false,                                             
      entries = [],                                                    
      entry = [];
  row.split('').forEach(function (character) {                         
    if(character === '"') {
      insideQuote = !insideQuote;                                      
    } else {
      if(character == "," && !insideQuote) {                           
        entries.push(entry.join(''));                                  
        entry = [];                                                    
      } else {
        entry.push(character);                                         
      }                                                                
    }                                                                  
  });
  entries.push(entry.join(''));                                        
  return entries;                                                      
}
function csvToArray(text) {
	row = [];
	lines = text.split('\n');
	for (var i in lines){
		l = lines[i].replace(/|/g, ",");
		//console.log(i, lines[i]);
		r = parse(lines[i]);
		row.push(r);
	}
	return row;
}

function xcsvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, line;
   console.log(text);
   for (line of text) {
	   //console.log(line, typeof(line))
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
	console.log('csv2array',ret);
    return ret;
};

function search_Table(){
	var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	table = document.getElementById("searchtable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td") ; 
		var text = "";
		for(j=0 ; j < td.length ; j++) {
			  let tdata = td[j] ;
			  if (tdata) {
				 text = text +'+'+ tdata.innerHTML.toUpperCase();
			  }
		  }
		var found =true;
		for(var f = 0; f < filter.length; f++) {
			if (text.indexOf(filter[f])  === -1) { 
				found = false;
			}
		}
		if (found) {
				tr[i].style.display = "";
		} else {
				tr[i].style.display = "none";
		}
	}
}


function showError() {
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
			if (tr[i].classList.contains("uerror")) {
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

function xsortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("searchtable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function xsortArrayByCol(arr, colIndex){
    arr.sort(sortFunction);
    function sortFunction(a, b) {
        a = a[colIndex];
        b = b[colIndex];
       return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;  // test if text string - ie cannot be coerced to numbers.
       // Note that sorting a column of mixed types will always give an entertaining result as the strict equality test will always return false
       // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

       }
}
function clearTable() {
    var input, filter, found, srchtable, tr, td, i, j;
    document.getElementById('xsearch').value = "";
	search_Table();
//	document.getElementById('xlf').value = ""; 
	console.log("clearall");
}