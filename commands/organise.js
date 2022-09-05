let fs = require("fs");
let path = require("path");
let typeobj = require("./utility");

/*--------------------------------- oraganise function logic---------------------------------------*/

function organiseFn(dirpath) {
  //Think pseudo code
  // 1-input ->directory path is given
  let destpath;
  if (dirpath == undefined) {
    destpath = process.cwd(); // cwd -> means current working directory
    console.log(
      "As you haven't enter the path ,your  path is current directory"
    );
    return;
  } else {
    let doesexist = fs.existsSync(dirpath);
    // its check is there is directory exist
    if (doesexist) {
      // 2-create ->organise files ->directory
      destpath = path.join(dirpath, "organised_files");
      // we have used join as manually we can't do for iso and windows at same time
      if (fs.existsSync(destpath) == false) {
        // This check is must as if file exist its create an error
        fs.mkdirSync(destpath);
      } else {
        console.log("Enter the correct directory");
        // return;
      }
    }
  }
  organisehelper(dirpath, destpath);
}
/*------------------------------ organise helper functions-------------------------------------- */
function organisehelper(srcpath, destpath) {
  // 3-identify categories of all the files present in that dir
  let child = fs.readdirSync(srcpath); // But here  only file is stored
  //console.log(child);
  for (let i = 0; i < child.length; i++) {
    let childaddress = path.join(srcpath, child[i]);
    let isfile = fs.lstatSync(childaddress).isFile();
    if (isfile) {
      // 4- copy/cut files to that organised directory
      let categories = getCategories(child[i]);
      //  console.log(child[i]);
      // console.log(child[i], "belongs to ->", categories);
      sendfiles(childaddress, destpath, categories);
    }
  }
}
/*------------------------------------checking file extention-----------------------------------*/
function getCategories(name) {
  let exc = path.extname(name);
  exc = exc.slice(1);
  for (let type in typeobj.types) {
    let currentarray = typeobj.types[type];
    //console.log(currentarray.length);
    for (let i = 0; i < currentarray.length; i++) {
      if (exc == currentarray[i]) {
        // console.log(exc);
        return type;
      }
    }
  }
  return "others";
}
/*-----------------------------------Logic of copy and cut-----------------------------------------*/
function sendfiles(srcfile, dest, categories) {
  let categoriepath = path.join(dest, categories);
  if (fs.existsSync(categoriepath) == false) {
    fs.mkdirSync(categoriepath);
  }
  let filename = path.basename(srcfile);
  let destfilepath = path.join(categoriepath, filename);
  fs.copyFileSync(srcfile, destfilepath);
  console.log(filename, "copied to ->", categoriepath);
  fs.unlinkSync(srcfile);
}
module.exports = { organisekey: organiseFn };
// This is how we export in node js
