import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import tabsConfig from './data/tabs.json';
import './Tabs.css'

class Tabs extends Component {
  state = {
    currentTab: this.props.match.params.number - 1,
    tabsConfigLocal: []
  };

  componentWillMount() {
    this.parseConfig();
  }

  parseConfig() {
    let tabsConfigLocal = tabsConfig.sort((a, b) => a.order - b.order);

    this.setState({
      tabsConfigLocal
    }, () => {
      this.setTabContent();
    })
  }

  setTabContent() {
    let { tabsConfigLocal, currentTab } = this.state;
    console.log(currentTab);

    import(`./${tabsConfigLocal[currentTab]['path']}`)
      .then((component) => {
        let Content = component.default;

        this.setState(prevState => {
          let newTabsConfigLocal = [...prevState.tabsConfigLocal];
          newTabsConfigLocal[currentTab]['content'] = <Content/>;

          return {
            tabsConfigLocal: newTabsConfigLocal
          }
        });
      });
  }

  selectTabHandler(currentIndex) {
    let { tabsConfigLocal } = this.state;

    this.setState({currentTab: currentIndex}, () => {
      if (!tabsConfigLocal[currentIndex]['content']) {
        this.setTabContent()
      }
    });
  }

  render() {
    let { tabsConfigLocal, currentTab } = this.state;

    return (
      <div className="Tabs">
        {
          tabsConfigLocal.map((tab, index) => (
            <Link
              key={index}
              to={`/${index + 1}`}
            >
              <span
                className={(index === currentTab) ? (
                  "Tabs-title checked"
                ) : (
                  "Tabs-title"
                )}
                onClick={() => this.selectTabHandler(index)}
              >
                {tab.title}
              </span>
            </Link>
          ))
        }

        {
          tabsConfigLocal[currentTab]['content'] ? (
            tabsConfigLocal[currentTab]['content']
          ) : (
            <div className="Tabs-container">
              <b>loading ...</b>
            </div>
          )
        }
      </div>
    );
  }
}

export default Tabs;