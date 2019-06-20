import React, { Component } from 'react';

// Import assets
import blackCarpet from '../../assets/building/carpets/150px-Black_Carpet.png';
import blueCarpet from '../../assets/building/carpets/150px-Blue_Carpet.png';
import cyanCarpet from '../../assets/building/carpets/150px-Cyan_Carpet.png';
import grayCarpet from '../../assets/building/carpets/150px-Gray_Carpet.png';
import greenCarpet from '../../assets/building/carpets/150px-Green_Carpet.png';
import lightBlueCarpet from '../../assets/building/carpets/150px-Light_Blue_Carpet.png';
import lightGrayCarpet from '../../assets/building/carpets/150px-Light_Gray_Carpet.png';
import magentaCarpet from '../../assets/building/carpets/150px-Magenta_Carpet.png';
import orangeCarpet from '../../assets/building/carpets/150px-Orange_Carpet.png';
import pinkCarpet from '../../assets/building/carpets/150px-Pink_Carpet.png';
import purpleCarpet from '../../assets/building/carpets/150px-Purple_Carpet.png';
import redCarpet from '../../assets/building/carpets/150px-Red_Carpet.png';
import whiteCarpet from '../../assets/building/carpets/150px-White_Carpet.png';
import yellowCarpet from '../../assets/building/carpets/150px-Yellow_Carpet.png';

import blackWool from '../../assets/building/wools/150px-Black_Wool.png';
import blueWool from '../../assets/building/wools/150px-Blue_Wool.png';
import cyanWool from '../../assets/building/wools/150px-Cyan_Wool.png';
import grayWool from '../../assets/building/wools/150px-Gray_Wool.png';
import lightBlueWool from '../../assets/building/wools/150px-Light_Blue_Wool.png';
import lightGrayWool from '../../assets/building/wools/150px-Light_Gray_Wool.png';
import magentaWool from '../../assets/building/wools/150px-Magenta_Wool.png';
import orangeWool from '../../assets/building/wools/150px-Orange_Wool.png';
import pinkWool from '../../assets/building/wools/150px-Pink_Wool.png';
import purpleWool from '../../assets/building/wools/150px-Purple_Wool.png';
import redWool from '../../assets/building/wools/150px-Red_Wool.png';
import whiteWool from '../../assets/building/wools/150px-White_Wool.png';
import yellowWool from '../../assets/building/wools/150px-Yellow_Wool.png';
import emptyBlock from '../../img/150px-Empty-Block.png';

export default class Carpet extends Component {
    render() {
        return (
            <div>
                <img src={blackCarpet} alt="blackCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-blackCarpet"/>
                <img src={blueCarpet} alt="blueCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-blueCarpet"/>
                <img src={cyanCarpet} alt="cyanCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-cyanCarpet"/>
                <img src={grayCarpet} alt="grayCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-grayCarpet"/>
                <img src={greenCarpet} alt="greenCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-greenCarpet"/>
                <img src={lightBlueCarpet} alt="lightBlueCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-lightBlueCarpet"/>
                <img src={lightGrayCarpet} alt="lightGrayCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-lightGrayCarpet"/>
                <img src={magentaCarpet} alt="magentaCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-magentaCarpet"/>
                <img src={orangeCarpet} alt="orangeCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-orangeCarpet"/>
                <img src={pinkCarpet} alt="pinkCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-pinkCarpet"/>
                <img src={purpleCarpet} alt="purpleCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-purpleCarpet"/>
                <img src={redCarpet} alt="redCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-redCarpet"/>
                <img src={whiteCarpet} alt="whiteCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-whiteCarpet"/>
                <img src={yellowCarpet} alt="yellowCarpet" width="36px;" onClick={this.props.handleRecipeChange} id="3-yellowCarpet"/>
            </div>
        )
    }
}

/**
 * Create carpet recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function carpetCheck(itemPressed) {

    if (itemPressed==="3-blackCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,blackWool, blackWool, emptyBlock, blackCarpet];
    } else if (itemPressed==="3-blueCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,blueWool, blueWool, emptyBlock, blueCarpet];
    } else if (itemPressed==="3-cyanCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,cyanWool, cyanWool, emptyBlock, cyanCarpet];
    } else if (itemPressed==="3-grayCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,grayWool, grayWool, emptyBlock, grayCarpet];
    } else if (itemPressed==="3-lightBlueCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,lightBlueWool, lightBlueWool, emptyBlock, lightBlueCarpet];
    } else if (itemPressed==="3-lightGrayCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,lightGrayWool, lightGrayWool, emptyBlock, lightGrayCarpet];
    } else if (itemPressed==="3-magentaCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,magentaWool, magentaWool, emptyBlock, magentaCarpet];
    } else if (itemPressed==="3-orangeCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,orangeWool, orangeWool, emptyBlock, orangeCarpet];
    } else if (itemPressed==="3-pinkCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,pinkWool, pinkWool, emptyBlock, pinkCarpet];
    } else if (itemPressed==="3-purpleCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,purpleWool, purpleWool, emptyBlock, purpleCarpet];
    } else if (itemPressed==="3-redCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,redWool, redWool, emptyBlock, redCarpet];
    } else if (itemPressed==="3-whiteCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,whiteWool, whiteWool, emptyBlock, whiteCarpet];
    } else if (itemPressed==="3-yellowCarpet") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,emptyBlock,yellowWool, yellowWool, emptyBlock, yellowCarpet];
    }
}
