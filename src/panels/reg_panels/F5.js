import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/map';
import 'core-js/features/set';
import React, { useState, useEffect, Component } from 'react';
import PropTypes, { element } from 'prop-types';
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
import { platform, IOS, CellButton } from '@vkontakte/vkui';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';

const osName = platform();

class F5 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obj: props.fetchedUser.objects,
			status_in: "none",
			phone: "",
			email: "",
			password:"",
			col:"commerce"
		};
		this.go_home_andreg = this.go_home_andreg.bind(this);
		this.get_contact = this.get_contact.bind(this);
		this.onChange = this.onChange.bind(this);
	  }
	async go_home_andreg()
	{
		let user_1 = {
			inputId: this.props.fetchedUser.id,
			inputName: this.props.fetchedUser.first_name,
			inputPhone: parseInt(this.state.phone,10),
			inputEmail : this.state.email,
			inputPassword : this.state.password
		};
		await fetch('https://artem4ke.pythonanywhere.com/new_user/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user_1)
		})
		let user = {
			inputId: this.props.fetchedUser.id,
			inputNum: this.props.fetchedUser.reg_mas.num,
			inputYear: this.props.fetchedUser.reg_mas.year
		}
		await fetch('https://artem4ke.pythonanywhere.com/new_reg_obj/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
		
		this.props.go_home();
	}
	onChange(e) {
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
		if (this.state.password !== '' && this.state.email !== '' && this.state.password !== '')
			this.setState({ status_in: 'block' });
		if (this.state.password == '' || this.state.email === '' || this.state.password === '')
			this.setState({ status_in: 'none' });
	  }
	async get_contact()
	{
		console.log("d");
		await connect.sendPromise("VKWebAppGetPersonalCard", { "type": ["phone", "email"] })
			.then(data => {
				this.setState({ phone: data['data']['phone'] })
				this.setState({ email: data['data']['email'] })
				this.setState({col:'secondary'})
			}).catch(error => console.log(error))
	}
	render() {
		const { email, phone } = this.state;
		return (
			<Panel id={this.props.id}>
				<PanelHeader
					left={<HeaderButton onClick={this.props.go} data-to="f4">
						{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
					</HeaderButton>}
					>
					Завершение регистрации
				</PanelHeader>
				<Div >
						<p>Для завершения регистрации введите свой номер телефона, почту и пароль</p>
					<br></br>
					{/* <Cell asideContent={<Button level={this.state.col} onClick={this.get_contact} data-to="f1">Разрешить</Button>}>
						<p>Взять номер и почту из VK</p>
					</Cell> */}
					<Input
						type="email"
						top="E-mail"
						name="email"
						value={email}
						placeholder='E-mail'
						onChange={this.onChange}
						status={email ? 'valid' : 'error'}
						bottom={email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
					/>
					<br></br>
					<Input
						type="phone"
						top="Телефон"
						name="phone"
						placeholder='Phone'
						value={phone}
						onChange={this.onChange}
						status={phone ? 'valid' : 'error'}
						/>
					<FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">
					<Input id='pass1' name='password' onChange={this.onChange} type="password"  placeholder="Введите пароль" />
					<Input id='pass2' onChange={this.onChange} type="password" placeholder="Повторите пароль" />
            		</FormLayoutGroup>
					<Button style={{ position: 'relative', left: "35%", display:this.state.status_in }} level="primary" onClick={this.go_home_andreg} data-to="f1">Завершить</Button>
					</Div>
			</Panel>
		);
	}
	
}

F5.propTypes = {
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

export default F5;
