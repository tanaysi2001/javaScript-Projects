console.log("Heyyy lets write javascript.....");
let songs = [];
let songLoaded = false;
let playlistRendered = false;
let currFolder;
let isMute=false;
let defaultVolume=0.5; //for restoring the volume
let currentSong = new Audio();

//function for converting seconds to minute
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

//play music function
const playMusic = async (track, pause = false) => {
  currentSong.src = `/songs/${currFolder}/` + track;
  document.querySelector(".songinfo").innerHTML = decodeURI(track);

  if (!pause) {
    await currentSong.play();
    play.src = "images/pause.svg"; //this gives the src file of the audio or image
  } else {
    play.src = "images/play.svg";
  }
};

async function main(folder) {
  // if folder changed -> reset everything
  // if (currFolder !== folder) {
  //   songLoaded = false;
  //   playlistRendered = false;
  // }

  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/songs/${folder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]); //split will split the array according to splitter which divides the
      //array into two parts .Then we are taking only the the array after the part /songs/
    }
  }
  songLoaded = true;
  return songs;
}

//making the song list
function showSongs(songList) {
  let songUL = document.querySelector(".songList ul");
  songUL.innerHTML = "";

  for (let song of songList) {
    songUL.innerHTML += `<li>
      <img class="invert" src="images/music.png" alt="music">
      <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Tany</div>
      </div>
      <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="images/playnow.png" alt="playnow">
      </div>
    </li>`;
  }

  Array.from(document.querySelectorAll(".songList li")).forEach((li) => {
    li.addEventListener("click", () => {
      playMusic(li.querySelector(".info div").innerHTML.trim());
    });
  });
}

//function for displayoing the albums
async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  // console.log(div)
  // console.log(div);
  let anchors = div.getElementsByTagName("a");

  let cardContainer=document.querySelector(".cardContainer");

  let array=Array.from(anchors)
  // console.log(anchors);
  for(let i=0;i<array.length;i++){
    const e=array[i];
    let href=e.getAttribute("href")
    console.log(href);
    
    //igonring the wrong links
    if(!href) continue;
    if(href==="/" || href==="/songs")continue;
    // console.log(href);

    //take the folder name from the link
    let folder=href.split("/").slice(-1)[0]
    console.log(folder);

    //get the meta data of the folders
     let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
     let response = await a.json();
     console.log(response);

     //populating the card
     cardContainer.innerHTML=cardContainer.innerHTML+`<div data-folder="${folder}" class="card">
                        <div class="play">
                            <img src="images/play.svg" alt="play">
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description} </p>
                    </div>`

  }
}

async function start() {
  //Display all the albums on the page
  await displayAlbums();

  //Attach an event listener to play ,next,previous
  play.addEventListener("click", async () => {
    //  if no song loaded yet
    if (!currentSong.src || currentSong.src === window.location.href) {
      // load default playlist song
      songs = await main("ncs"); // first folder
      showSongs(songs); // render in left side
      playMusic(songs[0]); // play first song
      return;
    }

    if (currentSong.paused) {
      //here paused is boolean variable
      currentSong.play();
    } else {
      currentSong.pause();
    }
  });

  //adding functionality for changing the images
  currentSong.addEventListener("play", () => {
    play.src = "images/pause.svg"; //src is source url.here we did not use the
    //queryselector because id's are declared as global variable
  });

  currentSong.addEventListener("pause", () => {
    play.src = "images/play.svg";
  });

  //Listen for time update event.
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentSong.currentTime,
    )} / ${formatTime(currentSong.duration - currentSong.currentTime)}`;

    //updating the seek bar
    if (!isNaN(currentSong.duration)) {
      const percent = (currentSong.currentTime / currentSong.duration) * 100;
      let circle = document.querySelector(".circle");
      circle.style.left = percent + "%";
    }
  });

  //adding an event listener to seek bar

  let seekbar = document.querySelector(".seekbar");
  let circle = document.querySelector(".circle");
  seekbar.addEventListener("click", (e) => {
    const rect = seekbar.getBoundingClientRect();

    const clickX = e.clientX - rect.left; //position inside the bar
    const percent = clickX / rect.width;

    circle.style.left = percent * 100 + "%";
    currentSong.currentTime = percent * currentSong.duration;
  });

  //add an eventlistener for hamburger button

  let hamburger = document.querySelector(".hamburger");
  let left = document.querySelector(".left");

  hamburger.addEventListener("click", () => {
    left.classList.add("open");
  });

  //adding an event listener for close button
  let close = document.querySelector(".close");
  close.addEventListener("click", () => {
    left.classList.remove("open");
  });

  //adding an event listener for closing button when not clicked
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1400) {
      left.classList.remove("open");
    }
  });

  //adding event listener for previous buttons
  let prev = document.querySelector("#previous");
  let next = document.querySelector("#next");

  prev.addEventListener("click", () => {
    console.log("previous clicked");

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(currentSong.src.split("/").slice(-1)[0]);

    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  //adding event listener for  next buttons
  next.addEventListener("click", () => {
    currentSong.pause();
    console.log("Next clicked..");

    //finding the index of the current song
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
    // console.log(songs,"index is : ",index)
  });

  //add an event listener for volume control
  let range = document.querySelector(".range");
  let vol = range.getElementsByTagName("input")[0];
  vol.addEventListener("change", (e) => {
    console.log("setting volume to :", e.target.value / 100);
    currentSong.volume = e.target.value / 100;
  });

  //add event listener for cards
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    card.addEventListener("click", async (e) => {
      // reset everything
      songs = [];
      songLoaded = false;
      playlistRendered = false;

      // load songs from clicked folder
      let folder = e.currentTarget.dataset.folder; //selecting the folder
      //we use currentTarget because when we click on the card section then we have to show the
      //  songs but not when clicked on any other elements
      songs = await main(folder);

      console.log("Loaded songs:", songs);
      console.log("Folder name:", folder);

      //  NOW DISPLAY SONGS IN LEFT SIDE
      showSongs(songs);
      playMusic(songs[0], true); // load first song of that folder
    });
  });

  // Load first playlist automatically (whatever the first card is)
  let firstCard = document.querySelector(".card");
  let defaultFolder = firstCard.dataset.folder;

  songs = await main(defaultFolder);
  showSongs(songs);
  playMusic(songs[0], true); // load only, don't autoplay


  //add event listener to mute the track
  document.querySelector(".volume>img").addEventListener("click",e=>{
    if(!isMute){
      e.target.src="images/mute.png"
      isMute=true;
      currentSong.volume=0;
      let range = document.querySelector(".range");
      let vol = range.getElementsByTagName("input")[0];
      vol.value=0;
      console.log("voulme muted")
      
    }else{
      e.target.src="images/volume.png"
      isMute=false;
      currentSong.volume=defaultVolume;
      let range = document.querySelector(".range");
      let vol = range.getElementsByTagName("input")[0];
      vol.value=50;
      console.log("volume")
    }
    // (e.target.getAttribute("src"))="/images/mute.png"
    
  })
}

start();
