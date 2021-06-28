import React, { useState, useEffect } from "react";
import { CometChat } from '@cometchat-pro/chat';
import "./style.scss";
import sitedata from "sitedata";
import BadgeCount from "../BadgeCount";
import ReactTooltip from "react-tooltip";
import Avatar from "../Avatar";
import StatusIndicator from "../StatusIndicator";
import { SvgAvatar } from "../../util/svgavatar";
import axios from "axios";

function ConversationView (props) {
  const [_image, setImage] = React.useState(null);
  useEffect(() => {
    {console.log('image1')}
    let user = props?.conversation?.conversationWith;
    if (user.avatar) {
      const uid = user.uid;
      var char = user.avatar;
      char = char.split(".com/")[1];
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + char)
        .then((response) => {
          if (response.data.hassuccessed) {
            setImage(response.data.data);
          }
        });
    }
    else{
      const uid = user.uid;
      const char = user.name.charAt(0).toUpperCase();
      if(uid && char){
        setImage(SvgAvatar.getAvatar(uid, char));
        console.log(SvgAvatar.getAvatar(uid, char))
      }
    } 
  }, [props.user]);


  const getMessage = () => {

    let message = "";
    const type = props.conversation.lastMessage.type;

    switch(type) {
      case CometChat.MESSAGE_TYPE.TEXT:
        message = props.conversation.lastMessage.text;
      break;
      case CometChat.MESSAGE_TYPE.MEDIA:
        message = "Media message";
      break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        message = "Image message";
      break;
      case CometChat.MESSAGE_TYPE.FILE:
        message = "File message";
      break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "Video message";
      break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "Audio message";
      break;
      case CometChat.MESSAGE_TYPE.CUSTOM:
        message = "Custom message";
      break;
      default:
      break;
    }

    return message;
  }

  const getCallMessage = () => {

    let message = "";
    const type = props.conversation.lastMessage.type;

    switch(type) {
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "Video call";
      break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "Audio call";
      break;
      default:
      break;
    }
    
    return message;
  }

  const getActionMessage = () => {

    var message = props.conversation.lastMessage.message;

    //if action messages are set to hide in config
    if(props.config) {

      const found = props.config.find(cfg => {
        return (cfg.action === message.action && cfg.category === message.category);
      });

      if(found && found.enabled === false) {
        message = "";
      }
    }

    return message;
  }

  const getCustomMessage = () => {

    var message = "Some Custom Message";
    return message;
  }

  const getLastMessage = () => {

    if(!props.conversation.lastMessage)
      return false;

    let message = "";

    switch(props.conversation.lastMessage.category) {
      case "message":
        message = getMessage();
      break;
      case "call":
        message = getCallMessage();
      break;
      case "action":
        message = getActionMessage();
      break;
      case "custom":
        message = getCustomMessage();
      break;
      default:
      break;
    }
    
    return message;
  }

  const getAvatar = () => {

    let avatar;
    if(props.conversation.getConversationType() === "user") {
      avatar = props.conversation.getConversationWith().getAvatar();
    } else if (props.conversation.getConversationType() === "group") {
      avatar = props.conversation.getConversationWith().getIcon();
    }
    return avatar;
  }

  let lastMessageTimeStamp = "";
  if(props.conversation.lastMessage) {
    lastMessageTimeStamp = (
      <span className="chat-listitem-time">{new Date(props.conversation.lastMessage.sentAt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
    );
  }

  let presence;
  if(props.conversation.getConversationType() === "user") {
    const status = props.conversation.getConversationWith().getStatus();
    presence = (
      <StatusIndicator
      status={status}
      cornerRadius="50%" 
      borderColor="rgb(238, 238, 238)" 
      borderWidth="1px" />
    );
  }
    
  return (
    props.Userlist.includes(props.conversation.conversationWith.uid) &&
    <div className="chat-listitem">
      {/* {console.log('_image', _image)} */}
      <div className="chat-thumbnail-wrap">
        <Avatar 
        image={_image}
        cornerRadius="18px" 
        borderColor="#CCC"
        borderWidth="1px" />
        {presence}
      </div>
      <div className="chat-listitem-dtls">
        <div className="chat-listitem-name">{props.conversation.conversationWith.name}</div>
        <p className="chat-listitem-txt">{getLastMessage()} </p>
      </div>
      {lastMessageTimeStamp}
      <BadgeCount count={props.conversation.unreadMessageCount}></BadgeCount>
    </div>
  )
}

export default ConversationView;