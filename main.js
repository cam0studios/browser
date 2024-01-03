alert("run");
if(!Object.hasOwn(window,executed)) {
  var script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/eruda";document.body.append(script);script.onload=function(){eruda.init();console.log("Script Loaded: Thank you for using SparXSS!")}
  window.executed = true;
  let btn = document.createElement("button");
  btn.innerHTML = "Open Google";
  btn.addEventListener("click",() => {
    window.open("https://google.com");
  });
  btn.style.position = "fixed";
  btn.style.zIndex = "10000";
  btn.style.color = "#000000";
  btn.style.backgroundColor = "#ffffff";
  btn.style.top = 0;
  btn.style.left = 0;
  document.body.appendChild(btn);
}
document.addEventListener("keydown",() => {
  delete window.executed;
});
