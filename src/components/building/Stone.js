import React, { Component } from 'react'

// Import assets
import stoneBrickBlock from '../../assets/building/stone/150px-Stone_Bricks.png';
import mossyStoneBlock from '../../assets/building/stone/150px-Mossy_Stone_Bricks.png';
import mossyCobbleBlock from '../../assets/building/stone/150px-Mossy_Cobblestone.png';
import crackedStoneBlock from '../../assets/building/stone/150px-Cracked_Stone_Bricks.png';
import chiseledStoneBlock from '../../assets/building/stone/150px-Chiseled_Stone_Bricks.png';
import smoothStone from '../../assets/building/stone/150px-Stone.png'
import cobbleStone from '../../assets/building/stone/150px-Cobblestone.png';
import vines from '../../assets/miscellaneous/150px-Vines.png';
import stoneBrickSlabs from '../../assets/building/slabs/150px-Stone_Brick_Slab.png';
import emptyBlock from '../../img/150px-Empty-Block.png';

export default class Stone extends Component {

    render() {
        return (
            <div>
                <img src={stoneBrickBlock} alt="stoneBrick" width="36px;" onClick={this.props.handleRecipeChange} id="2-stoneBrick"/>
                <img src={mossyStoneBlock} alt="mossyStone" width="36px;" onClick={this.props.handleRecipeChange} id="2-mossyStone"/>
                <img src={mossyCobbleBlock} alt="mossyCobble" width="36px;" onClick={this.props.handleRecipeChange} id="2-mossyCobble"/>
                <img src={chiseledStoneBlock} alt="chiseledStone" width="36px;" onClick={this.props.handleRecipeChange} id="2-chiseledStone"/>
                <img src={crackedStoneBlock} alt="crackedStone" width="36px;" onClick={this.props.handleRecipeChange} id="f-crackedStone"/>
            </div>
        )
    }
}

/**
 * Create stone recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function stoneCheck(itemPressed) {

    if (itemPressed==="2-stoneBrick") {
        return [smoothStone, smoothStone, emptyBlock, smoothStone, smoothStone, emptyBlock, emptyBlock, emptyBlock, emptyBlock, stoneBrickBlock];
    } else if(itemPressed==="2-mossyStone") {
        return [emptyBlock, emptyBlock, emptyBlock, stoneBrickBlock, vines, emptyBlock, emptyBlock, emptyBlock, emptyBlock, mossyStoneBlock];
    } else if(itemPressed==="2-mossyCobble") {
        return [emptyBlock, emptyBlock, emptyBlock, cobbleStone, vines, emptyBlock, emptyBlock, emptyBlock, emptyBlock, mossyCobbleBlock];
    } else  {
        return [emptyBlock, emptyBlock, emptyBlock, emptyBlock, stoneBrickSlabs, emptyBlock, emptyBlock, stoneBrickSlabs, emptyBlock, chiseledStoneBlock, 1];
    }
}

