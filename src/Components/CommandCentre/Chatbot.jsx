import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';


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
        "region": "us-east-1",
        "contentType": 'audio/x-l16; sample-rate=16000',
        "accept": 'audio/mpeg'
      },
    }
  }
});

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};
const customVoiceConfig = {
  silenceDetectionConfig: {
      time: 2000,
      amplitude: 0.2
  }   
}

class LexBot extends Component {
  handleComplete(err,confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    console.log(confirmation)
    return "'Trip booked. Thank you! what would you like to do next?'";
  }

  render() {
    return (
      <div className="App">
        <ChatBot
          title="My Bot"
          theme={myTheme}
          botName="ARBOT"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={false}
          conversationModeOn={false}
          voiceEnabled={true}
          voiceConfig={customVoiceConfig}
        />
      </div>
    );
  }
}




export default LexBot;