const workspace = document.querySelector(".puzzle-workspace");
const testBtn = document.querySelector(".js-btn-test");

// информация об изображениях
const imgParts = [
  {
    top: 60,
    left: 450,
    angle: 90,
    imgSrc: "assets/img/drag_obj/goat.png",
    alt: "Химера - козья голова",
  },
  {
    top: 80,
    left: 700,
    angle: 180,
    imgSrc: "assets/img/drag_obj/lion.png",
    alt: "Химера - тело льва",
  },
  {
    top: 150,
    left: 50,
    angle: 0,
    imgSrc: "assets/img/drag_obj/legs.png",
    alt: "Химера - львиные ноги химеры",
  },
  {
    top: 150,
    left: 400,
    angle: 0,
    imgSrc: "assets/img/drag_obj/snake.png",
    alt: "Химера - хвост змеи",
  },
  {
    top: 50,
    left: 50,
    angle: 0,
    imgSrc: "assets/img/drag_obj/chimera-full.png",
    alt: "Химера",
  },
];

// добавление элементов на страницу
init();
function init() {
  for (let i = 0; i < 4; i++) {
    workspace.appendChild(generatePartElement(imgParts[i]));
  }
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

// перемещение элементов
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
  };
});

// проверка сборки изображения
testBtn.addEventListener("click", check);

function check() {
  let result = 0;

  // проверка углов поворота элементов
  parts.forEach((part) => {
    let angle = part.style.transform.replace(/[^\d.]/g, "");
    if (angle % 360 === 0 || angle === 0) {
      result++;
    }
  });

  // проверка относительного расположение элементов
  let goat = parts[0].getBoundingClientRect();
  let lion = parts[1].getBoundingClientRect();
  let legs = parts[2].getBoundingClientRect();
  let snake = parts[3].getBoundingClientRect();

  compareCoords(goat.bottom - lion.top, 5, 25);
  compareCoords(goat.left - lion.left, -10, 10);
  compareCoords(snake.bottom - legs.top, -5, 25);
  compareCoords(snake.right - legs.right, -20, 5);
  compareCoords(lion.right - legs.left, 20, 40);
  compareCoords(lion.top - legs.top, -25, 5);

  if (result === 10) {
    console.log(result);
    win();
  } else {
    console.log(result);
  }

  function compareCoords(coordDiff, min, max) {
    if (coordDiff >= min && coordDiff <= max) {
      result += 1;
      console.log(result);
    }
    return;
  }
}

// убираем элементы, добавляем целое изображение, анимируем его
function win() {
  parts.forEach((part) => {
    part.remove();
  });
  workspace.appendChild(generatePartElement(imgParts[4]));

  const chimera = document.getElementsByClassName("chimera__part");
  chimera[0].classList.add = "display";
  chimera[0].style.display = "block";
  chimera[0].style.position = "relative";
  chimera[0].animate(
    [
      { transform: "rotate(" + 180 + "deg)" },
      { transform: "scale(0.5)" },
      { transform: "rotate(" + -180 + "deg)" },
      { transform: "scale(0.7)" },
      { transform: "rotate(" + 360 + "deg)" },
      { transform: "scale(0.1)" },
      { transform: "rotate(" + 0 + "deg)" },
      { transform: "scale(1)" },
    ],
    3000
  );

  const newParagraph = document.createElement("p");

  newParagraph.innerHTML = `<b>У вас получилось ! поздравляю !<b>`; //выбор цвета фона, чётные - class1, нечётные - class2
  workspace.append(newParagraph);
}
function winAnimation() {
  animate({
    duration: 1000,
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function (progress) {
      elem.style.width = progress * 100 + "%";
    },
  });
}
