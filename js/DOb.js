const drag_zone = document.querySelector(".drag-obj-wrapper");
const drag_obj = document.querySelector(".js-drag-obj");

drag_obj.ondragstart = function () {
  return false;
};

drag_obj.onmousedown = function (event) {
  // (1) отследить нажатие

  // (2) подготовить к перемещению:
  // разместить поверх остального содержимого и в абсолютных координатах
  drag_obj.style.position = "absolute";
  drag_obj.style.zIndex = 1000;
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.drag_zone.append(drag_obj);
  // и установим абсолютно спозиционированный мяч под курсор

  moveAt(event.pageX, event.pageY);

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(pageX, pageY) {
    drag_obj.style.left = pageX - drag_obj.offsetWidth / 2 + "px";
    drag_obj.style.top = pageY - drag_obj.offsetHeight / 2 + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) перемещать по экрану
  document.addEventListener("mousemove", onMouseMove);

  // (4) положить мяч, удалить более ненужные обработчики событий
  drag_obj.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    drag_obj.onmouseup = null;
  };
};
