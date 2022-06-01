//default: show today's picture
showToday();

//shows picture on another date when button is clicked
document.querySelector('button').addEventListener('click', showOnDate);


function showToday() {
  const key =  'g1I9im27OqaDCKBiHQTCnrsCFDLxdUe3mCItapYU';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
  getData(url);
}



function showOnDate() {
  const key =  'g1I9im27OqaDCKBiHQTCnrsCFDLxdUe3mCItapYU';
  const date = document.querySelector('input').value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
  getData(url);
  
}


function getData(url) {
  let container = document.getElementById('mediaContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  };
  fetch(url) 
    .then(res => res.json())
    .then(data => {
      if (data.media_type === 'image') {
        let img = document.createElement('img');
        container.appendChild(img);
        document.querySelector('h2').innerText = data.title;
        document.querySelector('img').src = data.hdurl;
        document.querySelector('h3').innerText = data.explanation;
      } else if (data.media_type === 'video') {
        let video = document.createElement('iframe');
        container.appendChild(video);
        document.querySelector('h2').innerText = data.title;
        document.querySelector('iframe').src = data.url;
        document.querySelector('h3').innerText = data.explanation;
      }
    })
    .catch(err => console.log(`error ${err}`));
}



