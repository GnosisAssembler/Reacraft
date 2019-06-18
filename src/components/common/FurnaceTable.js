import React, { Component } from 'react';
import '../../css/FurnaceTable.css';
import arrowFurnace from '../../img/arrow-furnace.JPG';
import fireFurnace from '../../img/fire-furnace.JPG';

//? TEST FURNACE TABLE COMPONENT
import testImage from '../../assets/building/end/150px-Purpur_Pillar_Axis_Y.png';

class FurnaceTable extends Component {
    render() {
        return (
        <div className="FurnaceTable">
            {/**? TEST FURNACE COMPONENT */}
            <table>
                <tr>
                    <td><img src={testImage} alt="input-material" width="36px;"/></td>
                </tr>
                <tr>
                    <td><img src={fireFurnace} alt="input-material" width="36px;"/></td>
                </tr>
                <tr>
                    <td><img src={testImage} alt="input-material" width="36px;"/></td>
                </tr>
            </table>

            <img src={arrowFurnace} alt="crafting-arrow" height="42px;" id="arrow-furnace"/>

            <table>
                <tr><img src={testImage} alt="input-material" width="36px;"/></tr>
            </table>
        </div>
        );
    }

}

export default FurnaceTable;
