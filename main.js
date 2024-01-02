if(!Object.hasOwn(window.executed)) {
  var script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/eruda";document.body.append(script);script.onload=function(){eruda.init();console.log("Script Loaded: Thank you for using SparXSS!")}
  window.executed = true;
  let btn = document.createElement("button");
  btn.innerHTML = "Open Google";
  btn.addEventListener("click",() => {
    window.open("https://google.com");
  });
  btn.style = "z-index:1000; position:absolute;";
  document.body.appendChild(btn);
}
