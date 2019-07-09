import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Button, Modal, Form, Col, Row, Input,Menu, Dropdown } from 'antd';
import i18n from 'i18next';

import Icon from './Icon';
import icons from '../../libs/fontawesome-5.2.0/metadata/icons.json';
import { FlexBox } from '../flex';
import Scrollbar from '../common/Scrollbar';
import { i18nClient } from '../../i18n';

class IconsList extends Component {
    handlers = {
        onOk: () => {
            const { icon } = this.state;
            const { onChange } = this.props;
            if (onChange) {
                onChange(icon);
            }
            this.setState({
                visible: false,
            });
        },
        onCancel: () => {
            this.modalHandlers.onHide();
        },
        onClick: () => {
            this.modalHandlers.onShow();
        },
        onClickIcon: (icon) => {
            this.setState({
                icon,
            }, () => {
                const { onChange } = this.props;
                if (onChange) {
                    onChange(icon);
                }
                this.modalHandlers.onHide();
            });
        },
        onSearch: debounce((value) => {
            this.setState({
                textSearch: value,
            });
        }, 500),
    }

    modalHandlers = {
        onShow: () => {
            this.setState({
                visible: true,
            });
        },
        onHide: () => {
            this.setState({
                visible: false,
            });
        },
    }

    static propTypes = {
        onChange: PropTypes.func,
        icon: PropTypes.any,
    }

    static defaultProps = {
        icon: { 'map-marker-alt': icons['map-marker-alt'] },
    }

    state = {
        icon: this.props.icon,
        textSearch: '',
        visible: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            icon: nextProps.icon || this.state.icon,
        });
    }

    getPrefix = (style) => {
        let prefix = 'fas';
        if (style === 'brands') {
            prefix = 'fab';
        } 
        else if (style === 'regular') {
            prefix = 'far';
        }
        else if (style === 'poido') {
            prefix = 'fap';
        }
        return prefix;
    }

     menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              3rd menu item
            </a>
          </Menu.Item>
        </Menu>
      );

    getIcons = (textSearch) => {
        const lowerCase = textSearch.toLowerCase();
        return Object.keys(icons)
            .filter(icon => icon.includes(lowerCase) || icons[icon].search.terms.some(term => term.includes(lowerCase)))
            .map(icon => ({ [icon]: icons[icon] }));
    }

    render() {
        const { onOk, onCancel, onClick, onClickIcon, onSearch } = this.handlers;
        const { icon, visible, textSearch } = this.state;
        const label = (
            <React.Fragment>
                <span style={{ marginRight: 8 }}>{i18n.t('common.icon')}</span>
                <Icon name={Object.keys(icon)[0]} prefix={this.getPrefix(icon[Object.keys(icon)[0]].styles[0])} />
            </React.Fragment>
        );
        const filteredIcons = this.getIcons(textSearch);
        const filteredIconsLength = filteredIcons.length;
        const title = (
            <div style={{ padding: '0 24px' }}>
                <Input
                    onChange={(e) => { onSearch(e.target.value); }}
                    placeholder={i18n.t('imagemap.marker.search-icon', { length: filteredIconsLength })}
                />
            </div>
        );
        return (
            <Scrollbar >
                <Dropdown overlay={this.menu} title={title}>
                        <a className="ant-dropdown-link" href="#">
                            {i18n.t('common.allCategories')} <Icon name={'th-list'} size={12} prefix={'fa'} />
                        </a>
                </Dropdown>

                
                        <div style={{ padding: '0 24px' }}>
                            <Input
                                onChange={(e) => { onSearch(e.target.value); }}
                                placeholder={i18n.t('imagemap.marker.search-icon', { length: filteredIconsLength })}
                            />
                        </div>
                                  
                        <FlexBox
                            onOk={onOk}
                            onCancel={onCancel}                                                    
                            flex="1" 
                            style={{ overflowY: 'hidden' }}                          
                        >
                            <Row>
                                {
                                    filteredIcons.map((ic) => {
                                        const name = Object.keys(ic)[0];
                                        const metadata = ic[name];
                                        const prefix = this.getPrefix(metadata.styles[0]);
                                        return (
                                            <Col onClick={onClickIcon.bind(this, ic)} key={name} span={6} className="rde-icon-container">
                                                <div className="rde-icon-top">
                                                    <Icon name={name} size={26} prefix={prefix} />
                                                </div>
                                                <div className="rde-icon-bottom">
                                                    {name}
                                                </div>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </FlexBox>
            </Scrollbar>
        );
    }
}

export default IconsList;
