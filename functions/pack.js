const fs = require('fs');
const archiver = require('archiver');


function zipIt(folderName, outputDir) {
    fs.copyFileSync(__dirname + '/package.json', `${__dirname}/${outputDir}/${folderName}/package.json`)

    const output = fs.createWriteStream(__dirname + `/${outputDir}/${folderName}.zip`);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
        console.log('Data has been drained');
    });

    archive.on('warning', function (err) {
        console.warn(err)
    });

    archive.on('error', function (err) {
        throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(`${outputDir}/${folderName}/`, false);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
}

zipIt('get-token', 'dist')
zipIt('authorization', 'dist')
zipIt('user-info', 'dist')