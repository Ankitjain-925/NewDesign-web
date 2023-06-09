import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Grid';
import { getLanguage } from 'translations/index';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      color: this.props.color,
      backgroundColor: this.props.backgroundColor,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.label !== this.props.label ||
      prevProps.color !== this.props.color ||
      prevProps.backgroundColor !== this.props.backgroundColor
    ) {
      this.setState({
        color: this.props.color,
        backgroundColor: this.props.backgroundColor,
        label: this.props.label,
      });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { edit, Delete } = translate;
    return (
      <Grid className="">
        {this.state.label && (
          <Grid
            className={this.props.viewImage ? 'spcMgntUpr' : 'otherPageSpc'}
          >
            {this.props.viewImage ? (
              <Grid container direction="row">
                <Grid item xs={6} md={6} className="specialitybutton-parent">
                  <Button
                    className={
                      this.props.showActive
                        ? 'specialitybutton acitveButton'
                        : 'specialitybutton'
                    }
                    style={{
                      color: this.state.color,
                      backgroundColor: this.state.backgroundColor,
                    }}
                    variant="contained"
                  >
                    {this.state.label}{' '}
                    {this.props.showActive && <span>(current)</span>}
                  </Button>
                  {/* {this.props.showActive && <span>(current)</span>} */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  className="spcMgntRght7 presEditDot scndOptionIner"
                >
                  <a className="openScndhrf">
                    <img
                      src={require('assets/images/three_dots_t.png')}
                      alt=""
                      title=""
                      className="openScnd specialuty-more"
                    />
                    <ul>
                      <li>
                        <a
                          onClick={() => {
                            this.props.onClick();
                          }}
                        >
                          <img
                            src={require('assets/images/details.svg')}
                            alt=""
                            title=""
                          />
                          {edit}
                        </a>
                        <a
                          onClick={() => {
                            this.props.deleteClick();
                          }}
                        >
                          <img
                            src={require('assets/images/details.svg')}
                            alt=""
                            title=""
                          />
                          {Delete}
                        </a>
                      </li>
                    </ul>
                  </a>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row">
                <Grid>
                  <Button
                    className={
                      this.props.showActive
                        ? 'specialitybutton acitveButton'
                        : 'specialitybutton'
                    }
                    onClick={this.props.onClick}
                    style={{
                      color: this.state.color,
                      backgroundColor: this.state.backgroundColor,
                    }}
                    variant="contained"
                  >
                    {this.state.label}{' '}
                    {this.props.showActive && <span>(current)</span>}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
export default Index;
