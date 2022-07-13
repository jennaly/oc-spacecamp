# NASA - Astronomy Picture of The Day
An application that shows the user NASA’s Astronomy Picture of the Day (APOD) and a short description on the image. Users can also select any day in the past. For certain days, the server may return a video. 

**Link to project:** https://ocspacecamp.netlify.app

![alt text](https://github.com/jennaly/nasa-apod/blob/main/img/ocspacecamp.gif?raw=true)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The imagery, title, and description are fetched from <a href="https://api.nasa.gov/">NASA's APOD API</a>. Input from the user is appended to the request URL as a parameter to retrieve data from the specified date. The website layout is built to be responsive using flexbox.

## Optimizations

I refactored a complicated function that had multiple components to it: fetching the data, removing and creating elements, and appending said elements to the DOM. The refactored code now consists of smaller individual functions that each serve a single purpose and are aptly named after their sole intention. This results in cleaner, more structured logic as well as easier debugging. 

## Lessons Learned:

I learned to implement DOM manipulation methods from the need to update contents of the HTML document with the data returned by the NASA API. 

