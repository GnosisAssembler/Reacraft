import React, { Component } from 'react';
import '../../css/Minerals.css';

// Import CraftingRows
import CraftingRows from '../common/CraftingRows';

class Minerals extends Component {
    render() {
        return (
        <div className="Minerals">

            <CraftingRows 
                input={<img src={this.props.mineralSecondary} alt="input-material" width="36px;"/>}
                output={<img src={this.props.mineralMain} alt="output-material" width="36px;"/>}
            />

            <img src={this.props.mineralMain} alt="big-output" width="100px;" height="100px;" id="big-output"/>
        </div>
        );
    }

}

export default Minerals;
