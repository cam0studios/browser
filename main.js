if(!Object.hasOwn(window,"executed")) {
  var script=document.createElement("script");
  script.src="https://cdn.jsdelivr.net/npm/eruda";
  document.body.append(script);
  script.onload = function(){
    eruda.init();
    console.log("Eruda loaded");
  }
  window.executed = true;
  let toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.innerHTML = "Open";
  toggleBtn.addEventListener("click",() => {
    if(!Object.hasOwn(window,"isOpen")) window.isOpen = false;
    window.isOpen = !window.isOpen;
    if(window.isOpen) {
      let toggleBtn = document.getElementById("toggleBtn");
      toggleBtn.innerHTML = "Close";
      let bg = document.createElement("div");
      bg.id = "bg";
      bg.style.position = "fixed";
      bg.style.zIndex = "9999";
      bg.style.top = 0;
      bg.style.left = 0;
      bg.style.width = innerWidth;
      bg.style.height = innerHeight;
      bg.style.backgroundColor = "#222222"
      document.body.appendChild(bg);
    } else {
      document.getElementById("bg").remove();
      document.getElementById("toggleBtn").innerHTML = "Open";
    }
  });
  toggleBtn.style.position = "fixed";
  toggleBtn.style.zIndex = "10000";
  toggleBtn.style.color = "#000000";
  toggleBtn.style.backgroundColor = "#ffffff";
  toggleBtn.style.top = 0;
  toggleBtn.style.left = 0;
  document.body.appendChild(toggleBtn);
}
