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

  window.getURL = function(url,mode) {
    if(mode) {
      let u = url.split("https://").splice(0,1);
      return u.join("https://");
    } else {
      return url.split("https://")[0].trim()==""?url:"https://"+url;
    }
  }
  window.openURL = function(url) {
    if(mode) {
      window.location.href = getURL(url);
    } else {
      window.open(getURL(url));
    }
  }
  window.updateHeight = function() {
    document.querySelector("#addMark").style.top = (90+bookmarks.length*25)+"px";
    document.querySelector("#tempOpen").style.top = (115+bookmarks.length*25)+"px";
    document.querySelector("#urlIn").style.top = (90+bookmarks.length*25)+"px";
    document.querySelector("#modeBtn").style.top = (65+bookmarks.length*25)+"px";
  }
  window.getBookmarkHTML = function(url,i) {
    console.log(getURL(url,true));
    return `<div id="bookmark${i}"><img src="${getURL(url)}/favicon.ico" style="height:15px">
    <button style="color:#ffffff;background-color:#444444;height:25px" onclick="openURL('${getURL(url)}')">${getURL(url,true)}</button>
    <button style="color:#ffffff;background-color:#882200" onclick="removeBookmark(${i})">x</button>
    <br></div>`;
  }
  window.addBookmark = function(url) {
    bookmarks.push(getURL(url,true));
    document.querySelector("#bookBar").innerHTML += getBookmarkHTML(url,bookmarks.length-1);
    updateHeight();
  }
  window.removeBookmark = function(i) {
    bookmarks.splice(i,1);
    document.querySelector("#bookmark"+i).remove();
    updateHeight();
  }
  
  let toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.innerHTML = "Open";
  toggleBtn.addEventListener("click",() => {
    toggleOpen();
  });
  toggleBtn.style.position = "fixed";
  toggleBtn.style.zIndex = "10000";
  toggleBtn.style.color = "#ffffff";
  toggleBtn.style.backgroundColor = "#444444";
  toggleBtn.style.left = "70px";
  toggleBtn.style.top = "5px";
  toggleBtn.style.width = "50px";
  toggleBtn.style.height = "20px";
  toggleBtn.addEventListener("mousedown", (e) => {
    mouseDownOnToggle = true;
  });
  document.addEventListener("mousemove",(e) => {
    if(typeof mouseDownOnToggle == "undefined") {
      mouseDownOnToggle == false;
    }
    if(mouseDownOnToggle) {
      dragToggle = true;
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
    if(dragToggle) {
      toggleOpen();
      dragToggle = false;
    }
    mouseDownOnToggle = false;
  });
  document.body.appendChild(toggleBtn);
  
  function toggleOpen () {
    if(!Object.hasOwn(window,"isOpen")) isOpen = false;
    isOpen = !isOpen;
    if(isOpen) {
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
      let urlIn = document.createElement("input");
      urlIn.type = "text";
      urlIn.style.position = "fixed";
      urlIn.style.left = "10px";
      urlIn.style.width = "150px";
      urlIn.id = "urlIn";
      document.getElementById("bg").appendChild(urlIn);
      let addMark = document.createElement("button");
      addMark.addEventListener("click",() => {addBookmark(document.getElementById("urlIn").value)});
      addMark.id = "addMark";
      addMark.innerHTML = "+";
      addMark.style.position = "fixed";
      addMark.style.left = "170px";
      addMark.style.backgroundColor = "#228800";
      addMark.style.color = "#ffffff";
      document.getElementById("bg").appendChild(addMark);
      let tempOpen = document.createElement("button");
      tempOpen.addEventListener("click",() => {window.open(getURL(document.getElementById("urlIn").value))});
      tempOpen.id = "tempOpen";
      tempOpen.innerHTML = "Open URL";
      tempOpen.style.position = "fixed";
      tempOpen.style.left = "10px";
      tempOpen.style.backgroundColor = "#228800";
      tempOpen.style.color = "#ffffff";
      document.getElementById("bg").appendChild(tempOpen);
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
      let loadTxt = document.createElement("input");
      loadTxt.type = "text";
      loadTxt.id = "loadTxt";
      loadTxt.style.position = "fixed";
      loadTxt.style.left = "10px";
      loadTxt.style.top = "25px";
      loadTxt.style.width = "150px";
      document.getElementById("bg").appendChild(loadTxt);
      let load = document.createElement("button");
      load.style.backgroundColor = "#882200";
      load.style.color = "#ffffff";
      load.style.position = "fixed";
      load.style.left = "170px";
      load.style.top = "25px";
      load.innerHTML = "Load Session";
      load.addEventListener("click",() => {
        bookmarks = atob(document.getElementById("loadTxt").value).split("|");
        let bookBar = document.getElementById("bookBar");
        bookBar.innerHTML = "Bookmarks:<br>";
        bookmarks.forEach((e,i) => {
          bookBar.innerHTML += getBookmarkHTML(e,i);
        });
        updateHeight();
      });
      document.getElementById("bg").appendChild(load);
      window.mode = false;
      let modeBtn = document.createElement("button");
      modeBtn.id = "modeBtn";
      modeBtn.style.position = "fixed";
      modeBtn.style.left = "5px";
      modeBtn.innerHTML = "Temporary";
      modeBtn.addEventListener("click",() => {
        mode = !mode;
        if(mode) {
          document.getElementById("modeBtn").innerHTML = "Permanent";
        } else {
          document.getElementById("modeBtn").innerHTML = "Temporary";
        }
      });
      document.getElementById("bg").appendChild(modeBtn);
      updateHeight();
    } else {
      document.getElementById("bg").remove();
      document.getElementById("toggleBtn").innerHTML = "Open";
    }
  }
}
