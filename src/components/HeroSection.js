import React from 'react';
import _ from 'lodash';
import ChatInput from '../../static/images/chat-input.svg';
import { classNames, toStyleObj, withPrefix } from '../utils';
export default class HeroSection extends React.Component {
     state = { Player: null, showChat: false, conHeight: 0 }
     hideChat = false
     setShowChat() {
          this.setState((prevState) => ({
               showChat: !prevState.showChat,
               conHeight: prevState.showChat ? 0 : 200
          }));
     }
     async componentDidMount() {
          if (window !== 'undefined') {
               console.log('componentDidMount', window.location)
               this.hideChat = window.location.href.toLowerCase().includes('hidechat=true')
               import('@exmg/livery').then(() => {
                    this.setState({
                         Player:
                              <livery-player streamid="602f8ff4e4b0fb5db0c6599a" style={{ width: '100%', height: '100%' }}></livery-player>
                         /* <embed src="https://embed.liveryvideo.com/?id=5ddb98f5e4b0937e6a4507f2" width="100%" height="100vh"/> */
                    })
               }).catch(error => 'An error occurred while loading the slider component')
          }
     }
     isAndroid = () =>
          typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);
     isIOS = () =>
          typeof navigator !== 'undefined' &&
          !!navigator.platform &&
          /iPad|iPhone|iPod/.test(navigator.platform);
     render() {
          let section = _.get(this.props, 'section', null);
          let padding_top = _.get(section, 'padding_top', null) || 'medium';
          let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
          let bg_color = _.get(section, 'background_color', null) || 'none';
          let bg_img_opacity_pct = _.get(section, 'background_image_opacity', null) || 100;
          let bg_img_opacity = 1;
          let bg_img_size = _.get(section, 'background_image_size', null) || 'cover';
          let bg_img_position = _.get(section, 'background_image_position', null) || 'center center';
          let bg_img_repeat = _.get(section, 'background_image_repeat', null) || 'no-repeat';
          let has_text = false;
          let has_media = false;
          let media_pos = _.get(section, 'media_position', null) || 'top';
          let is_vert = false;
          if ((((_.get(section, 'title', null) || _.get(section, 'subtitle', null)) || _.get(section, 'content', null)) || _.get(section, 'actions', null))) {
               has_text = true;
          }
          if ((_.get(section, 'image', null) || _.get(section, 'video_embed_html', null))) {
               has_media = true;
          }
          if (((has_media === false) || (has_text === false))) {
               media_pos = 'top';
          }
          if (((media_pos === 'top') || (media_pos === 'bottom'))) {
               is_vert = true;
          }
          const style = {
               minHeight: '500px',
               ...(this.isAndroid() || this.isIOS() ? { height: "500px" } : {})
          }
          const anim = `transition-property: all;
          transition-duration: .5s;
          transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
     `;
          return (
               <React.Fragment>
                    <section style={style} className={classNames('section', 'hero', { 'has-border': _.get(section, 'has_border', null), 'has-cover': _.get(section, 'background_image', null), 'bg-none': bg_color === 'none', 'bg-primary': bg_color === 'primary', 'bg-secondary': bg_color === 'secondary', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-7': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-7': padding_bottom === 'large' })}>
                         {_.get(section, 'background_image', null) && (
                              <div className="cover-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\'); opacity: ' + bg_img_opacity + '; background-size: ' + bg_img_size + '; background-repeat: ' + bg_img_repeat + '; background-position: ' + bg_img_position)} />
                         )}

                         <div style={{ height: '100%', position: 'relative', width: '100%' }} className={classNames('container', { 'container--medium': is_vert })}>
                              {this.state.Player}
                              {this.state.showChat && <div 
                              style={toStyleObj('position: absolute; left: 15px; height:'+ this.state.conHeight +'px; bottom: 65px; right: 15px; z-index: 1; background-repeat: no-repeat; background-image: url(\'' + withPrefix('images/chat-conversation.svg') + ';' + anim)}
                              ></div>}
                              {!this.hideChat && <div onClick={() => this.setShowChat()}
                              style={toStyleObj('height: 65px;  background-size: contain; background-repeat: no-repeat;  z-index: 2; background-image: url(\'' + withPrefix('images/chat-input-bar.svg'))}>
                              </div>}
                         </div>
                    </section>
               </React.Fragment>
          );
     }
}
