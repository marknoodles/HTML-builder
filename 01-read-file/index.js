const fs = require('fs');
fs.readFile("./01-read-file/text.txt", "utf-8", (err,content) =>{
    if (err){
        throw err;
    }
    console.log(content);
});
