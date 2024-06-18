const songs = [
    {
        title: 'Criminal',
        thumbnail: './assets/thumbnails/Criminal.jpg',
        path: './assets/songs/Criminal.mp3',
        artist: 'Akon, Shruti Pathak and Vishal Dadlani'
    },
    {
        title: 'Drama Queen',
        thumbnail: './assets/thumbnails/Drama_Queen.jpg',
        path: './assets/songs/Drama Queen.mp3',
        artist: 'Shreya Ghoshal and Vishal Dadlani'
    },
    {
        title: 'Fantasize',
        thumbnail: './assets/thumbnails/Fantasize.jpg',
        path: './assets/songs/Fantasize.mp3',
        artist: 'Ariana Grande'
    },
    {
        title: 'Kiya Kiya',
        thumbnail: './assets/thumbnails/Kiya_Kiya.jpg',
        path: './assets/songs/Kiya Kiya.mp3',
        artist: 'Sunidhi Chauhan',
    },
    {
        title: 'Moonlight',
        thumbnail: './assets/thumbnails/Moonlight.jpg',
        path: './assets/songs/Moonlight.mp3',
        artist: 'Kali Uchis'
    },
    {
        title: 'Ordinary Person',
        thumbnail: './assets/thumbnails/Ordinary_Person.jpg',
        path: './assets/songs/Ordinary Person.mp3',
        artist: 'Anirudh'
    },
    {
        title: 'Thug Le',
        thumbnail: './assets/thumbnails/Thug_Le.jpg',
        path: './assets/songs/Thug Le.mp3',
        artist: 'Vishal Dadlani and Shweta Pandit'
    },
    {
        title: 'Thumkeshwari',
        thumbnail: './assets/thumbnails/Thumkeshwari.jpg',
        path: './assets/songs/Thumkeshwari.mp3',
        artist: 'Sachin-Jigar and Rashmeet Kaur'
    },
    {
        title: 'Tumhi Ho Bandhu',
        thumbnail: './assets/thumbnails/Tumhi_Ho_Bandhu.jpg',
        path: './assets/songs/Tumhi Ho Bandhu.mp3',
        artist: 'Neeraj Shridhar and Kavita Seth'
    },
    {
        title: 'Uncha Lamba Kad',
        thumbnail: './assets/thumbnails/Uncha_Lamba_Kad.jpg',
        path: './assets/songs/Uncha Lamba Kad.mp3',
        artist: 'Anand Raj Anand and Kalpana Patowary'
    },
];

const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const player = document.querySelector('.player');
const h2 = document.getElementsByTagName('h2')[0];
let thumbnail = document.querySelector('.thumbnail');
const progress = document.getElementById('prg');
let songIndex = 0;
let audio = null;
let cplaying;

(() => {
    audio = new Audio(songs[songIndex].path);
    audio.addEventListener('ended', () => {
        songIndex++;
        playnext();
    })
    setTitle();
    setArtist();
    setThumbnail();
    setTotalDuration();

    play_pause.addEventListener('click', () => {
        setColour();
        playSong();
        play_pause.classList.toggle('fa-circle-pause');
    });
    previous.addEventListener('click', () => {
        progress.value = 0;
        audio.pause();
        (songIndex == 0) ? (songIndex = songs.length - 1) : (songIndex--);
        playaudio();
    });
    next.addEventListener('click', () => {
        progress.value = 0;
        audio.pause();
        (songIndex == (songs.length - 1)) ? (songIndex = 0) : (songIndex++);
        playaudio();
    });
})();


function setTitle() {
    title.innerText = songs[songIndex].title;
}

function setArtist() {
    artist.innerText = songs[songIndex].artist;
}

function setThumbnail() {
    thumbnail.style.background = `url(${songs[songIndex].thumbnail})`;
    thumbnail.style.backgroundPosition = 'center center';
    thumbnail.style.backgroundSize = 'cover';
}

