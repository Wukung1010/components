const path = require("path");
const less = require("less");
const fs = require("fs");

less.render(fs.readFileSync(path.join(__dirname, "src/page.less")).toString('utf8'), function(e, output) {
    let fd = fs.openSync(path.join(__dirname, './dist/page.css'), 'w')
    fs.writeSync(fd, output.css)
});

module.exports = {
    entry: "./src/page.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "page.js",
        library: "Page",
        libraryTarget: "umd",
        libraryExport: 'default'
    }
};
