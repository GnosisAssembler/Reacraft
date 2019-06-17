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
 * Check the block
 * @param itemPressed: String (the id of the clicked image)
 * @return_values *: Objects(images, - first the recipe items, then the output)
 */
export function mineralCheck(itemPressed) {

    if (itemPressed==="gold") {
        return [goldIngot, goldBlock];
    } else if(itemPressed==="iron") {
        return [ironIngot, ironBlock];
    } else if(itemPressed==="diamond") {
        return [diamondIngot, diamondBlock];
    } else if(itemPressed==="emerald") {
        return [emeraldIngot, emeraldBlock];
    } else  {
        return [lapisIngot, lapisBlock];
    }
}
