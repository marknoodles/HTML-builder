const fs = require('fs')
let path = require('path');
path = './03-files-in-folder/secret-folder';

function newFunc() {
    fs.readdir(path,
        { withFileTypes: true },
        (err, files) => {
            console.log("\nCurrent directory files:");
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < files.length; i++) {
                let fileMassive = files[i];
                let nameArray = fileMassive.name.split('.');
                let fileMassiveName = nameArray[0];
                let fileMassiveNameShort = nameArray[1];
                let pathFiles = path + "/" + fileMassive.name;
                
                fs.stat(pathFiles, (err, stats) => {
                    let fileSize = stats.size;
                    let fileSizeKilobytes = Math.floor(fileSize * 0.001) + "kb";
                    if (err) {
                        console.log(`File doesn't exist.`);
                    } else {
                        stats.isFile() ? console.log(fileMassiveName + " - " + fileMassiveNameShort + " - " + fileSizeKilobytes) : false;
                    }
                })
            }
        })
}
newFunc();

