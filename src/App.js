import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Home1 from './panels/Home1';
import Persik from './panels/Persik';
import F1 from './panels/reg_panels/F1';
import F2 from './panels/reg_panels/F2';
import F3 from './panels/reg_panels/F3';
import F4 from './panels/reg_panels/F4';
import { render } from 'react-dom';
import { func } from 'prop-types';

const App = () => {
	const [activePanel0, setActivePanel0] = useState('home0');
	const [activePanel1, setActivePanel1] = useState('home1');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [newUser, setNewUser] = useState('main0');
	const [popout1, setPopout1] = useState(null);
	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function getNew(user_id, user_name) {
			let user = {
				inputId: user_id,
				inputName: user_name,
				inputPhone: 71234567890,
				inputEmail : 't@mail.ru',
				inputPassword : '1234'
			};
			fetch('https://artem4ke.pythonanywhere.com/new_reg/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(user)
			})
				.then(function (response) {
					console.log(response)
					return response.json();
				}).then(function (data) {
					console.log(data)
					console.log(typeof (data['answer'].toString(10)));
					const Ac = 'main' + data['answer'].toString(10);
					console.log(Ac);
					setNewUser(Ac);
			});
		}
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			console.log(user);
			await getNew(user.id, user.first_name);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go0 = e => {
		setActivePanel0(e.currentTarget.dataset.to);
	};
	const go1 = e => {
		setActivePanel1(e.currentTarget.dataset.to);
	};
	function huk(el) {
		setPopout1(el);
	};
	const go3 = e => {
		setNewUser('main0')
	};
	return (
		<Root activeView={newUser} popout={popout}>
				<View id='main0' activePanel={activePanel0}>
					<Home id='home0' fetchedUser={fetchedUser} go={go0} />
					<Persik id='persik' go={go0} fetchedUser={fetchedUser} />
				</View>
				<View id='main1' activePanel={activePanel1} popout={popout1}>
					<Home1 id='home1' fetchedUser={fetchedUser} go={go1} />
					<F1 id='f1' go={go1} fetchedUser={fetchedUser} />
					<F2 id='f2' go={go1} fetchedUser={fetchedUser} />
					<F3 id='f3' go={go1} fetchedUser={fetchedUser} />
					<F4 id='f4' go={go1} fetchedUser={fetchedUser} chang={huk} go_home={go3}/>
				</View>
			</Root>
		);
}

export default App;