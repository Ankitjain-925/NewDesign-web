import React, { Component } from "react";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Grid from '@material-ui/core/Grid';

class Index extends Component {
  static defaultProps = {
    isCombineEnabled: false
  };

  state = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial)
  };

  boardRef;

  onDragEnd = result => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      this.setState({ columns });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination
    });

    this.setState({
      columns: data.quoteMap
    });
  };

  render() {
    const columns = this.state.columns;
    const ordered = this.state.ordered;
    const board = (
      <div className={this.props.view === 'vertical' ? "dragdrop-vertical":"dragdrop-horizontal"}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        isCombineEnabled="false"
      >
        
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul>
            {ordered.map((key, index) => (
              <li>
                <div className="detailInfo">
                  <Column
                    key={key}
                    index={index}
                    title={key}
                    quotes={columns[key]}
                    isCombineEnabled={this.props.isCombineEnabled}
                    view={this.props.view}
                  />
                </div>
              </li>
              
            ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
            {board}
        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default Index;