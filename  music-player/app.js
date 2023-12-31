const container = document.querySelector(".container")
const image = document.querySelector("#music-image")
const title = document.querySelector("#music-details .title")
const singer = document.querySelector("#music-details .singer")
const prev = document.querySelector("#controls #prev")
const play = document.querySelector("#controls #play")
const next = document.querySelector("#controls #next")
const duration = document.querySelector("#duration")
const currentTime = document.querySelector("#current-time")
const progressBar = document.querySelector("#progress-bar")
const volume = document.querySelector("#volume")
const volumeBar = document.querySelector("#volume-bar")
const ul = document.querySelector("ul")

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

prev.addEventListener("click", function(){
    player.prev()
    let music =  player.getMusic()
    displayMusic(music)
    playMusic()
})

next.addEventListener("click", function() {
    player.next()
    let music =  player.getMusic()
    displayMusic(music)
    playMusic()
})

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing")
    isMusicPlay ? pauseMusic() : playMusic()
    
})

function pauseMusic() {
    container.classList.remove("playing")
    play.classList = "fa-solid fa-play"
    audio.pause()
}
function playMusic() {
    container.classList.add("playing")
    play.classList = "fa-solid fa-pause"
    audio.play()
}

const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60)
    const second = Math.floor(totalSeconds % 60)
    const updatesSecond = second < 10 ? `0${second}`: `${second}`
    const result = `${minute}:${updatesSecond}`;
    return result;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration)
    progressBar.max = Math.floor(audio.duration)
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(progressBar.value)
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value
})

let audioStatus = "voiced";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value
    audio.volume = value / 100

    if (value <=0 ) {
        volume.classList = "fa-solid fa-volume-xmark"
    } else {
        volume.classList = "fa-solid fa-volume-high" 
    }

})
volume.addEventListener("click", () => {
    if(audioStatus==="voiced") {
        audio.muted = true;
        audioStatus = "silent"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0
    } else {
        audio.muted = false;
        audioStatus = "voiced"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100
    }
});
