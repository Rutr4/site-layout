/*
- Создайте два класса class1 и class2. В них задайте два разных цвета фона.  При каждом четном нажатии на кнопку выводится фраза с применением класса class1, при нечетном class2.
- Фразы выводятся в случайном, не повторяющемся порядке. Когда фразы заканчиваются, то выводится alert с фразой "Фразы закончились".
- По нажатию на кнопку  "Перекрасить" у всех четных строк изменяется начертание на полужирное.
*/

/*
Вариант 2 - 'М'урадян. Задание 2.
- На странице  в части content создать тег  <div id='rand'>.  
- По нажатию на кнопку  "Создать"  в этом тэге создается тег <p>. Каждый, вновь созданный элемент, имеет свой нумерованный id. Номер фразы выводится подчеркнутым, латинский - курсив, русский - обычный. 
- n=0   "Nota bene"    "Заметьте хорошо!" 
- n=1  "Nulla calamitas sola"   "Беда не приходит одна"
*/

let latin = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", "Per aspera ad astra"];
let russian = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", "Через тернии к звёздам"];

let class1
let class2





/*


var quotes = [
	["Consuetudo est altera natura", "Привычка - вторая натура"],
	["Nota bene", "Заметьте хорошо!"],
	["Nulla calamitas sola", "Беда не приходит одна"],
	["Per aspera ad astra", "Через тернии к звёздам"],
	["Si vir dixit, fecit", "Пацан сказал - пацан сделал"],
	["Memento frater unum phrase: erunt omnia autem non statim", "Запомни, брат, одну простую фразу: Всё будет, но не сразу"]
];

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

quotes.sort(compareRandom);
var count = 0;
function addRow(id){
	if (count==6)
		alert("Фразы закончились!")
    var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")
    td1.appendChild(document.createTextNode(quotes[count][0]))
    var td2 = document.createElement("TD")
    td2.appendChild (document.createTextNode(quotes[count][1]))
    row.appendChild(td1);
    row.appendChild(td2);
    tbody.appendChild(row);
	count+=1;
  }

function styleChange(){
	var tables = document.getElementsByTagName("table");
	for ( var t = 0; tables[t]; t++ ) {
		var rows = tables[t].getElementsByTagName("tr");
		for ( var i = 2; rows[i]; i+=2 ) {
			rows[i].style.cssText='font-weight: bold'
    }
  }
}

*/