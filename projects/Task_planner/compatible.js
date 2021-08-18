function checkBrowserCompatiblity(){
	if(navigator.userAgent.indexOf("MSIE") != -1){
		document.getElementById("webpage").style.display = "none";
		document.body.innerHTML = "<h1 style='color:red;font-size:50px;box-shadow: 0 0 55px 5px red;border-radius: 30px;'>Please upgrade Your browser</h1>"
		+"<style>body{background-color: black; font-family: sans-serif;text-align: center;padding: 100px;}</style>";
	}
}
checkBrowserCompatiblity();
checkCookieEnabled();
function checkCookieEnabled(){
	if(navigator.cookieEnabled == false){
		document.getElementsByTagName('HEADER')[0].style.display = 'none';
		document.getElementsByTagName('SECTION')[0].style.display = 'none';
		document.body.innerHTML = "<h1 style='color:red;font-size:50px;box-shadow: 0 0 55px 5px red;border-radius: 30px;'>Please Enable cookie first</h1>"
		+"<style>body{background-color: black; font-family: sans-serif;text-align: center;padding: 100px;}</style>";
	}
}