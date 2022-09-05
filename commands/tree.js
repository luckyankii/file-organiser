let fs = require("fs");
let path = require("path");

/*---------------------------------- Tree logic and code-------------------------------------------*/

function treeFn(dirpath) {
  if (dirpath == undefined) {
    console.log("kindly enter the path");

    treehelper(process.cwd(), "");
    // process.cwd(); --> this will return the path of current directory
    return;
  } else {
    let doesexist = fs.existsSync(dirpath);
    // its check is there is directory exist
    if (doesexist) {
      treehelper(dirpath, "");
    } else {
      console.log("Enter the correct directory");
      // return;
    }
    //console.log("Tree is implemented in " + dirpath);
  }
}
/* ------------------------------ Its help to give tree structure----------------------------------*/
function treehelper(dirpath, indent) {
  // Is file or folder
  let isfile = fs.lstatSync(dirpath).isFile();
  if (isfile) {
    let filename = path.basename(dirpath);
    console.log(indent + "🗀 " + "├──" + filename);
  } else {
    let dirname = path.basename(dirpath);
    console.log(indent + "📁 " + "⇨ " + dirname);
    let children = fs.readdirSync(dirpath);
    for (let i = 0; i < children.length; i++) {
      let childpath = path.join(dirpath, children[i]);
      treehelper(childpath, indent + "\t");
    }
  }
}
module.exports = { treekey: treeFn };
