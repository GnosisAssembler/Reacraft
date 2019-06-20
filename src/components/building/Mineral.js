import React, { Component } from 'react'

// Import assets
import goldBlock from '../../assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from '../../assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from '../../assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from '../../assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from '../../assets/building/minerals/150px-Lapis_Lazuli_Block.png';
import goldIngot from '../../assets/materials/150px-Gold_Ingot.png';
import ironIngot from '../../assets/materials/150px-Iron_Ingot.png';
import diamondIngot from '../../assets/materials/150px-Diamond.png';
import emeraldIngot from '../../assets/materials/150px-Emerald.png';
import lapisIngot from '../../assets/materials/150px-Lapis_Lazuli.png';

export default class Mineral extends Component {

    render() {
        return (
            <div>
                <img src={goldBlock} alt="gold-block" width="36px;" onClick={this.props.handleRecipeChange} id="1-gold"/>
                <img src={ironBlock} alt="iron-block" width="36px;" onClick={this.props.handleRecipeChange} id="1-iron"/>
                <img src={diamondBlock} alt="diamond-block" width="36px;" onClick={this.props.handleRecipeChange} id="1-diamond"/>
                <img src={emeraldBlock} alt="emerald-block" width="36px;" onClick={this.props.handleRecipeChange} id="1-emerald"/>
                <img src={lapisBlock} alt="lapis-block" width="36px;" onClick={this.props.handleRecipeChange} id="1-lapis"/>
            </div>
        )
    }
}

/**
 * Create mineral recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function mineralCheck(itemPressed) {

    if (itemPressed==="1-gold") {
        return [goldIngot, goldIngot, goldIngot, goldIngot, goldIngot, goldIngot, goldIngot, goldIngot, goldIngot,  goldBlock];
    } else if(itemPressed==="1-iron") {
        return [ironIngot, ironIngot, ironIngot, ironIngot, ironIngot, ironIngot, ironIngot, ironIngot, ironIngot, ironBlock];
    } else if(itemPressed==="1-diamond") {
        return [diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondIngot, diamondBlock];
    } else if(itemPressed==="1-emerald") {
        return [emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldIngot, emeraldBlock];
    } else  {
        return [lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisIngot, lapisBlock];
    }
}
