import React, { Component } from "react";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { getLanguage } from "translations/index";

class Index extends Component {
  static defaultProps = {
    isCombineEnabled: false
  };

  state = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial)
  };

  boardRef;

  componentDidUpdate = (prevProps) => {
    if (prevProps.initial !== this.props.initial) {
      this.setState({columns: this.props.initial,
        ordered: Object.keys(this.props.initial)});
    }
  };

  onDragEnd = result => {
    // console.log('this is on end', result)
    if(result.destination){
      this.props.dragDropFlow(result);
    }
    
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
    }, ()=>{
      // console.log('columns state', this.state.columns)
    });
  };

  onChange=(e, index)=>{
    this.props.onChange(e, index)
  }

  AddMoreStep = ()=>{
    this.props.AddStep();
  }

  render() {
    const columns = this.state.columns;
    const ordered = this.state.ordered;
    let translate = getLanguage(this.props.stateLanguageType);
    let { AddStep } = translate;
    const board = (
      <div className={this.props.view === 'vertical' ? "dragdrop-vertical" : "dragdrop-horizontal"}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          isCombineEnabled={false}
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="manageDragDrop">
                {/* {console.log("ordered",ordered)} */}
                {ordered.map((key, index) => (
                  <li>
                    {/* {console.log("key",key)} */}
                    <div className="detailInfo">
                    <Column
                        moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)}
                        key={key}
                        onDragEnd={(data)=>{this.onDragEnd(data)}}
                        index={index}
                        edit={this.props.edit}
                        editName={this.props.editName}
                        onKeyDownlogin={this.props.onKeyDownlogin}
                        onChange={(e)=>{this.onChange(e, index)}}
                        DeleteStep={(index)=> this.props.DeleteStep(index)}
                        openAddPatient={this.props.openAddPatient}
                        title={key}
                        quotes={columns[key]}
                        isCombineEnabled={this.props.isCombineEnabled}
                        view={this.props.view}
                        ordered={ordered}
                        moveAllPatient={(to, from, data)=>{this.props.moveAllPatient(to, from, data)}}
                        moveStep={(to, from, item)=>{this.props.moveStep(to, from, item)}}
                        columns={this.state.columns}
                        setDta={(item)=>this.props.setDta(item)}
                        professional_id_list={this.props.professional_id_list}
                        updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                        MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }}
                      />
                    </div>
                  </li>

                ))}
                 <li>
                 <Grid className="newAddStepBtn"><Button onClick={this.AddMoreStep}>{AddStep}</Button></Grid>
                 </li>
                 {/* {console.log('this.state.columns', this.state.columns)} */}
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