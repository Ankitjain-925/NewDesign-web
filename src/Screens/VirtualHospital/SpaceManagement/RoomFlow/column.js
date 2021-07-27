import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class Column extends Component {
  render() {
    const title = this.props.title;
    const quotes = this.props.quotes;
    const index = this.props.index;

    return (


      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>


            <Grid className="drList2">
              <div isDragging={snapshot.isDragging}>
                <Grid isDragging={snapshot.isDragging}
                  {...provided.dragHandleProps}>
                  {this.props.view === 'vertical' ?
                    <div>
                      {/* <Grid><label>{title}</label></Grid> */}

                      <Grid className="roomNum2">
                        <Grid container direction="row">
                          <Grid item xs={6} md={6}>
                            <Button variant="contained">{title}</Button>
                          </Grid>
                          {console.log("title", title)}
                          {/* <Grid className="checkDotsRght"><img src={require('assets/virtual_images/threeDots.png')} alt="" title="" /></Grid> */}
                          <Grid item xs={6} md={6} className="bedArnge">
                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                          </Grid>
                        </Grid>
                      </Grid>

                    </div> :
                    <Grid className="receLbl">
                      <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={6}><label>{title}</label></Grid>
                        <Grid item xs={12} sm={6} md={6} className="addPatent">
                          <a className="addNwPatnt">+ Add patient </a>
                          <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                        </Grid>
                      </Grid>
                    </Grid>



                  }
                </Grid>
              </div>
              <Grid className="drListMain2">
                <Grid className="drListLft2">
                  <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                  <span>1</span>
                </Grid>
                {this.props.view === 'vertical' && <Grid className="drListRght2"><Button>Move patient here </Button> </Grid>}
              </Grid>

              <Grid className="drListMain2">
                <Grid className="drListLft2">
                  <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                  <span>1</span>
                </Grid>
                {this.props.view === 'vertical' && <Grid className="drListRght2"><Button>Move patient here </Button> </Grid>}
              </Grid>

              <Grid className="drListMain2">
                <Grid className="drListLft2">
                  <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                  <span>1</span>
                </Grid>
                {this.props.view === 'vertical' && <Grid className="drListRght2"><Button>Move patient here </Button> </Grid>}
              </Grid>

              <Grid className="drListMain2">
                <Grid className="drListLft2">
                  <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                  <span>1</span>
                </Grid>
                {this.props.view === 'vertical' && <Grid className="drListRght2"><Button>Move patient here </Button> </Grid>}
              </Grid>

              <QuoteList
                listId={title}
                listType="QUOTE"
                style={{
                  backgroundColor: snapshot.isDragging ?
                    "#baf" : null
                }}
                view={this.props.view}
                quotes={quotes}
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              />
              {/* {this.props.view === 'vertical' && <Grid className="drListRght2"><Button>Move patient here </Button> </Grid>} */}
            </Grid>




          </div>
        )}
      </Draggable>



    );
  }
}
