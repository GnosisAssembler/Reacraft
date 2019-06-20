import React, { Component } from 'react'

import melon from '../../assets/building/misc/150px-Melon.png';
import melonSlice from '../../assets/materials/150px-Melon_Slice.png';

export default class Misc extends Component {
    render() {
        return (
            <div>
                <img src={melon} alt="melon" width="36px;" id="6-melon" onClick={this.props.handleRecipeChange}/>
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

    if (itemPressed==="6-melon") {
        return [melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melonSlice,melon];
    } 
}


