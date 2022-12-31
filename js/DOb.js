const imgParts = [
  {
    x: 50,
    y: 50,
    angle: 0,
    imgSrc: "assets/img/drag_obj/Chimera_goat.png",
    alt: "Химера - изображение головы козы",
  },
  {
    x: 50,
    y: 50,
    angle: 0,
    imgSrc: "assets/img/drag_obj/Chimera_lion.png",
    alt: "Химера - изображение тела льва",
  },
  {
    x: 50,
    y: 50,
    angle: 45,
    imgSrc: "assets/img/drag_obj/Chimera_snake.png",
    alt: "Химера - изображение хвоста змеи",
  },
];

const workspace = document.querySelector(".puzzle-workspace");

function generatePartElement(partInfo) {
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  imgContainer.classList.add("chimera__part");
  imgContainer.style.transform = `rotate(${partInfo.angle}deg)`;
  img.src = partInfo.imgSrc;
  img.alt = partInfo.alt;
  img.ondragstart = () => false;
  imgContainer.appendChild(img);
  imgContainer.addEventListener("pointerdown", (e) => {
    handleImgPartCaptured(e, workspace);
  });
  return imgContainer;
}

function init() {
  imgParts.forEach((imgPart) => {
    workspace.appendChild(generatePartElement(imgPart));
  });
}

const handleImgPartCaptured = (e, workspace = document.body) => {
  let clickLeftOffset,
    clickTopOffset = 0;
  const element = e.currentTarget;
  if (element === null) return;
  element.classList.add("chimera__part_state_captured");
  const workspaceHeight = workspace.getBoundingClientRect().height;
  const workspaceWidth = workspace.getBoundingClientRect().width;

  clickLeftOffset = e.clientX - element.getBoundingClientRect().left;
  clickTopOffset = e.clientY - element.getBoundingClientRect().top;

  document.onpointermove = elementDrag;
  document.onpointerup = handleElementReleased;

  function elementDrag(e) {
    if (element === null) return;
    // calculate the new cursor position:
    const cursorX = e.clientX - workspace.getBoundingClientRect().left;
    const cursorY = e.clientY - workspace.getBoundingClientRect().top;

    // set the element's new position:
    const offsetFromEdge = 1; //px
    const minLeft = offsetFromEdge;
    const maxLeft =
      workspaceWidth - element.getBoundingClientRect().width - offsetFromEdge;
    const minTop = offsetFromEdge;
    const maxTop =
      workspaceHeight - element.getBoundingClientRect().height - offsetFromEdge;

    let topShift = cursorY - clickTopOffset;
    let leftShift = cursorX - clickLeftOffset;

    if (topShift > maxTop) topShift = maxTop;
    else if (topShift < minTop) topShift = minTop;

    if (leftShift > maxLeft) leftShift = maxLeft;
    else if (leftShift < minLeft) leftShift = minLeft;

    element.style.top = (topShift / workspaceHeight) * 100 + "%";
    element.style.left = (leftShift / workspaceWidth) * 100 + "%";
  }

  function handleElementReleased() {
    document.onpointermove = null;
    element.classList.remove("chimera__part_state_captured");
  }
};

function check() {}
function rotateOnKey() {
  for (let i = 0; i < 6; i++) {
    picture.item(i).onclick = () => {
      document.onkeydown = () => {
        rotate(picture.item(i), i, elements[i].cur_angle + 45);
      };
    };
  }
}

function rotate(pic, i, x) {
  if (!elements[i].inItsArea) {
    pic.style.transform = "rotate(" + x + "deg)";
    elements[i].cur_angle = x;
  }
}

function win() {
  for (let i = 0; i < 6; i++) {
    picture.item(i).style.border = 0;
    picture
      .item(i)
      .animate(
        [
          { transform: "rotate(" + 45 + "deg)" },
          { transform: "rotate(" + -90 + "deg)" },
          { transform: "rotate(" + 90 + "deg)" },
          { transform: "rotate(" + -90 + "deg)" },
          { transform: "rotate(" + 90 + "deg)" },
          { transform: "rotate(" + -90 + "deg)" },
          { transform: "rotate(" + 45 + "deg)" },
        ],
        1500
      );
  }
}

init();
