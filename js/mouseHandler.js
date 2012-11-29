/* 
The mouseFollower is what the flot charts are going to use for tooltips.  
The position of mouseFollower is going to be updated constantly
*/
jQuery(document).ready( function(){
jQuery('<div id="mouseFollower" class="tip">MouseFollower</div>')
.css( {
	position: 'absolute',
	display: 'none',
	'z-index': '1000'
}).appendTo("body");
});

var IE = document.all?true:false
if (!IE) document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = getMouseXY;

function getMouseXY(e) {
	//if something else needs to use tempX and tempY for tooltips, just move them out of this function and they will be global
	var tempX = 0
	var tempY = 0
	//Used to update the tooltip for the flot charts
	if (IE) { 
		try{
			tempX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			tempY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}catch(exc){
			//This will happen if we have mouse events before document body is available.  Do nothing.
		}
	} else {  
		tempX = e.pageX
		tempY = e.pageY
	}  
	if (tempX < 0){tempX = 0}
	if (tempY < 0){tempY = 0}  
	jQuery("#mouseFollower").css("left",tempX+20);
	jQuery("#mouseFollower").css("top",tempY-40);
	return true
}
