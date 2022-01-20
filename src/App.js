// src/App.js
import React from 'react';

// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'

// import query definition
import { listLanguages as ListLanguages } from './graphql/queries'
import {Dropdown} from 'semantic-ui-react'

//import Select from 'react-select';
//import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  // define some state to hold the data returned from the API

  state = {
    languages: []
  }
  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      const languageData = await API.graphql(graphqlOperation(ListLanguages))
      console.log('languageData:', languageData)
      this.setState({
        languages: languageData.data.listLanguages.items
      })
    } catch (err) {
      console.log('error fetching languages...', err)
    }
  }
  render() {
    return (
      <>
        {
           <Dropdown
          placeholder='Select Language'
           fluid
           search
           selection
           options={ this.state.languages.map((language) =>
            <option key={language.value} value={language.name}>{language.name}
            </option>)}
             />
            }    
          </>    
        )   
      }   
    }
    export default App