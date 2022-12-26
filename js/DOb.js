const imgParts = [
  {
    x: 10,
    y: 10,
    angle: 0,
    imgSrc: "assets/img/drag_obj/Chimera_goat.png",
    alt: "Химера - изображение головы козы",
  },
  {
    x: 50,
    y: 50,
    angle: 20,
    imgSrc: "assets/img/drag_obj/Chimera_lion.png",
    alt: "Химера - изображение тела льва",
  },
];

const region = document.querySelector(".region");

function generatePartElement(partInfo) {
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  imgContainer.classList.add("chimera_goat", "chimera__part");
  // imgContainer.style.transform = `rotate(${partInfo.angle}deg)`;
  img.src = partInfo.imgSrc;
  img.alt = partInfo.alt;
  imgContainer.appendChild(img);
  imgContainer.addEventListener("pointerup", handleMouseDown);
  return imgContainer;
}

function init() {
  imgParts.forEach((imgPart) => {
    region.appendChild(generatePartElement(imgPart));
  });
}

function handleMouseDown(e) {
  console.log(e);
  const element = e.target;
  const x = element.x;
  const y = element.y;

  function handlePointerMove(e) {
    const mouseX = e.x;
    const mouseY = e.y;

    element.style.left = "";
    elem.style.top = event.pageY - offsetY + "px";
    //     elem.style.left = event.pageX - offsetX + "px";
  }

  document.addEventListener("pointermove", handlePointerMove);

  document.removeEventListener("pointerdown");
}

init();
