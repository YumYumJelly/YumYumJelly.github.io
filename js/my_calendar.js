const TABLE_ID = 'calendar';
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DISP_ROW = 5;

let tableRef = document.getElementById(TABLE_ID);
let thead = tableRef.createTHead();
let today = new Date();
let year = today.getFullYear();
let thisMonth = today.getMonth();
let first = new Date(year, thisMonth, 1);
let endMonth = new Date(year, thisMonth + 1, 0);

generateYearMonthHead();
generateCalendarHead();
generateCalendar(first.getDate(), first.getDay(), endMonth.getDate(), DISP_ROW);
document.querySelector('#prev').addEventListener('click', changeMonth);
document.querySelector('#next').addEventListener('click', changeMonth);

// generate this month (h1 node)
function generateYearMonthHead() {
	let calendarPara = document.querySelector('#this-month');
	// adjust MONTH index
	let index = (thisMonth % MONTH.length >= 0) ? thisMonth % MONTH.length : MONTH.length + thisMonth % MONTH.length;
	calendarPara.appendChild(document.createTextNode(first.getFullYear() + ' ' + MONTH[index]));
}

// generate thead row
function generateCalendarHead() {
	for(let i = 0; i < WEEK.length; i++) {
		let th = document.createElement('th');
		thead.appendChild(th);
		setHolidayAttr(th, i);
		let thDay =  document.createTextNode(WEEK[i]);
		th.appendChild(thDay);
	}
}

function changeMonth() {
	if(event.target.id == 'prev') {
		thisMonth--;
		first = new Date(year, thisMonth, 1);
	}
	if(event.target.id == 'next') {
		thisMonth++;
		first = new Date(year, thisMonth, 1);
	}
	endMonth = new Date(year, thisMonth + 1, 0);
	removeTbody();
	generateCalendar(first.getDate(), first.getDay(), endMonth.getDate(), DISP_ROW);
	removeThisMonth();
	generateYearMonthHead();
}

// if calendar exists already, remove old calendar (remove table rows)
function removeThisMonth() {
	let thisMonth = document.querySelector('#this-month');
	thisMonth.removeChild(thisMonth.firstChild);
}

// if calendar exists already, remove old calendar (remove table rows)
function removeTbody() {
	let tbody = tableRef.querySelector('tbody');
	while(tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}
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
	let now =  new Date();
	let nYear = now.getFullYear();
	let nMonth = now.getMonth();
	if(year == nYear && thisMonth == nMonth && date == today.getDate()) {
		cellRef.setAttribute('id', 'today');
	}
}
