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
	connect.send("VKWebAppResizeWindow", {"width": 800, "height": 940});
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
	// <script type="text/javascript" src="//www.youtube.com/iframe_api"></script>

	// function onYouTubePlayerAPIReady() {
	// 	var videoBox = document.getElementById('video1');
	// 	videoBox.ytplayer = new YT.Player(videoBox, {
	// 		videoId: 'kXDiGtgPL6E',
	// 		playerVars: {
	// 			//controls: 0,
	// 			wmode:'transparent'
	// 		},
	// 		height: '200',
	// 		width: '320'
	// 	});
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
				{/* <iframe width="800" height="400" src="https://www.youtube.com/watch?v=upnuYwd94tw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
				{/* <iframe width="800" height="400" src="https://www.youtube.com/embed/upnuYwd94tw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
				
				{/* <iframe src="https://www.youtube.com/live_chat?v=Jk0xMsXME1U&embed_domain=doiodl.github.io" width="800" height="400" frameborder="0" scrolling="no"></iframe> */}

				{/* <Div>
				<script src="../node_modules/video.js/dist/video.min.js"></script>
				<script src="../dist/Youtube.min.js"></script>
				<youtube-video
					width="640"
					height="360"
					src="https://www.youtube.com/watch?v=Wn9twYUXw6w"
					controls
						/>
				</Div> */}
				<Div>
				<YouTubePlayer
					url='https://www.youtube.com/watch?v=d46Azg3Pm4c'
					playing
					controls
					// Other ReactPlayer props will work here
					/>
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
