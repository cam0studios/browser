if(!Object.hasOwn(window.executed)) {
  window.executed = true;
  let btn = document.createElement("button");
  btn.innerHTML = "Open Google";
  btn.addEventListener("click",() => {
    window.open("https://google.com");
  });
  document.body.appendChild(btn);
}
