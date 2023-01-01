const workspace = document.querySelector(".puzzle-workspace");
const testBtn = document.getElementsByClassName("js-btn-test");
// информация об изображениях
//todo добавить 4ый элемент и изменить изображения
const imgParts = [
  {
    top: 60,
    left: 350,
    angle: 90,
    imgSrc: "assets/img/drag_obj/Chimera_goat.png",
    alt: "Химера - изображение головы козы",
  },
  {
    top: 10,
    left: 850,
    angle: 0,
    imgSrc: "assets/img/drag_obj/Chimera_lion.png",
    alt: "Химера - изображение тела льва",
  },
  {
    top: 150,
    left: 50,
    angle: 0,
    imgSrc: "assets/img/drag_obj/Chimera_snake.png",
    alt: "Химера - изображение хвоста змеи",
  },
];
// добавление элементов на страницу
init();
function init() {
  imgParts.forEach((imgPart) => {
    workspace.appendChild(generatePartElement(imgPart));
  });
}
function generatePartElement(partInfo) {
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  imgContainer.classList.add("chimera__part");
  imgContainer.style.transform = `rotate(${partInfo.angle}deg)`;
  imgContainer.style.top = partInfo.top + "px";
  imgContainer.style.left = partInfo.left + "px";

  img.src = partInfo.imgSrc;
  img.alt = partInfo.alt;
  img.ondragstart = () => false;
  imgContainer.appendChild(img);
  imgContainer.addEventListener("pointerdown", (e) => {
    handleImgPartCaptured(e, workspace);
  });
  return imgContainer;
}
const parts = document.querySelectorAll(".chimera__part");

const handleImgPartCaptured = (e, workspace = document.body) => {
  const element = e.currentTarget;
  if (element === null) return;
  element.classList.add("chimera__part_state_captured");

  let clickLeftOffset,
    clickTopOffset = 0;
  const workspaceHeight = workspace.getBoundingClientRect().height;
  const workspaceWidth = workspace.getBoundingClientRect().width;

  // координаты клика относительно верхнего левого края элемента
  clickLeftOffset = e.clientX - element.getBoundingClientRect().left;
  clickTopOffset = e.clientY - element.getBoundingClientRect().top;

  document.onpointermove = elementDrag;
  document.onpointerup = handleElementReleased;

  function elementDrag(e) {
    if (element === null) return;

    // получение координат курсора относительно рабочей области
    const cursorX = e.clientX - workspace.getBoundingClientRect().left;
    const cursorY = e.clientY - workspace.getBoundingClientRect().top;

    // ограничение перетаскивания элемента рабочей областью
    const offsetFromEdge = 1; //px
    const minLeft = offsetFromEdge;
    const maxLeft =
      workspaceWidth - element.getBoundingClientRect().width - offsetFromEdge;
    const minTop = offsetFromEdge;
    const maxTop =
      workspaceHeight - element.getBoundingClientRect().height - offsetFromEdge;

    // отслеживаем сдвиг элемента
    let topShift = cursorY - clickTopOffset;
    let leftShift = cursorX - clickLeftOffset;

    if (topShift > maxTop) topShift = maxTop;
    else if (topShift < minTop) topShift = minTop;

    if (leftShift > maxLeft) leftShift = maxLeft;
    else if (leftShift < minLeft) leftShift = minLeft;

    //element.style.top = (topShift / workspaceHeight) * 100 + "%";
    element.style.top = topShift + "px";
    //element.style.left = (leftShift / workspaceWidth) * 100 + "%";
    element.style.left = leftShift + "px";
  }

  function handleElementReleased() {
    document.onpointermove = null;
    element.classList.remove("chimera__part_state_captured");
  }
};

// поворот изображения по двойному клику
parts.forEach((element) => {
  element.ondblclick = () => {
    let angle = element.style.transform;
    //регулярное выражение, для извлечения ЧИСЛОВОГО значения поворота элемента
    angle = angle.replace(/[^\d.]/g, "");
    angle = parseInt(angle);
    element.style.transform = `rotate(${angle + 90}deg)`;
    console.log(element.style.transform);
  };
});
// TODO реализовать тест сбора изображения
// TODO что делать при выигрыше
