import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/map';
import 'core-js/features/set';
import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
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
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';
const osName = platform();

class F4 extends Component {
	constructor(props) {
		super(props);
		console.log(props.fetchedUser.reg_mas)
		this.state = {
		  popout: null,
		  actionsLog: [],
		};
		this.openDefault = this.openDefault.bind(this);
		this.closePopout = this.closePopout.bind(this);
		this.go_home_andreg = this.go_home_andreg.bind(this);
	  }
	go_home_andreg()
	{
		let user = {
			inputId: this.props.fetchedUser.id,
			inputNum: this.props.fetchedUser.reg_mas.num,
			inputYear: this.props.fetchedUser.reg_mas.year
		}
		fetch('https://artem4ke.pythonanywhere.com/new_reg_obj/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
		this.props.go_home();
	}
	openDefault() {
		this.props.chang(
			<Alert
				actions={[{
					title: 'Окей',
					autoclose: true,
					action: () => this.go_home_andreg(),
				}]}
				onClose={this.closePopout}
			>
				<h2>Проверяй свои </h2>
				<p>Довфвфв.</p>
			</Alert>
		);
	  }
	  closePopout () {
		this.props.chang(null);
	  }
	render() {
		return (
			<Panel id={this.props.id} popout={this.state.popout}>
				<PanelHeader
					left={<HeaderButton onClick={this.props.go} data-to="f3">
						{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
					</HeaderButton>}>
					Хочешь получить бонус?
				</PanelHeader>
				<Div >
					<Button style={{ position: 'relative', left: "35%" }} size="l" level="commerce" onClick={this.openDefault} data-to="f1">
							<b>Хорошо</b>
					</Button>
					<br></br>
					<Button style={{ position: 'relative', left: "35%" }} level="tertiary" onClick={this.go_home_andreg} data-to="f1">Заберу позже</Button>
					</Div>
			</Panel>
		);
	}
	
}

F4.propTypes = {
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

export default F4;
