//Based on the second graph of the MSHA slide. This graph uses FLOT
function drawGraph2(injectIntoId, dataArray){

    var previousPoint = null;
	var recentItem = null;
	var moderateRed = "#f33";
	var highRed = "#c00";
	var recklessRed = "#600";
		d1  = {data:[[0,0]], label:"{insert lable name}"+dataArray[0], points: { show:true, radius: getRadius(dataArray[0]), fill:true, fillColor:moderateRed}, color:moderateRed};
		d4 =  {data:[[1,0]], label:"{insert lable name}"+dataArray[1], points: { show:true, radius: getRadius(dataArray[1]), fill:true, fillColor:moderateRed}, color:moderateRed};
		
		d{x} =  {data:[[{x},{x}]], label:"{insert lable name}"+dataArray[{x}], points: { show:true, radius: getRadius(dataArray[{x}]), fill:true, fillColor:recklessRed}, color:recklessRed};


    function plotWithOptions() {
		var options = {
            series:{
				lines: { show: false },
				points: { show: true},
				bars: {show: false, barWidth: 1}
			},
			grid: { hoverable: true, clickable: true, color:"white"  },
			yaxis: {
				min: -0.5, max: 2,
				ticks: [],
				tickLength: 0,
				color: "black"

			},
			xaxis: { 
				min: -0.1, max: 4.7,
				ticks: [[0, "104b"],[1,"104d"],[2,"104g"],[3,"107a"],[4,"Other"]],
				tickLength: 0,
				color: "black"
			},
			legend: { show:false, position: "sw"}
		};
		var data = [d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15
			];
		var placeholder = $("#"+injectIntoId);
		
		$.plot(placeholder, data, options);

    }

    plotWithOptions();

    $("#"+injectIntoId).bind("plothover", function (event, pos, item) {
            if (item) {
				recentEvent = event;
                if (!arrays_equal(previousPoint, item.datapoint)) {
                    previousPoint = item.datapoint;
                    recentItem = item;
                    hideTooltipFlot();
                    var x = item.datapoint[0].toFixed(0),
                        y = item.datapoint[1].toFixed(0);
					showTooltipFlot(
							item.series.label);
             	}
            }
            else {
                hideTooltipFlot();
                previousPoint = null;            
            }
    });	
	$("#"+injectIntoId).bind("plotclick", function(){dashboardClicked("{graphIdentifier}");});
	
	function getRadius(value){
		if (value < 1){
			return 0;
		}else if (value < 10){
			return 1;
		}else if (value < 25){
			return 2;
		}else if (value < 40){
			return 3;
		}
		...
		else{
			return {x};
		}
	}

}
