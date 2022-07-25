const API_KEY =  'g1I9im27OqaDCKBiHQTCnrsCFDLxdUe3mCItapYU';
const API_URL = `https://api.nasa.gov/planetary/apod`;
const buttonElement = document.querySelector('button');
const inputElement = document.querySelector('input');

//shows today's picture onload
initToday();

//shows picture on another date when button is clicked
buttonElement.addEventListener('click', showOnDate);
//bind Enter key
inputElement.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});

//shows today's picture
function initToday() {
  const params = {api_key: API_KEY};
  getData(API_URL, params).then(data => {
    setTitle(data);
    setExplanation(data);
    if (data.media_type === 'image') {
      appendImg(data);
      fullScreen(data.hdurl);
    } else if (data.media_type === 'video') {
      appendVideo(data);
    }
  });
}

//fetches data
async function getData(url, params) {
  //api_key = abc and date=abc
  try {
    const response = await fetch(`${url}/?${new URLSearchParams(params)}`) 
    return response.json()
    }catch (error) {
      console.log(`error ${error}`)
    }
}

//shows picture on specified date
function showOnDate() {
  const date = document.querySelector('input').value;
  removeMedia();
  if (isInTheFuture(date)) {
    genFutureContent();
    return;
  }

  const params = {
    api_key: API_KEY,
    date: date
  }
  getData(API_URL, params).then(data => {
  setTitle(data);
  setExplanation(data);
  if (data.media_type === 'image') {
    appendImg(data);
    fullScreen(data.hdurl);
  } else if (data.media_type === 'video') {
    appendVideo(data);
  }
  });
}

//check if date selected is in the future
function isInTheFuture(date) {
  const today = new Date();
  today.setHours(23, 59, 59, 998); 
  date = Date.parse(date);
  return date > today;
}


//sets the title of the picture
function setTitle(data) {
  document.querySelector('h2').innerText = data.title.toUpperCase();
}

//sets the explanation of the picture
function setExplanation(data) {
  document.querySelector('p').innerText = data.explanation.split('.')[0] + ".";
}

//removes image/video from previous fetch
function removeMedia() {
  let mediaContainer = document.getElementById('mediaContainer');
  while (mediaContainer.firstChild) {
    mediaContainer.removeChild(mediaContainer.firstChild);
  }
}

//makes new img element and appends it to parent container
function appendImg(data) {
  mediaContainer.appendChild(document.createElement("img")).className = "media";
  document.querySelector('.media').src = data.hdurl;
}

//makes new iframe element and appends it to parent container
function appendVideo(data) {
  mediaContainer.appendChild(document.createElement("iframe")).className = "media";
  document.querySelector('.media').src = data.url;
}

//make picture fullscreen on click event
const fullPage = document.querySelector('#fullpage');

function fullScreen (src) {
  document.querySelector('.media').addEventListener('click', function() {
    fullPage.style.backgroundImage = 'url(' + src + ')';
    fullPage.style.display = 'block';
    document.querySelector('#mediaContainer').style.display = 'none';
    document.querySelector('.container').style.display = 'none'
  })
} 

//exit fullscreen
fullPage.addEventListener('click', exitFullScreen);

function exitFullScreen() {
  fullPage.style.display = 'none';
  document.querySelector('.container').style.display = 'flex';
  document.querySelector('#mediaContainer').style.display = 'flex';
}

//list of fun facts for edge case: future date selection
const funFacts = [
  {
    fact : "One million Earths could fit inside the sun.",
    src: "/img/futureContent/earthToSun.png"
  },
  {
    fact : "There is strong evidence indicating that there is running water on Mars.",
    src: "/img/futureContent/waterOnMars.jpeg"
  },
  {
    fact : "Comets are leftovers from the creation of our solar system about 4.5 billion years ago – they consist of sand, ice and carbon dioxide.",
    src: "/img/futureContent/comet.png"
  },
  {
    fact : "You wouldn’t be able to walk on Jupiter, Saturn, Uranus or Neptune because they have no solid surface.",
    src: "/img/futureContent/jovianPlanets.jpeg"
  },
  {
    fact : "If you could fly a plane to Pluto, the trip would take more than 800 years.",
    src: "/img/futureContent/pluto.png"
  },
  {
    fact : "Scientists estimate there are about 500,000 pieces of space junk today, including fragments from rockets and satellites.",
    src: "/img/futureContent/spaceJunk.png"
  },
  {
    fact : "An asteroid about the size of a car enters Earth’s atmosphere roughly once a year – but it burns up before it reaches us.",
    src: "/img/futureContent/asteroid.png"
  },
  {
    fact : "There are more stars in the universe than grains of sand on all the beaches on Earth. That’s at least a billion trillion.",
    src: "/img/futureContent/stars.png"
  },
  {
    fact: "The Apollo astronauts' footprints on the moon could last up to 100 million years.",
    src: "/img/futureContent/footprint.png"
  },
  {
    fact : "The sunset on Mars appears blue.",
    src: "/img/futureContent/sunsetOnMars.png"
  },
]

//generates content for future date selection by random order
function genFutureContent() {
  let funFactIndex = Math.floor(Math.random() * 10);
  appendFutureText(funFactIndex);
  appendFutureImg(funFactIndex);
}

//appends text for future date selection
function appendFutureText(funFactIndex) {
  document.querySelector('h2').innerText = "The future has yet to come";
  document.querySelector('p').innerHTML = "It looks like you've selected a date in the future. We don't have that for you just yet, please select another date.";
  document.querySelector('.content').appendChild(document.createElement("p")).className = "funFactText";
  document.querySelector('.funFactText').innerText = `Meanwhile, here's a fun fact: ${funFacts[funFactIndex].fact}`;
}

//appends image for future date selection
function appendFutureImg(funFactIndex) {
  mediaContainer.appendChild(document.createElement("img")).className = "media";
  let imageSrc = funFacts[funFactIndex].src
  document.querySelector('.media').src = imageSrc;
  fullScreen(imageSrc);
}
