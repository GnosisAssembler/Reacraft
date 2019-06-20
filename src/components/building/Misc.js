import React, { Component } from 'react'

// Import assets
import melon from '../../assets/building/misc/150px-Melon.png';
import melonSlice from '../../assets/materials/150px-Melon_Slice.png';
import brickBlock from '../../assets/building/misc/150px-Bricks.png';
import brick from '../../assets/materials/150px-Brick_TextureUpdate.png';
import boneBlock from '../../assets/building/misc/150px-Bone_Block_Axis_X.png';
import boneMeal from '../../assets/materials/150px-Bone_Meal.png';
import emptyBlock from '../../img/150px-Empty-Block.png';

export default class Misc extends Component {
    render() {
        return (
            <div>
                <img src={melon} alt="melon" width="36px;" id="6-melon" onClick={this.props.handleRecipeChange}/>
                <img src={boneBlock} alt="bone-block" width="36px;" id="6-boneBlock" onClick={this.props.handleRecipeChange}/>
                <img src={brickBlock} alt="brick-block" width="36px;" id="6-brickBlock" onClick={this.props.handleRecipeChange}/>
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
    } else if (itemPressed==="6-boneBlock") {
        return [boneMeal,boneMeal,boneMeal,boneMeal,boneMeal,boneMeal,boneMeal,boneMeal,boneMeal,boneBlock];
    } else if (itemPressed==="6-brickBlock") {
        return [brick, brick, emptyBlock, brick, brick, emptyBlock, emptyBlock, emptyBlock, emptyBlock, brickBlock];
    } 
}


