const TABLE_ID = 'calendar';
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DISP_ROW = 5;

let tableRef = document.getElementById(TABLE_ID);
let thead = tableRef.createTHead();
/* test: month index starts zero
let today = new Date(2019, 7, 31);
*/
let today = new Date();
let year = today.getFullYear();
let thisMonth = today.getMonth();
let first = new Date(year, thisMonth, 1);
document.querySelector('#prev').addEventListener('click', generateFirstDate);
document.querySelector('#next').addEventListener('click', generateFirstDate);
let endMonth = new Date(year, thisMonth + 1, 0);

generateThisMonthHead();
generateThead();
generateCalendar(first.getDate(), first.getDay(), endMonth.getDate(), DISP_ROW);
console.log(first);

function generateThisMonthHead() {
	// generate this month
	let calendarPara = document.querySelector('#this-month');
	calendarPara.appendChild(document.createTextNode(MONTH[thisMonth]));
}

function generateThead() {
	// generate thead row
	for(let i = 0; i < WEEK.length; i++) {
		let th = document.createElement('th');
		thead.appendChild(th);
		setHolidayAttr(th, i);
		let thDay =  document.createTextNode(WEEK[i]);
		th.appendChild(thDay);
	}
}

function generateFirstDate() {
	// WIP: implement behavior of previous/next month button & generate data 
	if(event.target.id == 'prev') {
		thisMonth--;
		first = new Date(year, thisMonth, 1);
	}
	if(event.target.id == 'next') {
		thisMonth++;
		first = new Date(year, thisMonth, 1);
	}
	endMonth = new Date(year, thisMonth + 1, 0);
	console.log(year, thisMonth);
	console.log(first);
	//generateCalendar(first.getDate(), first.getDay(), endMonth.getDate(), DISP_ROW);
}

// generate date of this month
function generateCalendar(date, day, endDate, dispRow) {
	for(let rowIndex = 0; rowIndex < dispRow; rowIndex++) {
		let row = tableRef.insertRow(rowIndex);
		for(let colIndex = 0; colIndex < 7; colIndex++) {
			let cell = row.insertCell(colIndex);
			if(date > endDate) break;
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
