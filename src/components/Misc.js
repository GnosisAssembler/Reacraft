/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'

import melon from '../assets/building/misc/150px-Melon.png';
import melonSlice from '../assets/materials/150px-Melon_Slice.png';

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

/**
 * Create misc recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function miscCheck(itemPressed) {

    if (itemPressed==="test") {
        return [melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melon];
    } 
}


