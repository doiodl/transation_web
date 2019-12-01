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
import $ from 'jquery';
import persik from '../img/persik.png';
import 'youtube-video-js';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import './Persik.css';

const osName = platform();

const Persik = props => {
	connect.send("VKWebAppResizeWindow", { "width": 800, "height": 900 });
	console.log(props);
	function send_req() {
		let user = {
			type: 'js_test',
			object: {
				user_id: props.fetchedUser.id
			}
		};
		fetch('https://doiodl.pythonanywhere.com/', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
			.then(function (response) {
				console.log(response)
				return response.json();
		  }).then(function(data) {
			console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
		  });
	}
	send_req()
	setInterval(function(){ 
			send_req() 
	}, 150000000);
	// lWidth = screen.width;
	// myWebView.getSettings().setUserAgentString("Desktop");
	navigator.__defineGetter__('userAgent', function () {
		return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
	});
	console.log(navigator.userAgent);
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
					<Div className='iframe-container'>
						<iframe src="https://www.youtube.com/live_chat?v=Jk0xMsXME1U&embed_domain=doiodl.github.io"></iframe>
					</Div>
					{/* <YouTubePlayer
					width='device-width'
					url='https://www.youtube.com/live_chat?v=Jk0xMsXME1U&embed_domain=doiodl.github.io'
					controls
					/> */}
					{/* <iframe allowfullscreen="" frameborder="0" height="400" src="https://www.youtube.com/live_chat?v=Jk0xMsXME1U&embed_domain=doiodl.github.io" width='device-width'></iframe> */}
				</Div>
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
