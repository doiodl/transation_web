import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import connect from '@vkontakte/vk-connect';
import logo from '../img/logo.jpg'

const Home1 = ({ id, go, fetchedUser }) => {
	
	return (
		<Panel id={id}>
			<Group>
				<Div >
					<img style={{position:'relative', marginLeft: '25%', width: '50%'}} src={logo}></img>
					<br></br>
					<Button style={{ position: 'relative', marginLeft: "42%" }} size="l" level="commerce" onClick={go} data-to="f1">
						<b>Регистрация</b>
					</Button>
				</Div>
			</Group>
		</Panel>
	);
}

Home1.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};


export default Home1;
