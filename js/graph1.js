//Based on the first graph of the MSHA slide. This graph uses JIT
function drawGraph1(injectIntoId, dataArray){
    //init data
	if (
		dataArray[0] == 0 && 
		dataArray[1] == 0 && 
		...
		dataArray[{x}] == 0
	) {
		jQuery("#"+injectIntoId).html("Could not connect to {Graph Name} data for this chart");
		return;
	};
	dataArray[0] = dataArray[0] - dataArray[{x}];  
	//Substract the number of S&S violations from the total of inspections that have violations
	
	var colorationLabels = [];
	colorationLabels[0] = 'graph1 0';
	colorationLabels[1] = 'graph1 1';
	...
	colorationLabels[{x}] = 'graph1 {x}';
	var sectionLabels = [];
	sectionLabels[0] = "<div class='labelLikeFlot' style='position:absolute;left:-35px;top:23px;'>{label1 name}</div>";
	...
	sectionLabels[{x}] = "<div class='labelLikeFlot' style='position:absolute;left:-35px;top:23px;'>{label2 name}</div>";
	
	if (typeof(pieTooltipExtra) == 'undefined') window.pieTooltipExtra = [];
	for (currColorationLabelIndex = 0; currColorationLabelIndex < colorationLabels.length; currColorationLabelIndex++){
		pieTooltipExtra[colorationLabels[currColorationLabelIndex]] = new Object();
	}
	pieTooltipExtra[colorationLabels[1]][sectionLabels[0]] = "{Graph Section Label1}"+dataArray[{x}];
	...
	pieTooltipExtra[colorationLabels[7]][sectionLabels[0]] = "{Graph Section Labelx}"+dataArray[{x}];
	
	//Users will probably compare areas of the "stacked pie" rather than distances from center since that makes 
	//more sense as a comparison.  For example, a 50/50 split on radius provides an area comp of PI*r^2 vs 3*PI*r^2.
	//In focus group, users were comparing areas (pixel count) to one another rather than distance from center.  The 
	//Use of square roots were used to make the areas comparable instead of distance from center.  Therefore
	//breaking away from the original "rose chart" type design the chart partially based on.
	var json = {
        'label': colorationLabels
		,
		color: ["#A5E5B6", "#C00",  "#D33", "#FFBF00","#b64","#577","#9BB","#29B129"], //Values are how much of color, in order
        'values': [
        {
          'label': sectionLabels[0],
          'values': [0,
		  			 10*(   10*(Math.sqrt(dataArray[7]/(dataArray[7]+dataArray[0]+dataArray[1])))),
		  			 10*(   10*(Math.sqrt((dataArray[7]+dataArray[0])/(dataArray[7]+dataArray[0]+dataArray[1]))))-
					 10*(   10*(Math.sqrt(dataArray[7]/(dataArray[7]+dataArray[0]+dataArray[1])))),
					 0,0,0,0,
 					 10*(10-10*(Math.sqrt((dataArray[7]+dataArray[0])/(dataArray[7]+dataArray[0]+dataArray[1]))))
					]
		  


		}, 
        {
          'label': sectionLabels[1],
		  'values': [
		  			 10*(   10*(Math.sqrt(dataArray[2]/(dataArray[2]+dataArray[3]+dataArray[4])))),
					 
					 0,0,0,0,
		  			 10*(   10*(Math.sqrt((dataArray[2]+dataArray[3])/(dataArray[2]+dataArray[3]+dataArray[4]))))-
					 10*(   10*(Math.sqrt(dataArray[2]/(dataArray[2]+dataArray[3]+dataArray[4])))),
					 
					 10*(10-10*(Math.sqrt((dataArray[2]+dataArray[3])/(dataArray[2]+dataArray[3]+dataArray[4]))))]
        }]
	};
	if (dataArray[6]+dataArray[5] > 0){ 
		json.values.push(
        {
          'label': sectionLabels[2],
          'values': [0, 0, 0,
		  			 10*(   10*(Math.sqrt(dataArray[6]/(dataArray[6]+dataArray[5])))),
					 10*(10-10*(Math.sqrt(dataArray[6]/(dataArray[6]+dataArray[5]))))]
        });
	}
    //init PieChart
    var pieChart = new $jit.PieChart({
      //id of the visualization container
      injectInto: injectIntoId,
      //whether to add animations
      animate: true,
      //offsets
		initialAngle: 0,
      offset: 20,
      sliceOffset: 3,
      labelOffset: 10,
      //slice style
      type: useGradients? 'stacked:gradient' : 'stacked',
      //whether to show the labels for the slices
      showLabels:true,
      //label styling
      Label: {
        type: labelType, //Native or HTML
        size: 12,
        family: 'Arial',
        color: 'black'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
			window.recentTip = tip;
           tip.innerHTML = ""+pieTooltipExtra[elem.name][elem.label];
			//jQuery("body").css({cursor:'pointer'});
		},
		onHide: function() {
			//jQuery("body").css({cursor:'auto'});
        }
      },
	Events: {   
		enable: true,   
		onClick: function(elem) {   
			if(!elem) return;   
			dashboardClicked("{graphIdentifier}");
		}
	}
	  
    });
    //load JSON data.
    pieChart.loadJSON(json);
}
