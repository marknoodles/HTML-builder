const fs = require('fs')
let path = require('path');
path = './05-merge-styles/styles';
let currentText = '';
function newFunc(path) {
    fs.readdir(path,
        { withFileTypes: true },
        (err, files) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < files.length; i++) {
                let currentFile = files[i];
                let fileNameArray = currentFile.name.split('.');
                let currentFilePath = path + "/" + currentFile.name;
                let checkForCss = fileNameArray[1];
                if (checkForCss === "css") {
                    fs.readFile(currentFilePath, "utf-8", (err, content) => {
                        if (err) {
                            throw err;
                        }
                        currentText += content + '\n';
                        fs.writeFile('./05-merge-styles/project-dist/bundle.css', currentText, function (err) {
                        })
                    });

                }
            }
        })
}
newFunc(path);
