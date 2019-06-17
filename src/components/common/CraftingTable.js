import React, { Component } from 'react';
import '../../css/CraftingTable.css';

// Import CraftingRows
import CraftingRows from './CraftingRows';

class CraftingTable extends Component {
    render() {
        return (
        <div className="CraftingTable">

            <CraftingRows 
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

}

export default CraftingTable;
