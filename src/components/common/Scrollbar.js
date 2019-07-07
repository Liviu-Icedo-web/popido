import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class Scrollbar extends Component {
    renderTrack = props => <div {...props} className="rde-track-vertical" />;

    render() {
        console.log(this.props);
        console.log('RenderTrack', this.renderTrack);
        return (
            <Scrollbars
                renderTrackVertical={this.renderTrack}               
            >
                {this.props.children}
            </Scrollbars>
        );
    }
}

export default Scrollbar;