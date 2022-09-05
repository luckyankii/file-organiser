#!/usr/bin/env node
// making global
let inputArr = process.argv.slice(2);
let helpobj = require("./commands/help");
let organiseobj = require("./commands/organise");
let treeobj = require("./commands/tree");
//console.log(inputArr);
/*---------------------------------Here we have taken input -----------------------------------*/
let command = inputArr[0];
switch (command) {
  case "tree":
    treeobj.treekey(inputArr[1]);
    break;
  case "organise":
    organiseobj.organisekey(inputArr[1]);
    break;
  case "help":
    helpobj.helpkey();
    break;
  default:
    console.log("Please Enter a valid command ");
    break;
}

/*------------------How to make any thing global---------------------------------------------- */
/*If you want any thing to be global then search for --
shebang syntax for whatever language 
eg -- shebang syntax for node stackoverflow (just follow the instruction )
eg- #!/usr/bin/env node*/
