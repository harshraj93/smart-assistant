
import React, { Component } from 'react'
import Chart from "chart.js";

const colorArray = ['#ADDBFC', '#FFC000', '#FFFFFF', '#D7FB51'];
class Graph extends Component {
    chartRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            productionData: {},
        }
    }
    parseGraphsData = (inputJSON) => {

        if (inputJSON) {
            let graphOptions ={
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 10,
                        
                    },
                    position : "bottom"
                },
                scales: {
                    xAxes:[{
                        ticks:{
                            fontColor: "white",
                            fontSize : 12
                        },
                        gridLines:{
                            color:'',
                            zeroLineColor: 'white'
                        }
                       
                    }],
                    yAxes:[{
                        ticks:{
                            fontColor: "white",
                            fontSize : 12
                        },
                        gridLines:{
                            color:'',
                            zeroLineColor: 'white'
                        }
                    }]
                  }
                
            }
            let graphData = {
                type: 'line',
                data: {
                    datasets: [],
                    labels: inputJSON.labels
                },
                options:graphOptions
              
            };
            let graphDataJSON = {};

            inputJSON.datasets.forEach((element,index) => {
             
                graphDataJSON = {
                    label: element.label,
                    fill: false,
                    data: Object.values(element.data),
                    backgroundColor: colorArray[index],
                    borderColor: colorArray[index],
                    borderWidth: 3,
                    type: 'line'
                };
                graphDataJSON.data.sort();
                graphData.data.datasets.push(graphDataJSON);
                graphDataJSON = {};
            });
            this.setState({
                productionData: {},
            })
            this.setState({
                productionData: graphData,
            })
            this.renderChart(graphData);
        }
    }
    componentDidMount(){
        this.parseGraphsData(this.props.data);
    }

    componentWillReceiveProps(newProps) {
        if( newProps.data !== this.props.data )
            this.parseGraphsData(newProps.data);
    }

    renderChart = (data) => {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, data);
    }
    render() {
        return (
            <div className='chart-container'>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
export default Graph;