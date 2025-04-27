let progress = document.querySelector("#progress");
let origsong = document.querySelector("#song");
let playIcon = document.querySelector(".play-icon");
let backIcon = document.querySelector(".back-icon");
let frontIcon = document.querySelector(".front-icon");
let img = document.querySelector(".song-img");
let songName = document.querySelector(".song-name");
let singerName = document.querySelector(".singer-name");





let currentIndex = 0;
let songs = [];

async function loadSongs() {
const res = await fetch('music.json');
songs = await res.json();
loadSong(currentIndex);
}

function loadSong(index) {
const song = songs[index];
songName.innerHTML = song.name;
singerName.innerHTML = song.singer;
img.src = song.image;
origsong.src = song.src;
origsong.play();
}

window.onload = loadSongs;


song.onended = function(){
currentIndex = (currentIndex + 1) % songs.length;
loadSong(currentIndex);
}
backIcon.onclick = function(){
currentIndex = (currentIndex - 1 + songs.length) % songs.length;
loadSong(currentIndex);

playIcon.classList.remove("fa-play");
playIcon.classList.add("fa-pause");
};

frontIcon.onclick = function(){
currentIndex = (currentIndex + 1) % songs.length;
loadSong(currentIndex);


playIcon.classList.remove("fa-play");
playIcon.classList.add("fa-pause");
};

song.onloadedmetadata = function(){
progress.max = song.duration;
progress.value = song.currentTime;
};

function playPause(){
if(playIcon.classList.contains("fa-pause")){
song.pause();
playIcon.classList.remove("fa-pause");
playIcon.classList.add("fa-play");
}else{
song.play();
playIcon.classList.add("fa-pause");
playIcon.classList.remove("fa-play");
}
};

if(song.play()){
setInterval(() => {
progress.value = song.currentTime;  
}, 250);
}

progress.onchange = function(){
song.play();
song.currentTime = progress.value;
playIcon.classList.add("fa-pause");
playIcon.classList.remove("fa-play");
};