
function listCookies() {
         	var theCookies = document.cookie.split(';');
			console.log('Cookies',theCookies);
         	var aString = '';
         	for (var i = 1 ; i <= theCookies.length; i++) {
         		aString += i + ' ' + theCookies[i-1] + "\n";
         	}
         	return aString;
         }
		 
         cookie = {
         	set: function (name, value, days) {
         		if (days) {
         			var date = new Date();
         			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
         			var expires = "; expires=" + date.toGMTString();
         		} else {
         			var expires = "";
				}	
         		document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
         		console.log('set cookie ', name, value,"=" + JSON.stringify(value) + expires);
         	},
         
         	get : function(name){
         		var nameEQ = name + "=", ca = document.cookie.split(';');
         		for(var i=0;i < ca.length;i++) {
         		  var c = ca[i];
         		  while (c.charAt(0)==' ') c = c.substring(1,c.length);
         			if (c.indexOf(nameEQ) == 0) {
         			  console.log('get',nameEQ,JSON.parse(c.substring(nameEQ.length,c.length)));
         			  return  JSON.parse(c.substring(nameEQ.length,c.length));
         			}
         		}
         		return null;
         	}
         
         }

  /**
 * Usage: d = new FontDetector();
 *        d.detect('font name');
 */
var xFontDetector = function() {
console.log('fontdetector');
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
	console.log('detect',font);
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = '"' + font + '"' + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};
 
 function xchangeFont(setCookie) {
	var fval = document.getElementById('sfont').value;
	
	try {
		fval ='"'+fval+'"';
		console.log('changefont',fval);
		document.documentElement.style.setProperty('--sun-font', fval);
	} catch {
		alert("Font not found", fval);
	}
	
}
