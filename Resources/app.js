// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create http request client
var url = "http://localhost:1337";
var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
         Ti.API.info("Received text: " + this.responseText);
         updateWindow(JSON.parse(this.responseText));
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000  /* in milliseconds */
 });
 
function updateWindow(resp){
	var makeLabel = labelMaker(win1);
	makeLabel(resp.title);
	makeLabel(resp.content);
	makeLabel(resp.sub_obj.sub_title);
	makeLabel(resp.sub_obj.sub_content);
}
 
var b1 = Titanium.UI.createButton({
	title:'Request JSON',
	height:40,
	width:200,
	top:10
});
 
b1.addEventListener('click', function()
{
	client.open("GET", url);
	client.send();
});
 
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Win 1',
    backgroundColor:'#a8a8a8'
});

// 
// factory to create and add a label to a window
//
function labelMaker(win){
	var pos = 0;
	function shiftDown(){
		pos += 70;
	}
	return function(labelText){
		win.add(Titanium.UI.createLabel({
			color	    : '#4f4f4f',
			text	    : labelText,
			font	    : {fontSize:20,fontFamily:'Helvetica Neue'},
			top 		: pos,
			width 		: 'auto'
		}));
		Ti.API.info('y pos=' + pos);
		shiftDown();
	};
}

win1.add(b1);
win1.open();