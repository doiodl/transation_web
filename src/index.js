import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';
import App from './App';
// import registerServiceWorker from './sw';

// Init VK  Mini App
connect.send('VKWebAppInit');
connect.send("VKWebAppResizeWindow", {"width": 800, "height": 1000});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();
// const request = require('request-promise');
// var fs = require('fs')

// let user = {
// 	type: 'js_test',
// 	object: {
// 		user_id: '11'
// 	}
// };

// fetch('https://doiodl.pythonanywhere.com/', {
// 	method: 'POST',
// 	mode: 'no-cors',
// 	headers: {
// 	  'Content-Type': 'application/json;charset=utf-8'
// 	},
// 	body: JSON.stringify(user)
// })
// 	.then(response => console.log(response))


ReactDOM.render(<App />, document.getElementById('root'));
