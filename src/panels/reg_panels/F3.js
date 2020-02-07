import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/map';
import 'core-js/features/set';
import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import connect from '@vkontakte/vk-connect';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();

class F3 extends Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		email: '',
		purpose: ''
	  }
		this.onChange = this.onChange.bind(this);
		this.set_sub = this.set_sub.bind(this);
	}
	onChange(e)
	{
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
	  }
	set_sub(e) {
		if (this.state.purpose !== '')
		{
			this.props.fetchedUser.reg_mas.year = parseInt(this.state.purpose, 10);
			this.props.go(e);
		}
	}
	render() {
		const { email, purpose } = this.state;
		return (
			<Panel id={this.props.id}>
				<PanelHeader
					left={<HeaderButton onClick={this.props.go} data-to="f2">
						{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
					</HeaderButton>}>
					В каком году сдаешь ЕГЭ?
				</PanelHeader>
				<FormLayout id='forms_my'>
					<Select
					top="Год сдачи"
					placeholder="Выбери год сдачи ЕГЭ"
					status={purpose ? 'valid' : 'error'}
					bottom={purpose ? '' : 'Пожалуйста, укажи год'}
					onChange={this.onChange}
					value={purpose}
					name="purpose"
					>
					<option value="2020">2020</option>
					<option value="2021">2021</option>
					<option value="0">Другое</option>
					</Select>
				</FormLayout>
					<Div >
						<Button style={{ position: 'relative', left: "35%" }} size="l" level="commerce" onClick={this.set_sub} data-to="f4">
							<b>Хорошо</b>
						</Button>
					</Div>
			</Panel>
		);
	}
	
}

F3.propTypes = {
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

export default F3;
