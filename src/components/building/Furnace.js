import React, { Component } from 'react'

// Import assets
import coal from '../../assets/materials/150px-Coal.png';
import stoneBrickBlock from '../../assets/building/stone/150px-Stone_Bricks.png';
import crackedStoneBlock from '../../assets/building/stone/150px-Cracked_Stone_Bricks.png';

//! Component temporary unused
export default class Furnace extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

/**
 * Create furnace recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function furnaceCheck(itemPressed) {

    if (itemPressed==="f-crackedStone") {
        return [stoneBrickBlock, coal, crackedStoneBlock];
    } 
}

