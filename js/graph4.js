//Based on the first graph on the EBSA slide. This graph uses FLOT
function drawGraph4(injectIntoId, dataArray){
	if (
		dataArray[0] == 0 && 
		dataArray[1] == 0 && 
		dataArray[2] == 0
	) {
		jQuery("#"+injectIntoId).html("Could not connect to {Graph Name} data for this chart");
		return;
	};
	var dataGraph4 = [
		{ label: "{Label Name} ("+dataArray[0]+")",  data: dataArray[0]},
		{ label: "{Label Name} ("+dataArray[1]+")",  data: dataArray[1]},
		{ label: "{Label Name} ("+dataArray[2]+")",  data: dataArray[2]}
	];
	$.plot($("#"+injectIntoId), dataGraph4,
	{
		series: {
			pie: {
				gradient: useGradients,
				show: true,
				innerRadius: 0,
				radius: 90,
				tilt: 0.6,
				label: {
					show: true,
					radius: 120,
					formatter: function(label, series){
						return '<div style="font-size:8pt;text-align:center;padding:2px;color:black;">'+Math.round(series.percent)+'%</div>';
					},
					background: { opacity: 0}
				},
				startAngle: 2
			}
		},
		colors:["#ADD","#9BB","#799","#577","#355","#133","#03F","#A1F","#ADF"],
		legend: {
			show: false
		},
		grid: {
			hoverable: true,
			clickable: true
		}
	});
	$("#"+injectIntoId).bind("plothover", pieHover);
	$("#"+injectIntoId).bind("plotclick", function(){dashboardClicked("{graphIdentifier}");});

}
