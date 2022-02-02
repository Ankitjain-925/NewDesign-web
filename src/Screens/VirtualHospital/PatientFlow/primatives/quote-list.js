import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import QuoteItem from "./quote-item";
import { grid } from "../constants";
import styled from "@emotion/styled";

const getBackgroundColor = (isDraggingOver, isDraggingFrom, mode) => {
  if (isDraggingOver) {
    return "#757575";
  }
  if (isDraggingFrom) {
    return "#757575";
  }
  return mode ==='wrapperdnd' ? "#404646" : "#f2f2f2";
};

const Wrapper = styled.div`
  background-color: ${props =>
    { return getBackgroundColor(props.isDraggingOver, props.isDraggingFrom, props.className)}};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */

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
            moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)}
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
            professional_id_list={this.props.professional_id_list}
            updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
            MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }}
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
        <div ref={dropProvided.innerRef}  className="quote-list">
          <InnerQuoteList  MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }} updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}} professional_id_list={this.props.professional_id_list} moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)} setDta={(item)=>this.props.setDta(item)} columns={this.props.columns} onDragEnd={(data)=>{this.props.onDragEnd(data)}} ordered={this.props.ordered} quotes={quotes}  view={this.props.view}/>
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
          <Wrapper
            style={style}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={isDropDisabled}
            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
            {...dropProvided.droppableProps}
            className={this.props.mode ==='dark'? "wrapperdnd" : "wrapperdnd-light"}
          >
            {internalScroll ? (
              <ScrollContainer style={scrollContainerStyle}>
                <InnerList
                  moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)}
                  columns={this.props.columns}
                  ordered={this.props.ordered}
                  quotes={quotes}
                  title={title} 
                  dropProvided={dropProvided}
                  view={this.props.view}
                  onDragEnd={(data)=>{this.props.onDragEnd(data)}}
                  setDta={(item)=>this.props.setDta(item)}
                  professional_id_list={this.props.professional_id_list}
                  updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                  MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }}
                  
                />
              </ScrollContainer>
            ) : (
              <InnerList
                moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)}
                ordered={this.props.ordered}
                columns={this.props.columns}
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
                view={this.props.view}
                onDragEnd={(data)=>{this.props.onDragEnd(data)}}
                setDta={(item)=>this.props.setDta(item)}
                professional_id_list={this.props.professional_id_list}
                updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }}
              />
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
