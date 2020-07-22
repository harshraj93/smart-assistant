import React, { useEffect, Component } from 'react';
import Graph from './Graph'
import Amplify, { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui';
import ZeniChatLogo from '../../img/zeniChat.png';
import Mic from '../../img/mic.png'
import { withRouter } from "react-router-dom";
import Table from './TableComponent';
import Speech from 'react-speech';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {

  const { transcript, listening } = useSpeechRecognition()
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' })
  }

  useEffect(() => {
    props.setSpeechInput(transcript);
  }, [!listening && transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  return (
    <div className='input-container'>
      <input
        onKeyPress={props.onKeyPress}
        onChange={props.onChange.bind(this)}
        value={props.input}
        placeholder={props.placeholder}
      />
      <img className='mic-btn' src={Mic} onClick={startListening} alt='mic'></img>
    </div>
  )
}

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-1:830415a5-dccd-4e4c-ae73-87ae3c60b7c3",
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "ARBOT": {
        "name": "ARBOT",
        "alias": "ARTest",
        "region": "us-east-1"
      },
    }
  }
});

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 20,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10,
      backgroundColor: 'transparent',
    }
  },
}
const speechStyle = {
  play: {
    button: {
      width: '28',
      height: '28',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'yellow',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    },
  }
};


class CommandCentre extends Component {
  state = {
    input: '',
    finalMessage: 'Hi, I am Zeni. I can help you with operational data for machines. Type in to get data for machines, plot graphs or view digital twin.',
    placeholder: 'Start Typing here..',
    messages: [
      new Message({
        id: 1,
        message: '',
      })
    ],
    graphData: {
      "labels": [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5"
      ],
      "datasets": [
        {
          "label": "Planned",
          "data": [
            950,
            800,
            1000,
            900,
            990
          ]
        },
        {
          "label": "Actual",
          "data": [
            760,
            785,
            982,
            895,
            975
          ]
        },
        {
          "label": "Efficiency",
          "data": [
            80,
            98.15,
            98.2,
            99.44,
            98.48
          ]
        }
      ]
    },
    tableData: {
      headers: [
        "Time",
        "Pump Efficiency",
        "Drive Efficiency",
        "Motor Efficiency"
      ],
      tableContent: [
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        },
        {
          time: "11.20",
          pump: 60,
          drive: 80,
          motor: 90
        }
      ]
    }
  }
  componentDidMount(){
  document.getElementsByClassName('rs-play')[0].click()
  }
  _handleKeyPress = (e) => {
    if (e === 'Enter' || e.key === 'Enter') {
      this.submitMessage()
    }
  }
  onChange(e) {
    const input = e.target.value;
    this.setState({
      input
    })
  }
  setSpeechInput = (value) => {
    const input = value;
    this.setState({
      input
    })
    if (value && value !== '')
      this.submitMessage(value);
  }
  async submitMessage(value) {
    let input;
    if (this.state.input === "") {
      input = value
    }
    else {
      input = this.state.input
    }

    // if (input === '') return
    const message = new Message({
      id: 0,
      message: input,
    })
    let messages = [...this.state.messages, message]
    this.setState({
      messages,
      input: ''
    })
    let parsedMessage = '';
    const response = await Interactions.send("ARBOT", input);
    try {
      if (response.slots.graph) {
        if (response.slots.graph.toLowerCase() === 'plot') {
          let parsedJSON = JSON.parse(response.message);
          parsedMessage = parsedJSON.message
          this.formatLabelandData(parsedJSON.graphData);
          this.formatTableData(parsedJSON.graphData);
        }
        else if (response.slots.graph.toLowerCase() === 'show') {
          this.props.history.push({ pathname: '/digitalTwin' });
        }
      }
    } catch (e) {

    }
    const responseMessage = new Message({
      id: 1,
      message: parsedMessage ? parsedMessage : response.message,
    })
    messages = [...this.state.messages, responseMessage]
    this.setState({ 
      messages:messages,
      finalMessage:parsedMessage ? parsedMessage : response.message
     })
     document.getElementsByClassName('rs-play')[0].click()
  }

  formatLabelandData(data) {
    let formattedData = {
      labels: [],
      datasets: []
    };
    for (let i = 0; i < data.length; i++) {
      let plotData = { label: "", data: [] }
      plotData.label = data[i].label
      let dataPoints = [];
      let timeInterval = [];
      for (let j = 0; j < data[i].datasets.length; j++) {
        dataPoints[j] = data[i].datasets[j].ParameterValue;
        let time = new Date(parseInt(data[i].datasets[j].Timestamp))
        time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        timeInterval[j] = time;
      }
      plotData.data = dataPoints;
      formattedData.datasets.push(plotData);
      formattedData.labels = timeInterval;
    }
    this.setState({
      graphData: formattedData
    })
  }
  formatTableData(tableData) {
    let formattedTableData = {
      headers: ["TIME"],
      tableContent: []
    };
    for (let j = 0; j < tableData.length; j++) {
      formattedTableData.headers.push(tableData[j].label.toUpperCase());
      for (let k = 0; k < tableData[j].datasets.length; k++) {
        if (j === 0) {
          let data = {};
          let time = new Date(parseInt(tableData[j].datasets[k].Timestamp))
          data.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
          data["value" + j] = tableData[j].datasets[k].ParameterValue;
          formattedTableData.tableContent.push(data);
        } else {
          formattedTableData.tableContent[k]["value" + j] = tableData[j].datasets[k].ParameterValue;
        }
      }
    }
    this.setState({
      tableData: formattedTableData
    })
  }
  render() {
    return (
      <div className='main-container'>
        <div className='chatbot-container'>
          <div className="Chatbot">
            <header className='header-container'>
              <img src={ZeniChatLogo} alt='zeni-chat-icon' />
              <p className='header-title'>Hi, I am Zeni. I can help you with operational data for machines. Type in to get data for machines, plot graphs or view digital twin.</p>
            </header>
            <div className='message-container'>
            <Speech 
              // styles={speechStyle} 
              // textAsButton={true}    
              displayText='Hi, I am Zeni. I can help you with operational data for machines. Type in to get data for machines, plot graphs or view digital twin.' 
              text={this.state.finalMessage}
              pitch="0.8"
              rate="0.9"
              volume="0.8"
              lang="en-UK"
              voice='Daniel'/>,
              <ChatFeed
                messages={this.state.messages}
                hasInputField={false}
                bubbleStyles={styles.bubbleStyles}
              />

              <Dictaphone onKeyPress={this._handleKeyPress}
                onChange={this.onChange.bind(this)}
                placeholder={this.state.placeholder}
                input={this.state.input}
                submit={this.submitMessage}
                setSpeechInput={this.setSpeechInput} />
              {/* <Chatbot/> */}
            </div>
          </div>
        </div>
        {/* <Sumerian /> */}
        <div className='table-chart-container'>
          <div className='chart-container'>
            <header className='chart-title'>Custom Chart</header>
            <Graph data={this.state.graphData} />
          </div>
          <div className='table-container'>
            <header className='table-title'>Custom Data Records</header>
            <Table data={this.state.tableData} />

          </div>
          {/* <div></div> */}
        </div>
      </div>
    );
  }
};

export default withRouter(CommandCentre);
