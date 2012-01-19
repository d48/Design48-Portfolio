function validateFields() {
var frmEl = document.getElementById('cForm');
var posName = document.getElementById('posName');
var posEmail = document.getElementById('posEmail');
var posText = document.getElementById('posText');
var whiteSpace = /^[\s]+$/;
	if ( posText.value == '' || whiteSpace.test(posText.value) ) {
		alert("You're trying to send an empty email. Please type something and try again.");
	}
	else {
		sendPosEmail();
	}
}
function sendPosEmail () {
	var success = document.getElementById('emailSuccess');
	var posName = document.getElementById('posName');
	var posEmail = document.getElementById('posEmail');
	var posText = document.getElementById('posText');
	var page = "scripts/xmlHttpRequest.php?contact=true&xml=true";
	
	showContactTimer(); // quickly begin the load bar
	success.style.display = 'none'; // hide the success bar (incase this is a multi-email
	
	// convert (&, +, =) to string equivs. Needed so URL encoded POST won't choke.
	var str1 = posName.value;
	str1 = str1.replace(/&/g,"**am**");
	str1 = str1.replace(/=/g,"**eq**");
	str1 = str1.replace(/\+/g,"**pl**");
	var str2 = posEmail.value;
	str2 = str2.replace(/&/g,"**am**");
	str2 = str2.replace(/=/g,"**eq**");
	str2 = str2.replace(/\+/g,"**pl**");
	var str4 = posText.value;
	str4 = str4.replace(/&/g,"**am**");
	str4 = str4.replace(/=/g,"**eq**");
	str4 = str4.replace(/\+/g,"**pl**");
	
	var stuff = "posName="+str1+"&posEmail="+str2+"&posText="+str4;
	loadXMLPosDoc(page,stuff)
}
function showContactTimer () {
	var loader = document.getElementById('loadBar');
	loader.style.display = 'block';
	sentTimer = setTimeout("hideContactTimer()",6000);
}

function hideContactTimer () {
	var loader = document.getElementById('loadBar');
	var success = document.getElementById('emailSuccess');
	var fieldArea = document.getElementById('contactFormArea');
	var inputs = fieldArea.getElementsByTagName('input');
	var inputsLen = inputs.length;
	var tAreas = fieldArea.getElementsByTagName('textarea');
	var tAreasLen = tAreas.length;
	// Hide the load bar alas! Done Loading
	loader.style.display = "none";
	success.style.display = "block";
	success.innerHTML = '<strong class="highlight">'+grabPosXML("confirmation")+'</strong>';
	// Now Hijack the form elements
	for ( i=0;i<inputsLen;i++ ) {
		if ( inputs[i].getAttribute('type') == 'text' ) {
			inputs[i].value = '';
		}
	}
	for ( j=0;j<tAreasLen;j++ ) {
		tAreas[j].value = '';
	}
}

function ajaxContact() {
var frmEl = document.getElementById('cForm');
addEvent(frmEl, 'submit', validateFields, false);
frmEl.onsubmit = function() { return false; }
}
addEvent(window, 'load',ajaxContact, false);