function playSong() {
    (audio.paused) ? (() => {
        audio.play();
        cplaying.style.animationPlayState = 'running';
        thumbnail.style.animationPlayState = 'running';
    })() : (() => {
        audio.pause();
        cplaying.style.animationPlayState = 'paused';
        thumbnail.style.animationPlayState = 'paused';
    })();

}

function setTotalDuration() {
    let lastUpdateTime = 0;
    current_time.innerText = '00:00';
    audio.onloadedmetadata = () => {
        let songlength = audio.duration;
        let minutes = Math.floor(songlength / 60);
        songlength %= 60;
        let seconds = Math.floor(songlength);
        minutes = (minutes < 10) ? ('0' + minutes) : minutes;
        seconds = (seconds < 10) ? ('0' + seconds) : seconds;
        total_duration.innerText = `${minutes}:${seconds}`;
        audio.addEventListener('timeupdate', () => {
            if ((audio.currentTime - lastUpdateTime) >= 1) {
                updateCurrentTime(audio.duration);
                lastUpdateTime = audio.currentTime;
            }
        });
    }
}

function updateCurrentTime(songlength) {
    let currentTime = audio.currentTime;
    let minutes = Math.floor(currentTime / 60);
    currentTime %= 60;
    let seconds = Math.floor(currentTime);
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;
    current_time.innerText = `${minutes}:${seconds}`;
    updateProgressBar(songlength, audio.currentTime);
}

function updateProgressBar(songlength, currentTime) {
    let value = (currentTime / songlength) * 100;
    progress.value = value;
    progress.addEventListener('change', () => {
        audio.currentTime = (progress.value * songlength) / 100;
    })
}

function playnext() {
    progress.value = 0;
    (songIndex == (songs.length - 1)) ? (songIndex = 0) : (songIndex++);
    let newThumbnail = thumbnail.cloneNode(true);
    thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);
    thumbnail = newThumbnail;
    setThumbnail();
    setTitle();
    setArtist();
    audio = new Audio(songs[songIndex].path);
    playSong();
    setTotalDuration();
}

function playaudio() {
    audio = new Audio(songs[songIndex].path);
    audio.addEventListener('ended', () => {
        playnext();
    })
    setTitle();
    setArtist();
    if (play_pause.classList.contains('fa-circle-pause')) {
        playSong();
        setColour();
    }
    setTotalDuration();
    let newThumbnail = thumbnail.cloneNode(true);
    thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);
    thumbnail = newThumbnail;
    setThumbnail();
}


//PlayList Part
let playlistbox = document.querySelector('.playlist');
playlist.addEventListener('click', () => {
    playlistbox.classList.toggle('show');
})

window.addEventListener('click', (e) => {
    if (e.target !== playlist && e.target !== previous && e.target !== next && e.target !== play_pause && !e.target.classList.contains('songsList') && e.target !== progress) {
        playlistbox.classList.remove('show');
    }
})

songs.forEach((item, index) => {
    let newdiv = document.createElement('div');
    newdiv.classList.add('songsList');
    newdiv.innerText = (index + 1) + '.' + ' ' + item.title;
    playlistbox.appendChild(newdiv);
})

function setColour() {
    let tempitem = document.querySelectorAll('.playlist div');
    tempitem.forEach(z => {
        z.classList.remove('currentplaying');
    })
    tempitem[songIndex].classList.add('currentplaying');
    cplaying = document.querySelector('.currentplaying');
}

function playOnClick() {
    let playlistItems = document.querySelectorAll('.playlist div');
    playlistItems.forEach(e => {
        e.style.cursor = 'pointer';
        e.addEventListener('mouseover', () => {
            e.style.opacity = '0.7';

        });
        e.addEventListener('mouseleave', () => {
            e.style.opacity = '1';

        });
        e.addEventListener('click', () => {
            progress.value = '0';
            audio.pause();
            songIndex = parseInt(e.innerText.split('.')[0]) - 1;
            audio = new Audio(songs[songIndex].path);
            console.log(songIndex);
            audio.play();
            setThumbnail();
            setTitle();
            setArtist();
            setTotalDuration();
            setColour();
            play_pause.classList.add('fa-circle-pause');
        })
    })
}
playOnClick();