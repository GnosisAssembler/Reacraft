// Import block and material images
import stoneBrickBlock from '../assets/building/stone/150px-Stone_Bricks.png';
import mossyStoneBlock from '../assets/building/stone/150px-Mossy_Stone_Bricks.png';
import mossyCobbleBlock from '../assets/building/stone/150px-Mossy_Cobblestone.png';
import crackedStoneBlock from '../assets/building/stone/150px-Cracked_Stone_Bricks.png';
import chiseledStoneBlock from '../assets/building/stone/150px-Chiseled_Stone_Bricks.png';
import smoothStone from '../assets/building/stone/150px-Stone.png'
import cobbleStone from '../assets/building/stone/150px-Cobblestone.png';
import vines from '../assets/miscellaneous/150px-Vines.png';
import stoneBrickSlabs from '../assets/building/slabs/150px-Stone_Brick_Slab.png';
import emptyBlock from '../img/150px-Empty-Block.png';

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
