import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Button, Modal, Form, Col, Row, Input, Select } from 'antd';
import i18n from 'i18next';

import Icon from './Icon';
import icons from '../../libs/fontawesome-5.2.0/metadata/icons.json';
import { FlexBox } from '../flex';
import Scrollbar from '../common/Scrollbar';
import { i18nClient } from '../../i18n';

const {  } = Select;

class IconsList extends Component {
    handlers = {
        onClickIcon: (icon) => {
            console.log('iconList',icon)
            this.setState({
                icon,
            }, () => {
                const { onChange } = this.props;
                if (onChange) {
                    onChange(icon);
                }
            });
        },
        onSearch: debounce((value) => {
            this.setState({
                textSearch: value,
            });
        }, 500),
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
        categoriesIcon:{},
        itemToPass:{
			"name": "marker",
			"description": "",
			"type": "marker",
			"icon": {
                "prefix": "fap",
                "name": "map-icon-alt"
            },
            "option": {
                "type": "i-text",
                "text": "\ue806",
                "fontFamily": "Font Pop i do",
                "fontWeight": 900,
                "fontSize": 60,
                "width": 30,
                "height": 30,
                "editable": false,
                "name": "New Icon"
            }
		}
    }

    componentDidMount() {
        
        import('../imagemap/Categories.json').then((categoriesIcon) => {
            this.setState({
                categoriesIcon,
            });
        })
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

    getIcons = (textSearch) => {
        const lowerCase = textSearch.toLowerCase();
        return Object.keys(icons)
            .filter(icon => icon.includes(lowerCase) || icons[icon].search.terms.some(term => term.includes(lowerCase)))
            .map(icon => ({ [icon]: icons[icon] }));
    }

    handleSelectCategories = (value) => {
        //TO DO
        console.log(`selected ${value}`);
      }

    render() {        
        const { onClickIcon, onSearch } = this.handlers;
        const { icon, visible, textSearch, itemToPass } = this.state;       
        const filteredIcons = this.getIcons(textSearch);
        const filteredIconsLength = filteredIcons.length;
        
        return (
            
            <Scrollbar >   
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="filter by categories"
                        defaultValue={['Code']}                    
                        LabelProp="label" 
                        onChange={this.handleSelectCategories}              
                    >            
                        { 
                            Object.values(this.state.categoriesIcon).map((cat,index) =>{                                                                
                                return  <Option value={cat.name} key={index}>
                                            <Icon name={cat.icon} size={12} prefix={this.getPrefix(cat.styles)} />
                                            {cat.name}                                            
                                        </Option>
                            })
                        }
                    </Select>    
                        <div style={{ padding: '0 24px' }}>                            
                            <Input
                                onChange={(e) => { onSearch(e.target.value); }}
                                placeholder={i18n.t('imagemap.marker.search-icon', { length: filteredIconsLength })}
                            />
                        </div>
                                  
                        <FlexBox                                                  
                            flex="1" 
                            style={{ overflowY: 'hidden' }}                          
                        >
                            <Row>
                                {
                                    filteredIcons.map((ic) => { 
                                        const name = Object.keys(ic)[0];                                      
                                        const metadata = ic[name];
                                        const prefix = this.getPrefix(ic[name].styles[0]);                                                                              
                                        return (
                                            <Col onClick={e => this.props.handlers.onAddItem(itemToPass,'centred')} key={name} span={7} className="rde-icon-container">
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
