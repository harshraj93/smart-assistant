import React, { Component } from 'react';

class TableComponent extends Component {
    rowStatus = (value,index) =>{
        if(index!==0){
        if (value < 40){
            return "red";
        } else if (value>=40 && value <=70){
            return "amber";
        }
        else
        return "green";
    }

    }
    render() {
        return (
            <div className='table-content-container'>
                <table >
                    <thead>
                        <tr>
                            {this.props.data.headers.map((item, key) => {
                                return (
                                    <th key={key}>{item}</th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.tableContent.map((item, key) => {
                            return (
                                <tr key={key}>
                                    {
                                        Object.values(item).map((paramValue, index) => {
                                            return (
                                                    <td className={this.rowStatus(paramValue,index)} key={index}>{paramValue}</td>
                                            );
                                        }
                                        )}
                                </tr>
                            );
                        }
                    )}

                    </tbody>
                </table>
            </div>
        );
    }
};

export default TableComponent;