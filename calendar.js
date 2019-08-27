const TABLE_ID = 'calendar';
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/* test: month index starts zero
let today = new Date(2019, 7, 31);
*/
let today = new Date();
const YEAR = today.getFullYear();
const THIS_MONTH = today.getMonth();
let first = new Date(YEAR, THIS_MONTH, 1);
let prev = new Date(YEAR, THIS_MONTH + 1, 0);
let tableRef = document.getElementById(TABLE_ID);

// display this month
let calendarPara = document.querySelector('#this-month');
calendarPara.appendChild(document.createTextNode(MONTH[THIS_MONTH]));
let thead = tableRef.createTHead();
tableRef.insertRow();

// make thead row (display day)
for(let i = 0; i < WEEK.length; i++) {
	let th = document.createElement('th');
	thead.appendChild(th);
	setHolidayAttr(th, i);
	let thDay =  document.createTextNode(WEEK[i]);
	th.appendChild(thDay);
}

let date = first.getDate();
let day = first.getDay();
let prevDate = prev.getDate();
let dispRow = 5;
// display date of this month
for(let rowIndex = 0; rowIndex < dispRow; rowIndex++) {
	let row = tableRef.insertRow(rowIndex);
	for(let colIndex = 0; colIndex < 7; colIndex++) {
		let cell = row.insertCell(colIndex);
		if(date > prevDate) break;
		setHolidayAttr(cell, day);
		setTodayAttr(cell, date);
		if(colIndex == day) {
			let tNode = document.createTextNode(date);
			cell.appendChild(tNode);
			date++;
			day++;
		}
	}
	day = 0;
}

// append holiday attr
function setHolidayAttr(cellRef, dayIndex) {
	if(dayIndex == 6) cellRef.setAttribute('class', 'saturday');
	if(dayIndex == 0) cellRef.setAttribute('class', 'sunday');
}

// append today attr
function setTodayAttr(cellRef, date) {
	if(date == today.getDate()) cellRef.setAttribute('id', 'today');
}
