import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import QuoteItem from "./quote-item";


class InnerQuoteList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.quotes !== this.props.quotes || nextProps.view !== this.props.view) {
      return true;
    }

    return false;
  }

  render() {
    return this.props.quotes.map((quote, index) => (
      <Draggable
        key={quote.patient_id}
        draggableId={quote.patient_id}
        index={index}
        shouldRespectForceTouch={false}
      >
        {(dragProvided, dragSnapshot) => (
          <QuoteItem
            columns={this.props.columns}
            ordered={this.props.ordered}
            key={quote.patient_id}
            quote={quote}
            isDragging={dragSnapshot.isDragging}
            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
            provided={dragProvided}
            view={this.props.view}
            onDragEnd={(data)=>{this.props.onDragEnd(data)}}
            setDta={(item)=>this.props.setDta(item)}
          />

        )}
      </Draggable>
    ));
  }
}

class InnerList extends React.Component {
  render() {
    const { quotes, dropProvided } = this.props;
    return (
      <div>
        <div ref={dropProvided.innerRef}>
          <InnerQuoteList  setDta={(item)=>this.props.setDta(item)} columns={this.props.columns} onDragEnd={(data)=>{this.props.onDragEnd(data)}} ordered={this.props.ordered} quotes={quotes}  view={this.props.view}/>
        </div>
      </div>
    );
  }
}

export default class QuoteList extends React.Component {
  static defaultProps = {
    listId: "LIST"
  };
  render() {
    const {
      ignoreContainerClipping,
      internalScroll,
      scrollContainerStyle,
      isDropDisabled,
      isCombineEnabled,
      listId,
      listType,
      style,
      quotes,
      title
    } = this.props;

    return (
      <Droppable
        className="list-z-index"
        droppableId={listId}
        type={listType}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={isCombineEnabled}
      >
        {(dropProvided, dropSnapshot) => (
          <div
            style={style}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={isDropDisabled}
            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <div style={scrollContainerStyle}>
                <InnerList
                  columns={this.props.columns}
                  ordered={this.props.ordered}
                  quotes={quotes}
                  title={title} 
                  dropProvided={dropProvided}
                  view={this.props.view}
                  onDragEnd={(data)=>{this.props.onDragEnd(data)}}
                  setDta={(item)=>this.props.setDta(item)}
                  
                />
              </div>
            ) : (
              <InnerList
                ordered={this.props.ordered}
                columns={this.props.columns}
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
                view={this.props.view}
                onDragEnd={(data)=>{this.props.onDragEnd(data)}}
                setDta={(item)=>this.props.setDta(item)}
              />
            )}
          </div>
        )}
      </Droppable>
    );
  }
}
