// Import block and material images
import blackConcretePowder from '../assets/building/concrete/150px-Black_Concrete_Powder.png';
import blueConcretePowder from '../assets/building/concrete/150px-Blue_Concrete_Powder.png';
import cyanConcretePowder from '../assets/building/concrete/150px-Cyan_Concrete_Powder.png';
import grayConcretePowder from '../assets/building/concrete/150px-Gray_Concrete_Powder.png';
import limeConcretePowder from '../assets/building/concrete/150px-Lime_Concrete_Powder.png';
import lightBlueConcretePowder from '../assets/building/concrete/150px-Light_Blue_Concrete_Powder.png';
import lightGrayConcretePowder from '../assets/building/concrete/150px-Light_Gray_Concrete_Powder.png';
import magentaConcretePowder from '../assets/building/concrete/150px-Magenta_Concrete_Powder.png';
import orangeConcretePowder from '../assets/building/concrete/150px-Orange_Concrete_Powder.png';
import pinkConcretePowder from '../assets/building/concrete/150px-Pink_Concrete_Powder.png';
import purpleConcretePowder from '../assets/building/concrete/150px-Purple_Concrete_Powder.png';
import redConcretePowder from '../assets/building/concrete/150px-Red_Concrete_Powder.png';
import brownConcretePowder from '../assets/building/concrete/150px-Brown_Concrete_Powder.png';
import yellowConcretePowder from '../assets/building/concrete/150px-Yellow_Concrete_Powder.png';
import sand from '../assets/materials/150px-Sand.png';
import gravel from '../assets/materials/150px-Gravel.png';

import blackDye from '../assets/materials/dyes/150px-Black_Dye.png';
import blueDye from '../assets/materials/dyes/150px-Blue_Dye.png';
import cyanDye from '../assets/materials/dyes/150px-Cyan_Dye.png';
import grayDye from '../assets/materials/dyes/150px-Gray_Dye.png';
import limeDye from '../assets/materials/dyes/150px-Lime_Dye.png';
import lightBlueDye from '../assets/materials/dyes/150px-Light_Blue_Dye.png';
import lightGrayDye from '../assets/materials/dyes/150px-Light_Gray_Dye.png';
import magentaDye from '../assets/materials/dyes/150px-Magenta_Dye.png';
import orangeDye from '../assets/materials/dyes/150px-Orange_Dye.png';
import pinkDye from '../assets/materials/dyes/150px-Pink_Dye.png';
import purpleDye from '../assets/materials/dyes/150px-Purple_Dye.png';
import brownDye from '../assets/materials/dyes/150px-Brown_Dye.png';
import yellowDye from '../assets/materials/dyes/150px-Yellow_Dye.png';


/**
 * Create concrete recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function concreteCheck(itemPressed) {

    if (itemPressed==="4-blackConcretePowder") {
        return [blackDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel, blackConcretePowder];
    } else if (itemPressed==="4-blueConcretePowder") {
        return [blueDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel, blueConcretePowder];
    } else if (itemPressed==="4-cyanConcretePowder") {
        return [cyanDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,cyanConcretePowder ];
    } else if (itemPressed==="4-grayConcretePowder") {
        return [grayDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,grayConcretePowder ];
    } else if (itemPressed==="4-lightBlueConcretePowder") {
        return [lightBlueDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel, lightBlueConcretePowder];
    } else if (itemPressed==="4-lightGrayConcretePowder") {
        return [lightGrayDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,lightGrayConcretePowder ];
    } else if (itemPressed==="4-magentaConcretePowder") {
        return [magentaDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,magentaConcretePowder ];
    } else if (itemPressed==="4-orangeConcretePowder") {
        return [orangeDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,orangeConcretePowder ];
    } else if (itemPressed==="4-pinkConcretePowder") {
        return [pinkDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,pinkConcretePowder ];
    } else if (itemPressed==="4-purpleConcretePowder") {
        return [purpleDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,purpleConcretePowder ];
    } else if (itemPressed==="4-limeConcretePowder") {
        return [limeDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel, limeConcretePowder];
    } else if (itemPressed==="4-brownConcretePowder") {
        return [brownDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel, brownConcretePowder];
    } else if (itemPressed==="4-yellowConcretePowder") {
        return [yellowDye,sand,sand,sand,sand, gravel, gravel, gravel, gravel,yellowConcretePowder ];
    }
}
