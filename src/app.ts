import * as fs from "fs";

let musicPath = 'C:/Users/Macie/Music/music';

let songs: {
    name: string,
    size: number
}[] = [];

let dirents = fs.readdirSync(musicPath, { withFileTypes: true });

dirents.forEach(function (file) {
    let songStat = fs.statSync(`${musicPath}/${file.name}`);

    songs.push({
        name: file.name,
        size: songStat.size / 1000000
    });
});

let size = 940;
let tmp_size = 0;

let allSongs = 0;
let folderSongs = 100;
let folderName = 0;

function copyRandomSong() {

    if (folderSongs > 99) {
        folderName++;
        fs.mkdirSync(`D:/${folderName}`);
        folderSongs = 0;
    }

    let songIndex = Math.floor(Math.random() * songs.length);
    let song = songs[songIndex];
    let songPath = musicPath + '/' + song.name;

    tmp_size += song.size;
    fs.copyFileSync(songPath, `D:/${folderName}/${song.name}`, fs.constants.COPYFILE_EXCL);
    songs.splice(songIndex, 1);

    folderSongs++;
    allSongs++;
    console.log(song.name);
}

while (tmp_size < size) {
    copyRandomSong();
}

console.log(`${allSongs} songs dowloaded.`);