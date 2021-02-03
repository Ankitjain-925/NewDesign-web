import React from "react";
import "./style.scss";

import { CometChat } from "@cometchat-pro/chat";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "../../../../../../actions";
import {
    translationAR,
    translationSW,
    translationSP,
    translationRS,
    translationEN,
    translationNL,
    translationDE,
    translationCH,
    translationPT,
    translationFR
  } from "translations/index"

const callmessage = (props) => {
    
    const getMessage = () => {
        let translate={};
        switch (props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }
        let { had_miss_call_from, had_rejected_call, had_joined_call_with, had_initiated_call_with, ended_call_with, cancelled_call_with } = translate

        switch (props.message.action) {
            case CometChat.CALL_STATUS.UNANSWERED:
                return <p className="chat-txt-msg">{props.message.receiver.name + had_miss_call_from + props.message.sender.name}</p>
            case CometChat.CALL_STATUS.REJECTED:
                return <p className="chat-txt-msg">{props.message.sender.name + had_rejected_call + props.message.receiver.name} </p>
            case CometChat.CALL_STATUS.ONGOING:
                return <p className="chat-txt-msg">{props.message.sender.name + had_joined_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.INITIATED:
                return <p className="chat-txt-msg">{props.message.sender.name + had_initiated_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.ENDED:
                return <p className="chat-txt-msg">{props.message.sender.name + ended_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.CANCELLED:
                return <p className="chat-txt-msg">{props.message.sender.name + cancelled_call_with + props.message.receiver.name}</p>
            default:
                break;
        }
    }

    return (
    <div className="cc1-chat-win-action-msg-wrap">{getMessage()}</div>
    )
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(callmessage));
