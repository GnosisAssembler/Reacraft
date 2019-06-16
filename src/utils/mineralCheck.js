// Import block and ingot images
import goldBlock from '../assets/building/minerals/150px-Block_of_Gold.png';
import goldIngot from '../assets/materials/150px-Gold_Ingot.png';
import ironBlock from '../assets/building/minerals/150px-Block_of_Iron.png';
import ironIngot from '../assets/materials/150px-Iron_Ingot.png';
import diamondBlock from '../assets/building/minerals/150px-Block_of_Diamond.png';
import diamondIngot from '../assets/materials/150px-Diamond.png';
import emeraldBlock from '../assets/building/minerals/150px-Block_of_Emerald.png';
import emeraldIngot from '../assets/materials/150px-Emerald.png';
import lapisBlock from '../assets/building/minerals/150px-Lapis_Lazuli_Block.png';
import lapisIngot from '../assets/materials/150px-Lapis_Lazuli.png';

/**
 * Check the block
 * @param eventMineral: String (the id of the clicked image)
 */
export function mineralCheckBlock(eventMineral) {

    if (eventMineral==="gold") {
        return goldBlock;
    } else if(eventMineral==="iron") {
        return ironBlock;
    } else if(eventMineral==="diamond") {
        return diamondBlock;
    } else if(eventMineral==="emerald") {
        return emeraldBlock;
    } else  {
        return lapisBlock;
    }
}

/**
 * Check the ingot
 * @param eventMineral: String (the id of the clicked image)
 */
export function mineralCheckIngot(eventMineral) {

    if (eventMineral==="gold") {
        return goldIngot;
    } else if(eventMineral==="iron") {
        return ironIngot;
    } else if(eventMineral==="diamond") {
        return diamondIngot;
    } else if(eventMineral==="emerald") {
        return emeraldIngot;
    } else  {
        return lapisIngot;
    }
}