module.exports = exports = function(app, socketCallback) {
    var io = require('socket.io');
    var uuid = require('node-uuid');
    var fs = require('fs');
    var path = require('path');

    try {
        io = io(app);
        io.on('connection', onConnection);
        console.info('aloalao11');
    } catch (e) {
        io = io.listen(app, {
            log: false,
            origins: '*:*'
        });

        io.set('transports', [
            'websocket', // 'disconnect' EVENT will work only with 'websocket'
            'xhr-polling',
            'jsonp-polling'
        ]);
        io.sockets.on('connection', onConnection);
    }

    function onConnection(socket) {


        socket.on('message', function(data) {
            console.log('start recoding...');
            var fileName = uuid.v4();

            //socket.emit('ffmpeg-output', 0);

            writeToDisk(data.audio.dataURL, fileName + '.wav');

            // if it is chrome
            if (data.video) {
                console.info('fire chrome');
                writeToDisk(data.video.dataURL, fileName + '.webm');
                merge(socket, fileName);
            }
            // // if it is firefox or if user is recording only audio
            // else {
            //     console.info('fire fox');

            //     mergeFF(fileName);
            //     //socket.emit('merged', fileName + '.wav');
            // }
        });
    }

    function writeToDisk(dataURL, fileName) {
        var fileExtension = fileName.split('.').pop(),
            fileRootNameWithBase = './uploads/' + fileName,
            filePath = fileRootNameWithBase,
            fileID = 2,
            fileBuffer;

        // @todo return the new filename to client
        while (fs.existsSync(filePath)) {
            filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
            fileID += 1;
        }

        dataURL = dataURL.split(',').pop();
        fileBuffer = new Buffer(dataURL, 'base64');
        fs.writeFileSync(filePath, fileBuffer);

        console.log('filePath', filePath);
    }

    function merge(socket, fileName) {


        var FFmpeg = require('fluent-ffmpeg');

        var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
            videoFile = path.join(__dirname, 'uploads', fileName + '.webm'),
            mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.webm');

        console.log('audioFile--', audioFile);

        console.log('videoFile--', videoFile);

        console.log('mergedFile--', mergedFile);

        // var util = require('util'),
        //     child_process = require('child_process');

        // var exec = child_process.exec;

        // function puts(error, stdout, stderr) {
        //     stdout ? util.print('stdout: ' + stdout) : null;
        //     stderr ? util.print('stderr: ' + stderr) : null;
        //     error ? console.log('exec error: ' + error) : null;
        // }

        // exec("/usr/local/bin/ffmpeg -i "+videoFile+" -i "+audioFile+" -map 0:0 -map 1:0 "+mergedFile, puts);


        var proc = new FFmpeg({ source: videoFile, nolog: true });
        proc.setFfmpegPath('/usr/local/bin/ffmpeg');

        proc.addInput(audioFile)
           // .addOption('-vf', 'movie=logo.png [watermark]; [in][watermark] overlay=10:10 [out] ') //watermark,position top -30px and right 0
            .on('error', function(err) {
                console.info('ffmpeg : An error occurred: ',err.message);
                //socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + err.message);
            })
            .on('progress', function(progress) {
                console.log('progress--', progress);
            })
            .on('end', function() {
                console.info('link---', fileName + '-merged.mp4');
                //socket.emit('merged', fileName + '-merged.mp4');
                console.log('Merging finished !');

                // removing audio/video files
                fs.unlink(audioFile);
                fs.unlink(videoFile);
            })
            .saveToFile(mergedFile);
    }
}
