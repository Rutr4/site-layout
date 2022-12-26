let elems = document.querySelectorAll(".element");
let region = document.querySelector(".region");

let offsetX;
let offsetY;

elems.forEach(function (elem, index) {
  elem.addEventListener("dragstart", function (event) {
    console.log(event.offsetX, event.offsetY);

    elem.style.position = "absolute";
    offsetX = event.offsetX;
    offsetY = event.offsetY;

    event.dataTransfer.setData("img", index);
  });

  elem.addEventListener("dragend", function (event) {
    console.log(event.pageX, event.pageY);

    elem.style.top = event.pageY - offsetY + "px";
    elem.style.left = event.pageX - offsetX + "px";
  });
});

region.addEventListener("dragover", function (event) {
  event.preventDefault();
});

region.addEventListener("drop", function (event) {
  this.appendChild(elems[event.dataTransfer.getData("img")]);
});
