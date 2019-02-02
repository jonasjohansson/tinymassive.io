const now = new Date();
const options = { timeZone: 'Europe/Stockholm', weekday: 'short', month: 'numeric', day: 'numeric' };
const days = ['thursday', 'friday', 'saturday', 'sunday'];
const categories = ['video', 'interactive', 'live'];

window.addEventListener('load', () => {
	parseGSX('12YrlTik1EvQjONrpaSNdsgthdfsd4GJmZI4V-mAsk8c');
});

function display(data) {
	const $schedule = document.querySelector('#schedule');
	const $articles = document.querySelectorAll('article');
	const $days = [];

	// for (let article of $schedule.querySelectorAll('article')) $days.push(article);

	// create filter
	var $filter = document.querySelector('#filter');
	var $css = document.createElement('style');
	$css.type = 'text/css';
	document.body.appendChild($css);

	for (let entry of days.concat(categories)) {
	// for (let entry of categories) {
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
		$css.innerHTML += `#schedule:not(.show-${entry}) .${entry} { display:none; }`;
		// $css.innerHTML += `#schedule:not(.show-${entry}) .${entry} { opacity:0.5; }`;
	}

	for (let row of data) {
		const data = {
			name: row['artistname'] || row['name'],
			title: row['title'],
			category: row['category'],
			tag: row['tag'],
			link: row['link'],
			email: row['email'],
			date: row['date'],
			time: row['time'],
			bio: row['bio'],
			description: row['description']
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

		let $toggle = document.createElement('button');
		let $entry = document.createElement('div');
		let $time = document.createElement('span');
		let $title = document.createElement('h5');
		let $description = document.createElement('p');
		let $bio = document.createElement('p');
		// let $days = document.createElement('div');

		// if (data.date == 'all') {
		// 	for (let day of days) {
		// 		$day = document.createElement('span');
		// 		$day.classList.add('day');
		// 		$day.innerHTML = day.substr(0, 2);
		// 		$days.appendChild($day);
		// 	}
		// } else {
		// 	$day = document.createElement('span');
		// 	$day.innerHTML = data.date;
		// 	$days.appendChild($day);
		// }

		$entry.className = `${data.category} ${data.tag} ${data.date}`;

		$toggle.classList.add('toggle');
		$entry.classList.add('entry');
		$title.classList.add('title');
		$time.classList.add('time');
		$description.classList.add('description');
		$bio.classList.add('bio');

		$entry.appendChild($toggle);
		// $entry.appendChild($time);
		$entry.appendChild($title);
		$entry.appendChild($description);
		$entry.appendChild($bio);

		$toggle.innerHTML = '+';
		$toggle.addEventListener('click',()=>{
			// for (let show of document.querySelectorAll('.show-info')) show.classList.remove('show-info');
			$entry.classList.toggle('show-info');
		});

		$time.innerHTML = `${data.time}`;
		$description.innerHTML = `${data.description}`;
		$bio.innerHTML = `${data.bio}`;
		var name = data.link ? `<a href="${data.link}">${data.name}</a>` : data.name;

		$title.innerHTML = `${data.time} ${data.title}. ${name}`;

		switch (data.date) {
			case 'all':
				// $time.parentNode.removeChild($time);
				$articles[0].appendChild($entry);
				break;
			case 'thursday':
				$articles[1].appendChild($entry);
				break;
			case 'friday':
				$articles[2].appendChild($entry);
				break;
			case 'saturday':
				$articles[3].appendChild($entry);
				break;
			case 'sunday':
				$articles[4].appendChild($entry);
				break;
		}

		// $schedule.appendChild($entry);
	}

	// for (let $day of $days) $schedule.appendChild($day);

	document.documentElement.classList.remove('loading');
}

function createFilter() {
	return $filter;
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
