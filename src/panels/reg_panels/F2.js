import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import connect from '@vkontakte/vk-connect';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();
const F2 = ({ id, go, fetchedUser }) => {
	function set_sub(e) {
		const element = document.getElementsByClassName('Checkbox__input');
		var a = 0;
		for (let i = 0; i < element.length; i++)
		{
			if (element[i].checked == true)
				a = a | parseInt(element[i].id, '10');
		}
		if (a != 0)
		{
			fetchedUser.reg_mas.num = a;
			go(e)
		}
	}
	return (
		<Panel id={id}>
			<PanelHeader
				left={<HeaderButton onClick={go} data-to="f1">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}>
				Какие предметы сдаешь?
			</PanelHeader>
			<FormLayout id='forms_my'>
				<Checkbox id='2048'>Английский</Checkbox>
				<Checkbox id='1024'>Биология</Checkbox>
				<Checkbox id='512'>География</Checkbox>
				<Checkbox id='256'>Информатика</Checkbox>
				<Checkbox id='128'>История</Checkbox>
				<Checkbox id='64'>Литература</Checkbox>
				<Checkbox id='32'>Математика базовая</Checkbox>
				<Checkbox id='16'>Математика профильная</Checkbox>
				<Checkbox id='8'>Обществознание</Checkbox>
				<Checkbox id='4'>Русский язык</Checkbox>
				<Checkbox id='2'>Физика</Checkbox>
				<Checkbox id='1'>Химия</Checkbox>
			</FormLayout>
				<Div >
					<Button style={{ position: 'relative', left: "35%" }} size="l" level="commerce" onClick={set_sub} data-to="f3">
						<b>Хорошо</b>
					</Button>
				</Div>
		</Panel>
	);
}

F2.propTypes = {
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

export default F2;
