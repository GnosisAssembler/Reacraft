import React, { Component } from 'react';
import '../../css/FurnaceTable.css';
import arrowFurnace from '../../img/arrow-furnace.JPG';
import fireFurnace from '../../img/fire-furnace.JPG';

class FurnaceTable extends Component {
    render() {
        return (
        <div className="FurnaceTable">
            <table>
                <tr>
                    <td>{this.props.input1}</td>
                </tr>
                <tr>
                    <td><img src={fireFurnace} alt="input-material" width="36px;"/></td>
                </tr>
                <tr>
                    <td>{this.props.input2}</td>
                </tr>
            </table>

            <img src={arrowFurnace} alt="crafting-arrow" height="42px;" id="arrow-furnace"/>

            <table>
                <tr>{this.props.output}</tr>
            </table>
        </div>
        );
    }

}

export default FurnaceTable;
