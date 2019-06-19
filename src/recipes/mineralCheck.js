// Import block and ingot images
import goldBlock from '../assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from '../assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from '../assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from '../assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from '../assets/building/minerals/150px-Lapis_Lazuli_Block.png';
import goldIngot from '../assets/materials/150px-Gold_Ingot.png';
import ironIngot from '../assets/materials/150px-Iron_Ingot.png';
import diamondIngot from '../assets/materials/150px-Diamond.png';
import emeraldIngot from '../assets/materials/150px-Emerald.png';
import lapisIngot from '../assets/materials/150px-Lapis_Lazuli.png';

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
