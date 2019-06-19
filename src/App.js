import React, { Component } from 'react';
import './App.css';

// Import basic components
import CraftingTable from './components/crafting/CraftingTable';

// Import category Components
import Mineral from './components/Mineral';
import Stone from './components/Stone';
import Carpet from './components/Carpet';
import Concrete from './components/Concrete';
import Desert from './components/Desert';
import Misc from './components/Misc';

// Import recipes
import { furnaceCheck } from './recipes/furnaceCheck';

import { mineralCheck } from './components/Mineral';
import { stoneCheck } from './components/Stone';
import { carpetCheck } from './components/Carpet';
import { concreteCheck } from './components/Concrete';
import { desertCheck } from './components/Desert';
import { miscCheck } from './components/Misc';

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

    this.handleRecipe = this.handleRecipe.bind(this);
  }

  // Change the state at once
  changeState(recipeCheck, isFurnaceTable) {
    // Set state
    this.setState({
      item1: recipeCheck[0],
      item2: recipeCheck[1],
      item3: recipeCheck[2],
      item4: recipeCheck[3],
      item5: recipeCheck[4],
      item6: recipeCheck[5],
      item7: recipeCheck[6],
      item8: recipeCheck[7],
      item9: recipeCheck[8],
      result: recipeCheck[9], 
      isFurnace: isFurnaceTable
    });
  }

  // handleRecipe event
  handleRecipe(e) {
    const id = e.target.id; //get id of image clicked

    // Check for item categories
    if(id.substring(0,1)==="1") {
      // call mineralCheck
      const check = mineralCheck(id);
      this.changeState(check, false);
      
    } else if(id.substring(0,1)==="2") {
      // call stoneCheck
      const check = stoneCheck(id);
      this.changeState(check, false);

    } else if (id.substring(0,1)==="f") {
      // call furnaceCheck
      const check = furnaceCheck(id);
      this.changeState(check, true);

    } else if(id.substring(0,1)==="3") {
      // call carpetCheck
      const check = carpetCheck(id);
      this.changeState(check, false);

    } else if(id.substring(0,1)==="4") {
      // call concreteCheck
      const check = concreteCheck(id);
      this.changeState(check, false);

    } else if(id.substring(0,1)==="5") {
      // call desertCheck
      const check = desertCheck(id);
      this.changeState(check, false);

      //? TEST MISC COMPONENT
    } else if(id==="test") {
       // call miscCheck
       const check = miscCheck(id);
       this.changeState(check, false);
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
        <Mineral 
          handleRecipeChange={this.handleRecipe}
        />

        <h3>Stone</h3>
        <Stone 
          handleRecipeChange={this.handleRecipe}
        />

        <h3>Carpets</h3>
        <Carpet 
          handleRecipeChange={this.handleRecipe}
        />

        <h3>Concrete</h3>
        <Concrete 
          handleRecipeChange={this.handleRecipe}
        />

        <h3>Desert</h3>
        <Desert 
          handleRecipeChange={this.handleRecipe}
        />

        <h3>TEST MISC COMPONENT</h3>
        <Misc 
          handleRecipeChange={this.handleRecipe}
        />
      
      </div>
    );
  }

}

export default App;
