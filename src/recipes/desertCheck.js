// Import block and material images
import sand from '../assets/materials/150px-Sand.png';
import sandstone from '../assets/building/dessert/150px-Sandstone.png';
import chiseledSandstone from '../assets/building/dessert/150px-Chiseled_Sandstone.png';
import cutSandstone from '../assets/building/dessert/150px-Cut_Sandstone.png';
import smoothSandstone from '../assets/building/dessert/150px-Smooth_Sandstone.png';
import sandstoneSlab from '../assets/building/slabs/150px-Sandstone_Slab.png';
import emptyBlock from '../img/150px-Empty-Block.png';


/**
 * Create desert recipes
 * @param itemPressed: String (the id of the clicked image)
 * @return array[recipe-item,...,result-item]
 */
export function desertCheck(itemPressed) {

    if (itemPressed==="5-sandstone") {
        return [sand,sand,emptyBlock,sand, sand, emptyBlock,emptyBlock, emptyBlock,emptyBlock, sandstone];
    } else if (itemPressed==="5-chiseledSandstone") {
        return [emptyBlock,emptyBlock,emptyBlock,emptyBlock,sandstoneSlab,emptyBlock,emptyBlock,sandstoneSlab,emptyBlock,chiseledSandstone ];
    } else if (itemPressed==="5-cutSandstone") {
        return [sandstone, sandstone, emptyBlock,sandstone, sandstone, emptyBlock,emptyBlock,emptyBlock,emptyBlock,smoothSandstone];
    } else if (itemPressed==="5-smoothSandstone") {
        return [sand,sand,emptyBlock,sand, sand, emptyBlock,emptyBlock, emptyBlock,emptyBlock, sandstone];
    }
}
