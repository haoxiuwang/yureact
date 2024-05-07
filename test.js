let outerVar = 0;
setInterval(()=>{outerVar = Math.random()},1000)
function useState() {

  return function () {
    console.log(outerVar);
  }
}
