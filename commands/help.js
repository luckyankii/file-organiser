/*---------------------------- Help command and its logic-------------------------------------- */
function helpFn() {
  console.log(`Lists of all command 
  :-> node main.js tree "directorypath"
  :-> node main.js organise "directorypath"
  :-> node main.js help `);
}
module.exports = { helpkey: helpFn };
