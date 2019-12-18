import React from 'react';
import PropTypes from 'prop-types';
import connect from '@vkontakte/vk-connect';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
import $ from 'jquery';
import persik from '../img/persik.png';
import 'youtube-video-js';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import './Persik.css';
import Chat from './Chat'

const osName = platform();

const Persik = props => {
	connect.send("VKWebAppResizeWindow", { "width": 800, "height": 900 });
	console.log(props);
	if (!('id' in props.fetchedUser))
		props.fetchedUser.id = '82815081' 
	function but(e) {
		e.preventDefault();
    	console.log('По ссылке кликнули.');
	}
	function send_req() {
		let user = {
			type: 'js_test',
			object: {
				user_id: props.fetchedUser.id
			}
		};
		fetch('https://doiodl.pythonanywhere.com/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
			.then(function (response) {
				console.log(response)
				return response.json();
		  }).then(function(data) {
			  console.log(data);
		  });
	}
	send_req()
	setInterval(function(){ 
			send_req() 
	}, 150000000);

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}
			>
				Трансляция
		</PanelHeader>
			<Group>
				<Div>
					<YouTubePlayer
					width='device-width'
					url='https://www.youtube.com/watch?v=Jk0xMsXME1U'
					controls
					/>
				</Div>
				<Chat name='chat_main' fetchedUser={props.fetchedUser}></Chat>
				<Div>
					<Button size="xl" level="2" onClick={props.go} data-to="home">
						Завершить Трансляцию
					</Button>
				</Div>
			</Group>
		</Panel>);	
}

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};


export default Persik;
