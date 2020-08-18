import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { CometChat } from "@cometchat-pro/chat";
import "./style.scss";


const actionHandler = (props) => {

  props.actionGenerated(props.action, props.message);
  document.body.click();
}
const DeleteMessage = (messageId, props) => {
  CometChat.deleteMessage(messageId).then(
    message => {
        // console.log("Message deleted", message);
        props.actionGenerated("messageDeleted", [ message ])
    },
    error => {
        console.log("Message delete failed with error:", error);
    }
  );
}

const Tooltip = ({ tooltip, children, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      getTooltipProps,
      getArrowProps,
      tooltipRef,
      arrowRef,
      placement
    }) => (
      <div {...getTooltipProps({ ref: tooltipRef, className: 'tooltip-container' })}>
        <div
          {...getArrowProps({
            ref: arrowRef,
            'data-placement': placement,
            className: 'tooltip-arrow'
          })}
        />
        <ul className="cc1-chat-win-tooltip">
          {/* <li className="reply" 
          onClick={() => actionHandler(props)}>
            <span></span>{(props.message.replyCount) ? "Reply to thread" : "Reply in thread"}
          </li>
          <li className="edit"><span></span>Edit message</li> */}
         <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}><span></span>Delete message</li>
        </ul>
      </div>
    )}>
    {({ getTriggerProps, triggerRef }) => (
      <span {...getTriggerProps({ ref: triggerRef, className: 'trigger' })}>{children}</span>
    )}
  </TooltipTrigger>
);

export default Tooltip;