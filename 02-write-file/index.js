const fs = require('fs')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

writeInput = function (text) {
    fs.writeFile('./02-write-file/HelloText.txt', text, function (err) {
        readInput();
    });
}
readInput = function () {
    rl.question("Write something \n", function (text) {
        if (text === 'exit') {
            rl.close();
        }
        let currentText = '';
        fs.stat("./02-write-file/HelloText.txt", (error, stats) => {
            if (error === null) {
                fs.readFile("./02-write-file/HelloText.txt", "utf-8", (err, content) => {
                    if (err) {
                        throw err;
                    }
                    currentText += content;
                    writeInput(currentText + '\n' + text);
                });
            } else {
                writeInput(currentText + text)
            }

        });
    });
}

readInput();

rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

