//The following function is used by the JIT charts.  I turned off the possibility of native label types only allowing 
//HTML for more consistency in cross-browser formatting and the ability to use DIV inside a label

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  labelType = 'HTML';
  nativeTextSupport = false;
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();


var previousPoint = null;


var softBlue = "#64B";
var softBrown = "#B64";
var softGreen = "#4B6";
var pastelGreen = "#6B4";
var pastelBlue = "#46B";
var magenta = "#B46";
var softPurple = "#858";

/**
arrays_equal is used to determine if we're mouseover on a different point in the flot charts
**/

function arrays_equal(a,b) { if (a==null && b == null) return true; if (a==null)return false; if (b==null) return false; return !(a<b || b<a); }

function dashboardClicked(chartName){
}
function getFormattedDate(month,day,year,includeYearDigits){
	var dDate = new Date();
	var desiredYear = "20"+year.toString();
	dDate.setFullYear(desiredYear);
	dDate.setMonth(month-1,day);
	dDate.setHours(12,0,0);
	window.recentDDate = dDate;
	if (includeYearDigits == 4){
		return (dDate.getMonth()+1)+"/"+dDate.getDate()+"/"+dDate.getFullYear();
	}else if (includeYearDigits == 2){
		return (dDate.getMonth()+1)+"/"+dDate.getDate()+"/"+dDate.getFullYear().toString().substring(2);
	}else{
		return (dDate.getMonth()+1)+"/"+dDate.getDate();
	}
}


function initiateDashboard(){
	/*If this js is called more than once, don't draw it more than once*/
	if (document.getElementById("{first Graph Id}") != null){return;}
	if(typeof(window.DashboardVariables) != Object) {
		window.dashboardAjaxHelper = {Initialize ajax call}
		window.dashboardGetVars = {Ajax call to get data}
		window.dashboardGetVars.send("");
	}
	else drawDashboard();
}
function drawDashboard(){
	if (!window.dashboardAjaxHelper.requestIsReadyAndValid(window.dashboardGetVars)){
		return;
	}
	
	if (document.getElementById("{first Graph Id}") != null){return;}
    eval(window.dashboardGetVars.responseText);
	
    // Initialize data displayed in overlay
	jQuery(".class1").html({Some Text from db}); //Repeat for every overlay that will be on every slide
	
	window.dashboardOverlay = jQuery("#dashboardOverlay").overlay({
		top: 200,
		expose: {
			color: "#fff",
			loadSpeed: 200,
			opacity: 0.0
		},
		closeOnClick: true,
		api: true
	});
	// Add event handlers for the graph titles
	jQuery(".graphTitle").click(function(){
		jQuery("#dashboardOverlay").css('width',415);
		jQuery("#dashboardOverlayTitle").html(
			jQuery(this).html()+" Chart Description"
		);
		jQuery("#dashboardOverlayInfo").html(
			jQuery("#"+jQuery(this).next().attr('id')+"DashboardInfo").html()
		);
		window.dashboardOverlay.load();
	}).mouseover(function(){jQuery(this).css('cursor','pointer');});
	// making it draggable
	jQuery("#handle").mouseover(function(){jQuery(this).css('cursor','move');});
	jQuery("#dashboardOverlay" ).draggable({ handle: "#handle" });


/**
Initiates the dashboard's fade cycle 
Makes sure the fake axes appear (b/c they are initially hidden)
Sets the fade cycle to stop when someone clicks a number
Also rotates the text for graphs being viewed in internet explorer
**/
					
	jQuery(".hideUntilLoaded").fadeIn();  //Used for the fake axes if needed for working with FLOT
	//For IE, rotation filter does not get applied if not showing, so the initially hidden haven't been rotated (Negligence in Msha 2);
	jQuery(".rotateWordUp").css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation=3);");

/*Begin Drawing the actual graphs*/

	drawGraph1("graph1",[{array of data}]);
/**/
	drawGraph2("graph2",[{array of data}]);
