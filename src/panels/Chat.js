import React, { Component} from 'react';
import PropTypes from 'prop-types';
import connect from '@vkontakte/vk-connect';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import $ from 'jquery';
import persik from '../img/persik.png';
import 'youtube-video-js';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import './Persik.css';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import { FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';

class Chat extends Component {
    constructor(props) {
        super(props);
      this.state = { massive: [{"name": "Timur","msg":"I EBAL STAHAT","date":"14:05"}, {"name": "Artem", "msg":"I EBAL TELKY", "date":"14:05"},{"name": "Slava", "msg":"I EBAL VSEH", "date":"14:05"}], cur_n: 0};
    }
  
  but(e) {
      e.preventDefault();
    console.log('По ссылке кликнули.');
    // $(".pole").append("<spand>TEXT</spand></br>");
    }
  tick()
  {
    let user = {
			type: 'chat',
      object: {
        type: "get",
        current_msg: this.state.cur_n
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
        return response.json();
      })
			.then(function(data) {
			  console.log(data);
		  });
    var m = this.state.massive;
    this.setState({
      massive: m.concat({"name": "Brustik", "msg":"I SOSAL VSEH", "date":"14:05"})
    });
  }
  componentDidMount() {
    setInterval(() => this.tick(), 3000);
  }
    render(){
        return (
          <Group name="chats">
            <Div className="pole" style={{ height: "50px" }}>
              {this.state.massive.map((element, i) => {
                return <div> {element.name} </div>;
                // return $(".pole").append("<spand></spand>");
              })}
            </Div> 
            <Div class='chat-input'>
              <FormLayout method='post' id='chat-form'>
                <Textarea type='text' id='message-text' class='chat-form__input' placeholder='Введите сообщение'></Textarea>
                <Button before={<Icon28Send />} class='chat-form__submit' onClick={this.but} ></Button>
              </FormLayout>
				    </Div>
          </Group>
          
    
        );
    }
    

}

export default Chat;
