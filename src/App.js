import React, { Component } from 'react';
import './App.css';

// Import basic images
import goldBlock from './assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from './assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from './assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from './assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from './assets/building/minerals/150px-Lapis_Lazuli_Block.png';

import stoneBrickBlock from './assets/building/stone/150px-Stone_Bricks.png';
import mossyStoneBlock from './assets/building/stone/150px-Mossy_Stone_Bricks.png';
import mossyCobbleBlock from './assets/building/stone/150px-Mossy_Cobblestone.png';
import crackedStoneBlock from './assets/building/stone/150px-Cracked_Stone_Bricks.png';
import chiseledStoneBlock from './assets/building/stone/150px-Chiseled_Stone_Bricks.png';

import blackCarpet from './assets/building/carpets/150px-Black_Carpet.png';
import blueCarpet from './assets/building/carpets/150px-Blue_Carpet.png';
import cyanCarpet from './assets/building/carpets/150px-Cyan_Carpet.png';
import grayCarpet from './assets/building/carpets/150px-Gray_Carpet.png';
import greenCarpet from './assets/building/carpets/150px-Green_Carpet.png';
import lightBlueCarpet from './assets/building/carpets/150px-Light_Blue_Carpet.png';
import lightGrayCarpet from './assets/building/carpets/150px-Light_Gray_Carpet.png';
import magentaCarpet from './assets/building/carpets/150px-Magenta_Carpet.png';
import orangeCarpet from './assets/building/carpets/150px-Orange_Carpet.png';
import pinkCarpet from './assets/building/carpets/150px-Pink_Carpet.png';
import purpleCarpet from './assets/building/carpets/150px-Purple_Carpet.png';
import redCarpet from './assets/building/carpets/150px-Red_Carpet.png';
import whiteCarpet from './assets/building/carpets/150px-White_Carpet.png';
import yellowCarpet from './assets/building/carpets/150px-Yellow_Carpet.png';

import blackConcretePowder from './assets/building/concrete/150px-Black_Concrete_Powder.png';
import blueConcretePowder from './assets/building/concrete/150px-Blue_Concrete_Powder.png';
import cyanConcretePowder from './assets/building/concrete/150px-Cyan_Concrete_Powder.png';
import grayConcretePowder from './assets/building/concrete/150px-Gray_Concrete_Powder.png';
import limeConcretePowder from './assets/building/concrete/150px-Lime_Concrete_Powder.png';
import lightBlueConcretePowder from './assets/building/concrete/150px-Light_Blue_Concrete_Powder.png';
import lightGrayConcretePowder from './assets/building/concrete/150px-Light_Gray_Concrete_Powder.png';
import magentaConcretePowder from './assets/building/concrete/150px-Magenta_Concrete_Powder.png';
import orangeConcretePowder from './assets/building/concrete/150px-Orange_Concrete_Powder.png';
import pinkConcretePowder from './assets/building/concrete/150px-Pink_Concrete_Powder.png';
import purpleConcretePowder from './assets/building/concrete/150px-Purple_Concrete_Powder.png';
import redConcretePowder from './assets/building/concrete/150px-Red_Concrete_Powder.png';
import brownConcretePowder from './assets/building/concrete/150px-Brown_Concrete_Powder.png';
import yellowConcretePowder from './assets/building/concrete/150px-Yellow_Concrete_Powder.png';

import sandstone from './assets/building/dessert/150px-Sandstone.png';
import chiseledSandstone from './assets/building/dessert/150px-Chiseled_Sandstone.png';
import cutSandstone from './assets/building/dessert/150px-Cut_Sandstone.png';
import smoothSandstone from './assets/building/dessert/150px-Smooth_Sandstone.png';

// Import basic components
import CraftingTable from './components/crafting/CraftingTable';

// Import recipes
import { mineralCheck } from './recipes/mineralCheck';
import { stoneCheck } from './recipes/stoneCheck';
import { furnaceCheck } from './recipes/furnaceCheck';
import { carpetCheck } from './recipes/carpetCheck';
import { concreteCheck } from './recipes/concreteCheck';
import { desertCheck } from './recipes/desertCheck';

//? TEST MISC COMPONENT FOR UPDATING STATE FROM THE CHILD
import Misc from './components/Misc';

class App extends Component {
  constructor(props) {
    super(props);
    // 10 items - 9 for the crafting slots and 1 for the result
    // isFurnace: if the item crafted needs a furnace or not
    this.state = { 
        item1: "",
        item2: "",
        item3: "",
        item4: "",
        item5: "",
        item6: "",
        item7: "",
        item8: "",
        item9: "",
        result: "" ,
        isFurnace: false
    };
  }