/* Repeat for every graph on every slide */
	
	

/** Start up the slider and the tutorial **/

	//timeout is the interval to stay on a slide
	//speed is interval to take while performing a fade
	jQuery("#dashboardHolder").after('<div id="DashNav">').cycle({fx: 'fade', pause: 0, timeout: 28000,speed:2000, pager: '#DashNav'});
	jQuery("#DashNav a").click(function(){$('#dashboardHolder').cycle('pause');});
	smallResDashUpdate('1280');	
	jQuery('#dash-tut-btn').click(function() {
		jQuery("#dashboardOverlay").css('width',1080);
		jQuery("#dashboardOverlayTitle").html(
			"Dashboard Tutorial"
		);
		jQuery("#dashboardOverlayInfo").html("<div style='text-align:center'><img src='images/loading.gif' /></div>");
		
		window.dashboardOverlay.load();
	});
	
	setTimeout("setTooltipsForDashboard()",1000);
}

/**********************
Common Functionality
************************/
function showTooltipFlot(contents, bgcolor) {
	if (typeof(bgcolor) == 'undefined'){
	 bgcolor = '#fee';
	}
	jQuery("#mouseFollower").html(contents).css({
		border: '1px solid #fdd',
		padding: '2px',
		'background-color': bgcolor,
		opacity: 0.90
	}).show();
}

function hideTooltipFlot(){
		jQuery("#mouseFollower").hide();
}

function barChartHover(event, pos, item) {
	if (item) {

		recentEvent = event;
		if (!arrays_equal(previousPoint, item.datapoint)) {
			previousPoint = item.datapoint;
			recentItem = item;
			hideTooltipFlot();
			var x = item.datapoint[0].toFixed(0),
				y = item.datapoint[1].toFixed(0);
				z = item.datapoint[2].toFixed(0);
			showTooltipFlot(
					item.series.label);
		}
	}
	else {
		hideTooltipFlot();
		previousPoint = null;            
	}
}

function pieHover(event, pos, obj) 
{
	hideTooltipFlot();
	window.latestHover = new Object();
	window.latestHover.event = event;
	window.latestHover.pos = pos;
	window.latestHover.obj = obj;
	if (!obj) return;

	showTooltipFlot(
			'<span>'+obj.series.label+'</span>'
			);
}
function pieHoverAddOtherDataToTooltip(event, pos, obj) 
{
	hideTooltipFlot();
	if (!obj) return;
	window.latestHoveredPie = obj;
	var additionalInfo = "";
	if (obj.series.label == "Other"){
		additionalInfo = " ("+obj.datapoint[1][0][1]+")";
	}
	showTooltipFlot(
			'<span>'+obj.series.label+additionalInfo+'</span>'
			);
}

function millionFormatter(v, axis, decimals){
	if (typeof(decimals) == 'undefined') decimals = 0;
	var toReturn = v/1000000;
	toReturn = (toReturn.toFixed(decimals)*1)+ "M";
	return toReturn;
}

function thousandFormatter(v, axis, decimals){
	if (typeof(decimals) == 'undefined') decimals = 0;
	var toReturn = v/1000;
	toReturn = (toReturn.toFixed(decimals)*1) + "K";
	return toReturn;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function setTooltipsForDashboard(){
	jQuery('#DashNav a').hover(
		function() {
			var thisID = jQuery(this).attr('id');
			if (typeof(thisID) == 'undefined' || thisID == ""){
				thisID = 'controls'+jQuery(this).html();
			}
			var slide ='';
			switch(thisID) {
				case 'controls1':
					slide = '{slideName1}';
					break;
				case 'controls2':
					agency = '{slideName2}';
					break;
				...
			}
			showWZTooltip(slide);
		},
		function() {
			UnTip();
		}
	);
}
jQuery(document).ready( function(){
    // Controls the order that the dashboard loads on the page in relation to other functionality							 
	if (typeof(mapOL) == 'undefined'){
		initiateDashboard();
	}
});