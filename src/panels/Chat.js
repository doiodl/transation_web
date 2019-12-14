import React, { Component} from 'react';
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

class Chat extends Component {
    constructor(props) {
        super(props);
      this.state = { massive: ["dad", "daa","dad"], cur_n: ""};
    }

  tick()
  {
    var m = this.state.massive;
    this.setState({
      massive: m.concat("kkk")
    });
  }
  componentDidMount() {
    setInterval(() => this.tick(), 3000);
  }
    render(){
        const test = ["ololo", "test"];
        return (

              <div name="chats">
                {this.state.massive.map((element, i) =>{
                    return <span> {element} </span>;
                })}
              </div>
    
        );
    }
    

}

export default Chat;
