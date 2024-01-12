console.log("lets start with javascript");
let currentSong= new Audio();
let songs;

//seconds to minute-seconds convertor function
function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        console.error("Invalid input. Please provide a valid number of seconds.");
        return '';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
const totalSeconds = 72;
const formattedTime = formatTime(totalSeconds);
console.log(formattedTime); // Output: "01:12"



async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

//funtion
const playMusic = (track)=>{
    currentSong.src = "/songs/" + track
     currentSong.play()
     play.src ="img/pause.svg"
     document.querySelector(".songinfo").innerHTML = track
        document.querySelector(".songtime").innerHTML ="00:00 / 00.00"

}



async function main() {


  //to get all teh songs
   songs = await getSongs();
  console.log(songs);


//show all the songs in the playlist
  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
    


//code with harrys
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
                    <div class="info"> 
                        <div> ${song.replaceAll("%20", " ")}</div>
                        <div>Sahil</div>
                    </div>
                    <div class="playNow">
                        <span>Play Now</span>
                        <img src="img/play.svg" style="filter: invert(10);" alt="">
                    </div> </li>`;
  }

  //play the first song
// var audio = new Audio(songs[0]);
  // audio.play();

  


// attach an event listener to each song
 Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
})


 //attach an event to listener to previous play and next
 play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src ="img/pause.svg"
        
    }
    else{
        currentSong.pause();
        play.src ="img/play.svg"
    }
 })

//listen for time update event 
currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime , currentSong.duration)
    document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} /
    ${formatTime(currentSong.duration)}`

    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
})

//add an event listener to seek bar
document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent =(e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left =percent + "%";
    currentSong.currentTime = ((currentSong.duration)*percent) / 100 ;
})

//add an event listener to previous and next 


//for previous button 
previous.addEventListener("click",()=>{
    console.log("previous")
   let index =songs.indexOf(currentSong.src.split("/").slice(-1) [0])
   if(index-1 >= 0){
    playMusic(songs[index-1])
   }
})
//for next add eevt
next.addEventListener("click",()=>{
    console.log("next")
   let index =songs.indexOf(currentSong.src.split("/").slice(-1) [0])
   if(index+1 > length){
    playMusic(songs[index+1])
   }
})
//add an event listener on hamburger 
document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".home-sec").style.left="0"
})

//add an event listener to close wali svg
document.querySelector(".close").addEventListener("click",()=>{
  document.querySelector(".home-sec").style.left="-100%"
})

//add event listener to home button
document.querySelector(".home").addEventListener("click",()=>{
  document.querySelector(".home-sec").style.left="-100%"
})


}

main();
// getSongs()
