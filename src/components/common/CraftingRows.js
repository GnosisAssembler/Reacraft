import React, { Component } from 'react';
import '../../css/CraftingRows.css';
import arrow from '../../img/arrow.JPG';

class CraftingRows extends Component {
    render() {
        return (
        <div className="CraftingRows">
            <table>
                <tr>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
                </tr>
                <tr>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
                </tr>
                <tr>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
                    <td>{this.props.input}</td>
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