  // handleRecipe event
  handleRecipe(e) {
    const id = e.target.id; //get id of image clicked

    // Check for item categories
    if(id.substring(0,1)==="1") {
      // call mineralCheck
      const check = mineralCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9], 
        isFurnace: false
      });
    } else if(id.substring(0,1)==="2") {
      // call stoneCheck
      const check = stoneCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9],
        isFurnace: false
      });
    } else if (id.substring(0,1)==="f") {
      // call furnaceCheck
      const check = furnaceCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        result: check[2], 
        isFurnace: true
      });
    } else if(id.substring(0,1)==="3") {
      // call carpetCheck
      const check = carpetCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9],
        isFurnace: false
      });
    } else if(id.substring(0,1)==="4") {
      // call concreteCheck
      const check = concreteCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9],
        isFurnace: false
      });
    } else if(id.substring(0,1)==="5") {
      // call desertCheck
      const check = desertCheck(id);
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9],
        isFurnace: false
      });
      //? TEST MISC COMPONENT
    } else if(id==="test") {
      console.log("huuuureeeey");
    } 
    
  }
  
  render() {

    // Check if the state is full and pass it as a prop to CraftingTable
    // for conditional rendering
    let isStateFull = false;
    if (this.state.item1==="") {
      isStateFull = false;
    } else {
      isStateFull = true;
    }

    return (
      <div className="App">
        <h1>Crafting Guide</h1>

        <div>
          <CraftingTable 
            firstMaterial={this.state.item1}
            secondMaterial={this.state.item2}
            thirdMaterial={this.state.item3}
            fourthMaterial={this.state.item4}
            fifthMaterial={this.state.item5}
            sixthMaterial={this.state.item6}
            seventhMaterial={this.state.item7}
            eighthMaterial={this.state.item8}
            ninthMaterial={this.state.item9}
            resultMaterial={this.state.result}
            isStateFull={isStateFull}
            isFurnace={this.state.isFurnace}
          />
        </div>

        <h2>Building</h2>

        {/**Each item has a unique id with the number(or letter) of its category in front of it */}
        <h3>Minerals</h3>
        <img src={goldBlock} alt="gold-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-gold"/>
        <img src={ironBlock} alt="iron-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-iron"/>
        <img src={diamondBlock} alt="diamond-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-diamond"/>
        <img src={emeraldBlock} alt="emerald-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-emerald"/>
        <img src={lapisBlock} alt="lapis-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-lapis"/>

        <h3>Stone</h3>
        <img src={stoneBrickBlock} alt="stoneBrick" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-stoneBrick"/>
        <img src={mossyStoneBlock} alt="mossyStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-mossyStone"/>
        <img src={mossyCobbleBlock} alt="mossyCobble" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-mossyCobble"/>
        <img src={chiseledStoneBlock} alt="chiseledStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-chiseledStone"/>
        <img src={crackedStoneBlock} alt="crackedStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="f-crackedStone"/>

        <h3>Carpets</h3>
        <img src={blackCarpet} alt="blackCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-blackCarpet"/>
        <img src={blueCarpet} alt="blueCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-blueCarpet"/>
        <img src={cyanCarpet} alt="cyanCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-cyanCarpet"/>
        <img src={grayCarpet} alt="grayCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-grayCarpet"/>
        <img src={greenCarpet} alt="greenCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-greenCarpet"/>
        <img src={lightBlueCarpet} alt="lightBlueCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-lightBlueCarpet"/>
        <img src={lightGrayCarpet} alt="lightGrayCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-lightGrayCarpet"/>
        <img src={magentaCarpet} alt="magentaCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-magentaCarpet"/>
        <img src={orangeCarpet} alt="orangeCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-orangeCarpet"/>
        <img src={pinkCarpet} alt="pinkCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-pinkCarpet"/>
        <img src={purpleCarpet} alt="purpleCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-purpleCarpet"/>
        <img src={redCarpet} alt="redCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-redCarpet"/>
        <img src={whiteCarpet} alt="whiteCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-whiteCarpet"/>
        <img src={yellowCarpet} alt="yellowCarpet" width="36px;" onClick={this.handleRecipe.bind(this)} id="3-yellowCarpet"/>

        <h3>Concrete</h3>
        <img src={blackConcretePowder} alt="blackConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-blackConcretePowder"/>
        <img src={blueConcretePowder} alt="blueConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-blueConcretePowder"/>
        <img src={cyanConcretePowder} alt="cyanConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-cyanConcretePowder"/>
        <img src={grayConcretePowder} alt="grayConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-grayConcretePowder"/>
        <img src={limeConcretePowder} alt="limeConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-limeConcretePowder"/>
        <img src={lightBlueConcretePowder} alt="lightBlueConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-lightBlueConcretePowder"/>
        <img src={lightGrayConcretePowder} alt="lightGrayConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-lightGrayConcretePowder"/>
        <img src={magentaConcretePowder} alt="magentaConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-magentaConcretePowder"/>
        <img src={orangeConcretePowder} alt="orangeConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-orangeConcretePowder"/>
        <img src={pinkConcretePowder} alt="pinkConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-pinkConcretePowder"/>
        <img src={purpleConcretePowder} alt="purpleConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-purpleConcretePowder"/>
        <img src={redConcretePowder} alt="redConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-redConcretePowder"/>
        <img src={brownConcretePowder} alt="brownConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-brownConcretePowder"/>
        <img src={yellowConcretePowder} alt="yellowConcretePowder" width="36px;" onClick={this.handleRecipe.bind(this)} id="4-yellowConcretePowder"/>

        <h3>Desert</h3>
        <img src={sandstone} alt="sandstone" width="36px;" onClick={this.handleRecipe.bind(this)} id="5-sandstone"/>
        <img src={chiseledSandstone} alt="chiseledSandstone" width="36px;" onClick={this.handleRecipe.bind(this)} id="5-chiseledSandstone"/>
        <img src={cutSandstone} alt="cutSandstone" width="36px;" onClick={this.handleRecipe.bind(this)} id="5-cutSandstone"/>
        <img src={smoothSandstone} alt="smoothSandstone" width="36px;" onClick={this.handleRecipe.bind(this)} id="5-smoothSandstone"/>

        <h3>TEST MISC COMPONENT</h3>
        <Misc 
          handleRecipeChange={this.handleRecipe}
        />
      
      </div>
    );
  }

}

export default App;
