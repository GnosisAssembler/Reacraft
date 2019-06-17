import React, { Component } from 'react';
import '../../css/CraftingRows.css';
import arrow from '../../img/arrow.JPG';

class CraftingRows extends Component {
    render() {
        return (
        <div className="CraftingRows">
            <table>
                <tr>
                    <td>{this.props.input1}</td>
                    <td>{this.props.input2}</td>
                    <td>{this.props.input3}</td>
                </tr>
                <tr>
                    <td>{this.props.input4}</td>
                    <td>{this.props.input5}</td>
                    <td>{this.props.input6}</td>
                </tr>
                <tr>
                    <td>{this.props.input7}</td>
                    <td>{this.props.input8}</td>
                    <td>{this.props.input9}</td>
                </tr>
            </table>

            <img src={arrow} alt="crafting-arrow" height="42px;" id="arrow"/>

            <table>
                <tr>{this.props.output}</tr>
            </table>
        </div>
        );
    }

}

export default CraftingRows;
