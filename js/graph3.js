/******************************
Based on the second graph on the OSHA slide. This graph uses FLOT
***************************/
function drawGraph3(injectInto, dataArray){
	if (typeof(dataArray) == 'undefined' || dataArray == null || 
		typeof(dataArray[0]) == 'undefined' || dataArray[0] == null || 
		typeof(dataArray[0][0]) == 'undefined' || dataArray[0][0] == null ||
		typeof(dataArray[0][1]) == 'undefined' || dataArray[0][1] == null ||
		(dataArray[0][1] == '')
	){
		jQuery("#"+injectInto).html("Could not connect to OSHA data for this chart");
		return;
	}
	var increaser = 0;
	var colorArray = ["#EDC240","#AFD8F8","#4DA74D","#9440ED","#E05","#BD9B33","#8CACC6","#3D853D","#7633BD","#B64"];
	var dataGraph3 = [
		{ label: ""+dataArray[0][1]+" ("+dataArray[0][0]+")",color:"#FFF",bars:{fillColor:colorArray[0]},data: [[1,dataArray[0][0]==0?0:dataArray[0][0]+increaser]]},
		{ label: ""+dataArray[1][1]+" ("+dataArray[1][0]+")",color:"#FFF",bars:{fillColor:colorArray[1]},data: [[2,dataArray[1][0]==0?0:dataArray[1][0]+increaser]]},
		...
		{ label: ""+dataArray[{x}][{x}]+" ("+dataArray[{x}][{x}]+")",color:"#FFF",bars:{fillColor:colorArray[{x}]},data: [[{x},dataArray[{x}][{x}]==0?0:dataArray[{x}][{x}]+increaser]]}
	];
	var graph3Sum = 0;
	for(var i=0,graph3Sum=0;i<10;graph3Sum+=dataArray[i++][0]);

$.plot($("#"+injectInto), dataGraph3,
{
        series: {
			bars: {show: true, lineWidth:0,barWidth: .8, align:"center",fillColor:false}
        },
		colors:colorArray,
        legend: {
            show: false
        },
		grid: { hoverable: true, clickable: true, borderWidth: .5, drawPartialBorder:true },
		yaxis: {   a:1
		,color: "#000"
		, tickLength: 0
		},
		xaxis: { min:0.5
			,color: "#000"
			,tickLength: 0
		}
		
});
$("#"+injectInto).bind("plothover", barChartHover);
$("#"+injectInto).bind("plotclick", function(){dashboardClicked("{graphIdentifier}");});
}