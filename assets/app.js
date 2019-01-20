const now = new Date();
const options = { timeZone: 'Europe/Stockholm', weekday: 'short', month: 'numeric', day: 'numeric' };

window.addEventListener('load', () => {
	parseGSX('12YrlTik1EvQjONrpaSNdsgthdfsd4GJmZI4V-mAsk8c');
});

function display(data) {
	var $schedule = document.querySelector('#schedule');
	// const $days = [];

	// for (let day of ["thursday", "friday", "saturday", "sunday"]) {
	// 	$article = document.createElement("article");
	// 	$h3 = document.createElement("h3");
	// 	$h3.innerHTML = day;
	// 	$article.appendChild($h3);
	// 	$days.push($article);
	// }

	var $filter = document.createElement('div');
	$filter.classList.add('filter');

	const days = ['thursday', 'friday', 'saturday', 'sunday'];
	const categories = ['video', 'interactive', 'live'];
	var $css = document.createElement('style');
	$css.type = 'text/css';
	document.body.appendChild($css);

	// for (let entry of days.concat(categories)) {
	for (let entry of categories) {
		$inputGroup = document.createElement('div');
		$label = document.createElement('label');
		$label.setAttribute('for', entry);
		$label.innerHTML = entry;
		$input = document.createElement('input');
		$input.type = 'checkbox';
		$input.id = entry;
		$input.value = entry;
		$input.checked = true;
		$inputGroup.appendChild($input);
		$inputGroup.appendChild($label);
		$filter.appendChild($inputGroup);
		$input.addEventListener('change', e => {
			$schedule.classList.toggle(`show-${entry}`, e.currentTarget.checked);
		});
		$schedule.classList.add(`show-${entry}`);
		$css.innerHTML += `#schedule:not(.show-${entry}) .${entry} { opacity:0.5; }`;
	}

	$schedule.appendChild($filter);

	for (let row of data) {
		const data = {
			name: row['name'],
			title: row['title'],
			category: row['category'],
			tag: row['tag'],
			link: row['link'],
			email: row['email'],
			date: row['date'],
			time: row['time']
		};

		// if (data.date == "all") {
		// 	for (let $day of $days) {
		// 		let $entry = document.createElement("div");
		// 		let $date = document.createElement("span");
		// 		let $title = document.createElement("span");

		// 		$entry.appendChild($date);
		// 		$entry.appendChild($title);

		// 		$date.innerHTML = `${data.time}`;
		// 		$title.innerHTML = `${data.title} by ${data.name}`;
		// 		$day.appendChild($entry);
		// 	}
		// }

		let $entry = document.createElement('div');
		let $date = document.createElement('span');
		let $title = document.createElement('div');
		let $days = document.createElement('div');

		if (data.date == 'all') {
			for (let day of days) {
				$day = document.createElement('span');
				$day.classList.add('day');
				$day.innerHTML = day.substr(0, 2);
				$days.appendChild($day);
			}
		} else {
			$day = document.createElement('span');
			$day.innerHTML = data.date;
			$days.appendChild($day);
		}

		$entry.className = `${data.category} ${data.tag} ${data.date}`;

		$entry.classList.add('entry');
		$title.classList.add('title');
		$days.classList.add('days');

		$entry.appendChild($title);
		// $entry.appendChild($date);
		$entry.appendChild($days);

		// $date.innerHTML = `${data.time}`;
		var name = data.link ? `<a href="${data.link}">${data.name}</a>` : data.name;

		$title.innerHTML = `${data.title}. ${name}`;
		$schedule.appendChild($entry);
	}

	// for (let $day of $days) $schedule.appendChild($day);

	document.documentElement.classList.remove('loading');
	for (let a of document.querySelectorAll('a')) a.target = '_blank';
}

function parseGSX(spreadsheetID) {
	var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/1/public/values?alt=json';
	var ajax = $.ajax(url);
	$.when(ajax).then(parseRawData);
}

function parseRawData(res) {
	var data = [];
	res.feed.entry.forEach(function(entry) {
		var parsedObject = {};
		for (var key in entry) {
			if (key.substring(0, 4) === 'gsx$') {
				parsedObject[key.slice(4)] = entry[key]['$t'];
			}
		}
		data.push(parsedObject);
	});
	display(data);
}
