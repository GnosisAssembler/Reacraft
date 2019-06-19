import React, { Component } from 'react'

import melon from '../assets/building/misc/150px-Melon.png';

export default class Misc extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src={melon} alt="melon" width="36px;" id="test" onClick={this.props.handleRecipeChange}/>
            </div>
        )
    }
}

