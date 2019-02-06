const now = new Date();
const options = { timeZone: 'Atlantic/Reykjavik', weekday: 'long'};
const days = ['thursday', 'friday', 'saturday', 'sunday'];

window.addEventListener('load', () => {
	parseGSX('12YrlTik1EvQjONrpaSNdsgthdfsd4GJmZI4V-mAsk8c');
});

function display(data) {
	const $schedule = document.querySelector('#schedule');
	const $articles = document.querySelectorAll('article');

	const nowPlaying = (document.body.id == 'now-playing') ? true : false;

	data.sort(compare);

	var thursday = data.filter(function (el) {
	  return el.day == 'thursday';
	});

	let day = now.getDay();
	let hour = 20 || now.getHours();
	let minutes = 29 || now.getMinutes();
	let dayName = now.toLocaleDateString('se-SE', options);
	dayName = 'Thursday';

	console.log(`${hour}:${minutes}`);   

	// it's during the event
	if (day >= 3 && day <= 6){
		if (hour >= 19 && hour <= 23){
			let current = data.filter(el => {
				return el.day == dayName.toLowerCase() &&
					el.time >= `${hour}:00` &&
					el.time <= `${hour}:${minutes}`
			});
			current = (current.length > 0) ? current[current.length-1] : current;
			console.log(current);
		}
	}
	switch (now.getDay()){
		case 0:
		break;
		case 1:
		break;
		case 2:
		break;
		case 3:
		break;
		case 4:
		break;
		case 5:
		break;
		case 6:
		break;
	}

	data.sort(compare);

	for (let row of data) {
		const data = {
			name: row['artistname'] || row['name'],
			title: row['title'],
			category: row['category'],
			tag: row['tag'],
			description: row['description'],
			instructions: row['instructions'],
			bio: row['bio'],
			credits: row['credits'],
			link: row['link'],
			email: row['email'],
			day: row['day'],
			time: row['time'],
		};

		let $entry = createEl('div','entry');
		$entry.className = `entry ${data.category} ${data.tag} ${data.day}`;

		if (!nowPlaying){
			let $toggle = createEl('button','toggle',$entry);
			$toggle.innerHTML = '+';
			$toggle.addEventListener('click',()=>{
				$entry.classList.toggle('show-info');
			});
		}

		let $title = createEl('h5','title',$entry);
		
		var $description = createEl('p','description',$entry);
		$description.innerHTML = data.description;
	
		// if (nowPlaying){
		// 	let $instructions = createEl('p','instructions',$entry);
		// 	$instructions.innerHTML = `<h3>How to play</h3>${data.instructions}`;
		// }

		if (!nowPlaying){
			let $bio = createEl('p','bio',$entry);
			$bio.innerHTML = format(data.bio);
			let $credits = createEl('p','credits',$entry);
			$credits.innerHTML = format(data.credits);
		}

		var name = data.link ? `<a href="${data.link}">${data.name}</a>` : data.name;

		if (nowPlaying){
			$title.innerHTML = `${data.title} <span class="name">${name}</span>`;
		} else {
			$title.innerHTML = `${data.time} ${data.title} <span class="name">${name}</span>`;
		}
		
		switch (data.day) {
			case 'all':
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
	}
}


function compare(a,b) {
  if (a.time < b.time)
    return -1;
  if (a.time > b.time)
    return 1;
  return 0;
}

function createEl(type,name,parent = false){
	let el = document.createElement(type);
	el.classList.add(name);
	if (parent !== false) parent.appendChild(el);
	return el;
}

function parseGSX(spreadsheetID) {
	var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/1/public/values?alt=json';
	var ajax = $.ajax(url);
	$.when(ajax).then(parseRawData);
}

function format(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlRegex, '<a href="$1">$1</a>');
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
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
