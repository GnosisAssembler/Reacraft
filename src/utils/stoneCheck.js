// Import block and ingot images
import stoneBrickBlock from '../assets/building/stone/150px-Stone_Bricks.png';
import mossyStoneBlock from '../assets/building/stone/150px-Mossy_Stone_Bricks.png';
import mossyCobbleBlock from '../assets/building/stone/150px-Mossy_Cobblestone.png';
import crackedStoneBlock from '../assets/building/stone/150px-Cracked_Stone_Bricks.png';
import chiseledStoneBlock from '../assets/building/stone/150px-Chiseled_Stone_Bricks.png';
import smoothStone from '../assets/building/stone/150px-Stone.png'
import cobbleStone from '../assets/building/stone/150px-Cobblestone.png';
import vines from '../assets/miscellaneous/150px-Vines.png';
import stoneBrickSlabs from '../assets/building/slabs/150px-Stone_Brick_Slab.png';

/**
 * Check the block
 * @param itemPressed: String (the id of the clicked image)
 * @return_values *: Objects(images, - first the recipe items, 
*            then the output, then the position of the output)
 */
export function stoneCheck(itemPressed) {

    if (itemPressed==="stoneBrick") {
        return [smoothStone, stoneBrickBlock, 1];
    } else if(itemPressed==="mossyStone") {
        return [stoneBrickBlock, vines, mossyStoneBlock, 2];
    } else if(itemPressed==="mossyCobble") {
        return [cobbleStone, vines, mossyCobbleBlock, 2];
    } else  {
        return [stoneBrickSlabs, chiseledStoneBlock, 1];
    }
}
