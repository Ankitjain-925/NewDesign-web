import React, { useState, useEffect } from "react";
import "./style.scss";
import BadgeCount from "../BadgeCount";
import ReactTooltip from "react-tooltip";
import Avatar from "../Avatar";
import StatusIndicator from "../StatusIndicator";
import { SvgAvatar } from "../../util/svgavatar";
import axios from "axios";

function Userview(props) {
  const [_image, setImage] = React.useState(null);
  useEffect(() => {
    let user = props.user;
    if (!user.getAvatar()) {
      const uid = user.getUid();
      const char = user
        .getName()
        .charAt(0)
        .toUpperCase();
      setImage(SvgAvatar.getAvatar(uid, char));
      // user.setAvatar(SvgAvatar.getAvatar(uid, char));
    } else {
      const uid = user.getUid();
      var char = user.getAvatar();
      char = char.split(".com/")[1];
      axios
        .get("https://sys.aimedis.io/api/v2/aws/sign_s3?find=" + char)
        .then((response) => {
          if (response.data.hassuccessed) {
            setImage(response.data.data);
            // user.setAvatar(response.data.data);
          }
        });
    }
  }, [props.user]);
  return ((
    // console.log('csfsdf', props.Userlist, props.user.uid),
    // props.Userlist && props.Userlist.includes(props.user.uid) ?
    <div className="contact-listitem" >
      <div className="contact-thumbnail-wrap">
        <Avatar
          image={_image}
          cornerRadius="50%"
          borderColor="#CCC"
          borderWidth="1px"

        />
        <StatusIndicator
          status={props.user.status}
          cornerRadius="50%"
          borderColor="rgb(238, 238, 238)"
          borderWidth="1px"
        />
      </div>
      <div className="contact-listitem-dtls">
        <div className="contact-listitem-name" data-tip data-for={props.user.name}>{props.user.name}</div>
        <ReactTooltip className="timeIconClas" id={props.user.name} place="top" effect="solid" backgroundColor="#ffffff">
           {props.user.name}
        </ReactTooltip>
        {props &&
          props.UnreadCount &&
          Object.entries(props.UnreadCount).map(([key, value]) =>
            key === props.user.uid ? <BadgeCount count={value} /> : ""
          )}
      </div>
    </div> /*: <div></div>*/ /*: <div></div>*/ /*: <div></div>*/ /*: <div></div>*/
    // : <div></div>
  ) /*: <div></div>*/);
}

export default Userview;
