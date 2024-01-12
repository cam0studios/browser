if(typeof executed === 'undefined') {
  (function(){
    var script=document.createElement("script");
    script.src="https://cdn.jsdelivr.net/npm/eruda";
    document.body.append(script);
    script.onload=function(){
      eruda.init();
      console.log("Script Loaded: Thank you for using SparXSS!");
    }
  })();
  var bookmarks = ["google.com","discord.com"];
  executed = true;
  let toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.innerHTML = "Open";
  toggleBtn.addEventListener("click",() => {
    window.toggleOpen();
  });
  toggleBtn.style.position = "fixed";
  toggleBtn.style.zIndex = "10000";
  toggleBtn.style.color = "#ffffff";
  toggleBtn.style.backgroundColor = "#444444";
  toggleBtn.style.left = localStorage.getItem("toggleX")||0;
  if(toggleBtn.style.left>innerWidth-25) toggleBtn.style.left=innerwidth-25;
  toggleBtn.style.top = localStorage.getItem("toggleY")||0;
  if(toggleBtn.style.top>innerHeight-10) toggleBtn.style.top=innerHeight-10;
  toggleBtn.style.width = "50px";
  toggleBtn.style.height = "20px";
  toggleBtn.addEventListener("mousedown", (e) => {
    console.log("down");
    window.mouseDownOnToggle = true;
  });
  document.addEventListener("mousemove",(e) => {
    if(window.mouseDownOnToggle) {
      window.dragToggle = true;
      let toggle = document.getElementById("toggleBtn");
      let x = e.clientX;
      let y = e.clientY;
      if(x<25) x=25;
      if(x>innerWidth-25) x = innerWidth-25;
      if(y<10) y=10;
      if(y>innerWidth-10) y = innerWidth-10;
      toggle.style.left = (x-25)+"px";
      toggle.style.top = (y-10)+"px";
    }
  });
  toggleBtn.addEventListener("mouseup",(e) => {
    console.log("up");
    if(window.dragToggle) {
      localStorage.setItem("toggleX",document.getElementById("toggleBtn").style.left);
      localStorage.setItem("toggleY",document.getElementById("toggleBtn").style.top);
      window.toggleOpen();
      window.dragToggle = false;
    }
    window.mouseDownOnToggle = false;
  });
  document.body.appendChild(toggleBtn);
}

function toggleOpen () {
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
    bg.style.width = "100%";
    bg.style.height = "100%";
    bg.style.backgroundColor = "#333333"
    document.body.appendChild(bg);
    let bookBar = document.createElement("div");
    bookBar.innerHTML = "Bookmarks:<br>";
    bookmarks.forEach((e,i) => {
      bookBar.innerHTML += getBookmarkHTML(e,i);
    });
    bookBar.style.position = "fixed";
    bookBar.style.left = "5px";
    bookBar.style.top = "45px";
    bookBar.style.color = "#ffffff";
    bookBar.id = "bookBar";
    document.getElementById("bg").appendChild(bookBar);
    let addMark = document.createElement("button");
    addMark.addEventListener("click",() => {addBookmark(prompt('url'))});
    addMark.id = "addMark";
    addMark.innerHTML = "+";
    addMark.style.position = "fixed";
    addMark.style.left = "10px";
    addMark.style.backgroundColor = "#228800";
    addMark.style.color = "#ffffff";
    document.getElementById("bg").appendChild(addMark);
    let tempOpen = document.createElement("button");
    tempOpen.addEventListener("click",() => {window.open("https://"+prompt("url"))});
    tempOpen.id = "tempOpen";
    tempOpen.innerHTML = "Open URL";
    tempOpen.style.position = "fixed";
    tempOpen.style.left = "10px";
    tempOpen.style.backgroundColor = "#228800";
    tempOpen.style.color = "#ffffff";
    document.getElementById("bg").appendChild(tempOpen);
    updateHeight();
    let save = document.createElement("button");
    save.style.backgroundColor = "#228800";
    save.style.color = "#ffffff";
    save.style.position = "fixed";
    save.style.left = "10px";
    save.style.top = "5px";
    save.innerHTML = "Save Session";
    save.addEventListener("click",() => {
      navigator.clipboard.writeText(btoa(bookmarks.join("|")));
    });
    document.getElementById("bg").appendChild(save);
    let load = document.createElement("button");
    load.style.backgroundColor = "#882200";
    load.style.color = "#ffffff";
    load.style.position = "fixed";
    load.style.left = "10px";
    load.style.top = "25px";
    load.innerHTML = "Load Session";
    load.addEventListener("click",() => {
      bookmarks = atob(prompt("session?")).split("|");
      let bookBar = document.getElementById("bookBar");
      bookBar.innerHTML = "Bookmarks:<br>";
      bookmarks.forEach((e,i) => {
        bookBar.innerHTML += getBookmarkHTML(e,i);
      });
      updateHeight();
    });
    document.getElementById("bg").appendChild(load);
  } else {
    document.getElementById("bg").remove();
    document.getElementById("toggleBtn").innerHTML = "Open";
  }
}
function getBookmarkHTML(url,i) {
  return `<div id="bookmark${i}"><img src="https://${url}/favicon.ico" style="height:15px">
  <button style="color:#ffffff;background-color:#444444;height:25px" onclick=window.open('https://${url}')>${url}</button>
  <button style="color:#ffffff;background-color:#882200" onclick="removeBookmark(${i})">x</button>
  <br></div>`;
}
function addBookmark(url) {
  bookmarks.push(url);
  document.querySelector("#bookBar").innerHTML += getBookmarkHTML(url,bookmarks.length-1);
  updateHeight();
}
function removeBookmark(i) {
  bookmarks.splice(i,1);
  document.querySelector("#bookmark"+i).remove();
  updateHeight();
}
function updateHeight() {
  document.querySelector("#addMark").style.top = (70+bookmarks.length*25)+"px";
  document.querySelector("#tempOpen").style.top = (95+bookmarks.length*25)+"px";
}
