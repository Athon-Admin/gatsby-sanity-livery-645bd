import React from 'react';
import _ from 'lodash';
import { classNames, toStyleObj, withPrefix } from '../utils';
export default class HeroSection extends React.Component {
     state = { Player: null }
     async componentDidMount() {
          if (window !== 'undefined') {
               import('@exmg/livery').then(() => {
                    this.setState({
                         Player:
                              <livery-player streamid="5ddb98f5e4b0937e6a4507f2" style={{ width: '100%' }}></livery-player>
                    })
               }).catch(error => 'An error occurred while loading the slider component')
          }
     }
     render() {
          let section = _.get(this.props, 'section', null);
          let padding_top = _.get(section, 'padding_top', null) || 'medium';
          let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
          let bg_color = _.get(section, 'background_color', null) || 'none';
          let bg_img_opacity_pct = _.get(section, 'background_image_opacity', null) || 100;
          let bg_img_opacity = bg_img_opacity_pct * 0.01;
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
          return (
               <React.Fragment>
                    <section className={classNames('section', 'hero', { 'has-border': _.get(section, 'has_border', null), 'has-cover': _.get(section, 'background_image', null), 'bg-none': bg_color === 'none', 'bg-primary': bg_color === 'primary', 'bg-secondary': bg_color === 'secondary', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-7': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-7': padding_bottom === 'large' })}>
                         {_.get(section, 'background_image', null) && (
                              <div className="cover-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\'); opacity: ' + bg_img_opacity + '; background-size: ' + bg_img_size + '; background-repeat: ' + bg_img_repeat + '; background-position: ' + bg_img_position)} />
                         )}

                         <div className={classNames('container', { 'container--medium': is_vert })}>
                              {this.state.Player}
                         </div>
                    </section>
               </React.Fragment>
          );
     }
}
