const fs = require('fs')
let path = require('path');
path = './06-build-page';
let currentText = '';

function newFunc(path1) {
    fs.readdir(path1 + "/" + "styles",
        { withFileTypes: true },
        (err, files) => {
            if (err) {
                console.log(err);
            }

            console.log('%c⧭', 'color: #73998c', files);
            for (let i = 0; i < files.length; i++) {
                let currentFile = files[i];
                let fileNameArray = currentFile.name.split('.');
                let currentFilePath = path1 + "/" + "styles" + "/" + currentFile.name;
                let checkForCss = fileNameArray[1];
                if (checkForCss === "css") {
                    fs.readFile(currentFilePath, "utf-8", (err, content) => {
                        if (err) {
                            throw err;
                        }
                        currentText += content + '\n';

                        fs.writeFile(path1 + '/' + 'project-dist' + "/" + 'style.css', currentText, function (err) {
                            if (err) {
                                console.log("Error!!")
                            }
                        })
                    });
                }
            }
        })
}


function copyFolder(path, copyPath) {
    fs.readdir(path,
        { withFileTypes: true },
        (err, files) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < files.length; i++) {
                let currentFile = files[i];
                let fileName = currentFile.name;
                let currentFilePath = path + "/" + fileName;
                fs.stat(currentFilePath, (err, stats) => {
                    if (err) {
                        console.log(`No files in folder`);
                    } else {
                        if (stats.isDirectory()) {

                            mkdir(copyPath + '/' + fileName);
                            console.log('%c%s', 'color: #514080', copyPath + '/' + fileName);
                            copyFolder(path + '/' + fileName, copyPath + '/' + fileName + '/')
                        } else if (stats.isFile()) {
                            let pathToCopy = copyPath + fileName;

                            console.log('%c%s', 'color: #514080', pathToCopy);
                            fs.copyFile(currentFilePath, pathToCopy, (err) => {
                                if (err) {
                                    console.log("No Files In Folder!")
                                }
                            })
                        }
                    }
                })
            }
        })
}

newFunc(path);
mkdir(path + "/" + "project-dist");
mkdir(path + "/project-dist/assets");
copyFolder(path + "/" + "assets", path + "/project-dist/assets");

function mkdir(path) {
    fs.mkdir(path, function (err) {
        if (err) {
            return console.log("Directory refreshed successfully!");
        }
        console.log("Directory created successfully!");
    });
}

fs.readFile(path + "/template.html", 'utf8', function (err, content) {
    if (err) {
        return console.log(err);
    }
    let result = content.replace(/{{/g, "<").replace(/}}/g, ">");
    fs.writeFile(path + "/project-dist/index.html", result, 'utf8', function (err) {
        if (err) return console.log(err);

    });
});
