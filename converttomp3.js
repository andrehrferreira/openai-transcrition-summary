const fs = require("fs");
const ffmpeg = require("ffmpeg");

console.log(__dirname + "/audios/1 - Contexto - Hardware, drives, e SO.m4a");

var fileReader = fs.createReadStream(__dirname + "/audios/1 - Contexto - Hardware, drives, e SO.m4a");

var tp = ffmpeg(fileReader)
    .withNoVideo()
    .inputFormat('m4a')
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .format('mp3')
    .on('error', (err) => console.error(err))
    .on('end', () => console.log('Finished!'))
    .save(fs.createWriteStream("1 - Contexto - Hardware, drives, e SO.mp3"));