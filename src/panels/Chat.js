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
      this.infoId = props;
      this.but = this.but.bind(this)
      this.onChangeHandler = this.onChangeHandler.bind(this)
      this.state = {
        massive: [],
        cur_n: 0,
        msg:""
      };
    }
  
  but(e) {
    e.preventDefault();
    console.log('По ссылке кликнули.');
    console.log(this.props.fetchedUser)
    var date = new Date();
    let user = {
      type_req: 'chat',
      object: {
        type: "post",
        info: {
          'id': this.props.fetchedUser.id,
          'name': this.props.fetchedUser.first_name + " " + this.props.fetchedUser.last_name,
          'msg': $("#message-text").val(),
          "date_msg": date.getHours().toString(10) +":"+ date.getMinutes().toString(10)
        }
			}
    };
    this.setState({
      msg: ""
  })
    fetch('https://doiodl.pythonanywhere.com/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
      })
  }
  tick(e)
  {
    let user = {
			type_req: 'chat',
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
      .then(function (data) {
        console.log(data)
        if (data['add'])
        {
          console.log(data['msg_arr'])
          var m = e.state.massive;
          e.setState({
            massive: m.concat(data['msg_arr'])
          });
          e.setState({
            cur_n: e.state.massive.length
          });
        }
		  });
  }
  onChangeHandler(event){       
    const value = event.target.value;
    this.setState({
        msg: value
    })
}
  componentDidMount() {
    setInterval(() => this.tick(this), 3000);
  }
    render(){
        return (
          <Group name="chats">
            <Div className="pole" style={{ height: "250px", maxHeight: "250px"}}>
              {this.state.massive.map((element, i) => {
                return <div> {element.name} </div>;
                // return $(".pole").append("<spand></spand>");
              })}
            </Div> 
            <Div class='chat-input' >
              <FormLayout id='chat-form' >
                <div style={{ display: "flex", width: "100%"}}>
            <Textarea style={{ width: "90%" }} id='message-text' onChange={this.onChangeHandler}
            class='chat-form__input' placeholder='Введите сообщение'  value={this.state.msg} />
                <Button style={{ height: "40px" }} before={<Icon28Send />} class='chat-form__submit' onClick={this.but} ></Button>
                </div>
              </FormLayout>
				    </Div>
          </Group>
        );
    }
    

}

export default Chat;
