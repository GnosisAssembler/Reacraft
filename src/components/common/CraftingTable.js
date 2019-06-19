import React, { Component } from 'react';
import '../../css/CraftingTable.css';

// Import tables
import ClassicTable from './ClassicTable';
import FurnaceTable from './FurnaceTable';

class CraftingTable extends Component {
    render() {

        // render CraftingRows only if state is not empty
        if (this.props.isStateFull) {

            // render FurnaceTable if the item crafted is a furnace one
            if (this.props.isFurnace) {
                return (
                    <div className="CraftingTable">
            
                        <FurnaceTable 
                            input1={<img src={this.props.firstMaterial} alt="input-material" width="36px;"/>}
                            input2={<img src={this.props.secondMaterial} alt="input-material" width="36px;"/>}
                            output={<img src={this.props.resultMaterial} alt="output-material" width="36px;"/>}
                        />
            
                        <img src={this.props.resultMaterial} alt="big-output" width="100px;" height="100px;" id="big-output"/>
                    </div>
                );
            } else {
                return (
                    <div className="CraftingTable">
            
                        <ClassicTable 
                            input1={<img src={this.props.firstMaterial} alt="input-material" width="36px;"/>}
                            input2={<img src={this.props.secondMaterial} alt="input-material" width="36px;"/>}
                            input3={<img src={this.props.thirdMaterial} alt="input-material" width="36px;"/>}
                            input4={<img src={this.props.fourthMaterial} alt="input-material" width="36px;"/>}
                            input5={<img src={this.props.fifthMaterial} alt="input-material" width="36px;"/>}
                            input6={<img src={this.props.sixthMaterial} alt="input-material" width="36px;"/>}
                            input7={<img src={this.props.seventhMaterial} alt="input-material" width="36px;"/>}
                            input8={<img src={this.props.eighthMaterial} alt="input-material" width="36px;"/>}
                            input9={<img src={this.props.ninthMaterial} alt="input-material" width="36px;"/>}
                            output={<img src={this.props.resultMaterial} alt="output-material" width="36px;"/>}
                        />
            
                        <img src={this.props.resultMaterial} alt="big-output" width="100px;" height="100px;" id="big-output"/>
                    </div>
                );
            }

        } else {
            return(
                <div>
                    <p>PLZ SELECT AN ITEM TO SEE HOW IT IS CRAFTED =)</p> 
                </div>
            );
        }
    }
        
}

export default CraftingTable;
