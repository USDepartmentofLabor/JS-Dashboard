Dashboard
===========

Description:
    This code illustrates how to create a dashboard that will display graphs using the JIT, FLOT, and jQuery cycle API's in a section of a website. With jQuery cycle, you can create a smany pages or slides that fit your needs. Using simple HTML and CSS, you can display as many graphs per slide as you need or that can fit on a slide.

Notes:
    Each graph can be created in a modular fashion by using a separate .js file for each graph. Be sure to include each .js file in your index file.
    
    An optional mouseHandler.js file has been included to illustrate how you can integrate tooltips with flot charts.
    
    A file that gathers all the data from the database will be needed. This file can be called via ajax when the page loads, or as part of a cron job that will create cache files to ensure optimal performance. 