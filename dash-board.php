<!-- 
   - You can include this file in your index/main file or you can copy and paste into your index/main file. Including it allows you to keep your index/main file clean and clutter free for easy modifications
  --> 

<div id="slider">
    <ul id ="Holder">
        <!-- Repeat the slide li for each slide you want to have in your dashboard (2 slide examplse are currently being shown -->
        <!-- 1st slide -->
        <li id="slide1">
            <!-- Repeat the graphHolder's for each graph to be displayed on a slide (2 graph placeholder examples are currently being shown)-->
            <div class="Header">{Insert Header Name Here}</div>
                <div class="text">{Insert Text Here}</div>
            <div class="graphHolder">
                <div class="graphTitle">{Individual graphs title goes here}</div>
                <!-- Placeholder for generated graph -->
                <div class="graph"></div>
            </div>
            <div class="graphHolder">
                <div class="graphTitle">{Individual graphs title goes here}</div>
                <!-- Placeholder for generated graph -->
                <div class="graph"></div>
            </div>
        </li>
        
        <!-- 2nd slide -->       
         <li id="slide2">
            <!-- Repeat the graphHolder's for each graph to be displayed on a slide (2 graph placeholder examples are currently being shown)-->
            <div class="Header">{Insert Header Name Here}</div>
                <div class="text">{Insert Text Here}</div>
            <div class="graphHolder">
                <div class="graphTitle">{Individual graphs title goes here}</div>
                <!-- Placeholder for generated graph -->
                <div class="graph"></div>
            </div>
            <div class="graphHolder">
                <div class="graphTitle">{Individual graphs title goes here}</div>
                <!-- Placeholder for generated graph -->
                <div class="graph"></div>
            </div>
        </li>
    </ul>
</div>

<!-- Information that displays in an overlay (jQuery Tools library) -->
<div id="DashboardInfo1" class="dashboardInfoPart">
        {Insert Text Here}
</div>
<div id="DashboardInfo" class="dashboardInfoPart">
        {Insert Text Here}
</div>

<!-- Placeholder for a loading graphic -->
<div id="dash-loading"></div>
<!-- Placeholder for a tutorial button -->
<div id="dash-tut-btn" class="l-btn" ></div>
