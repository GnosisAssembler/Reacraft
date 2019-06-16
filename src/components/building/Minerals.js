import React, { Component } from 'react';
import '../../css/Minerals.css';

class Minerals extends Component {
    render() {
        return (
        <div className="Minerals">
            <ul>
                <li><img src={this.props.mineralSecondary} alt="test" width="25px;"/></li>
                <li><img src={this.props.mineralSecondary} alt="test" width="25px;"/></li>
                <li><img src={this.props.mineralSecondary} alt="test" width="25px;"/></li>
            </ul>
            <img src={this.props.mineralMain} alt="test" width="85px;"/>
        </div>
        );
    }

}

export default Minerals;
