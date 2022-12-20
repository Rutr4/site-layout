/*
- Создайте два класса class1 и class2.
В них задайте два разных цвета фона. 
При каждом четном нажатии на кнопку выводится фраза с применением класса class1, при нечетном class2.
- Фразы выводятся в случайном, не повторяющемся порядке.
Когда фразы заканчиваются, то выводится alert с фразой "Фразы закончились".
- По нажатию на кнопку  "Перекрасить" у всех четных строк изменяется начертание на полужирное.
*/

/*
Вариант 2 - 'М'урадян. Задание 2.
- На странице  в части content создать тег  <div id='rand'>.  
- По нажатию на кнопку  "Создать"  в этом тэге создается тег <p>.
Каждый, вновь созданный элемент, имеет свой нумерованный id.
Номер фразы выводится подчеркнутым,
латинский - курсив,
русский - обычный. 
- n=0   "Nota bene"    "Заметьте хорошо!" 
- n=1  "Nulla calamitas sola"   "Беда не приходит одна"
*/

let latin = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", "Per aspera ad astra"];
let russian = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", "Через тернии к звёздам"];

let idCounter = 0;

function addParagraph() {
	if (latin.length === 0) {
		alert("Фразы закончились");
		return;
	}

	const elem = document.getElementById('rand');
	const newParagraph = document.createElement('p'); //создание <p> элемента
	newParagraph.innerHTML = `<u>n=${idCounter}</u> <i>"${latin[0]}"</i> "${russian[0]}"`;
	newParagraph.className = (latin.length % 2  == 0) ? "class1" : "class2"; //выбор цвета фона, чётные - class1, нечётные - class2
	elem.append(newParagraph);

	
	latin.splice(0, 1);
	russian.splice(0, 1);

	idCounter += 1;
}
function styleChange(){
	var evenParagraphs = document.getElementsByClassName("class1");
	for (let i = 0; i < evenParagraphs.length; i++) {
		evenParagraphs[i].style.cssText='font-weight: bold';
	}
}