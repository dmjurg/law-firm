import React from 'react';
import LawSection from '../LawSection';
import {
  Link
} from 'react-router-dom'
import {cicoText} from '../text/cicoText';

class CICO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      matches: [],
      currentMatch: 0,
    };

    this.registerMatch = this.registerMatch.bind(this);
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
      matches: [],
      currentMatch: 0,
    });
  }

  registerMatch(match) {
    if(match) {
      this.state.matches.push(match);
    }

    this.setState({
      matches: this.state.matches,
      currentMatch: 0
    })
  }

  nextMatch = () => {
    const {matches, currentMatch} = this.state;
    const nextMatch = (currentMatch % matches.length) + 1;
    this.setState({
      currentMatch: nextMatch,
    })
    return nextMatch;
  }

  scrollToNextMatch = () => {
    const {matches} = this.state;

    if(matches.length === 0) {
      return;
    }

    const nextMatch = this.nextMatch();
    matches[nextMatch - 1].scrollIntoView();
  }

  render() {
    const {searchText} = this.state;

    return (
      <div className="cico-text">
        <h1>CICO Regulations</h1>
        <div className="search-form">
          <input value={searchText} onChange={this.updateSearchText} />
          <button onClick={this.scrollToNextMatch}>Next</button>
          {this.state.currentMatch} of {this.state.matches.length}
        </div>
        <div className="back-button">
          <Link to="/">Back</Link>
        </div>
        {cicoText.map((section, index) => <LawSection headingText={section.title}
                                             bodyText={section.text}
                                             searchText={searchText}
                                             registerMatch={this.registerMatch}
                                             key={`section-${index}`}
                                           />)}
      </div>
    );
  }
}

export default CICO;
