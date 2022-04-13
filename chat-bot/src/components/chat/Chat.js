import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  ListItemText,
  TextField,
  Divider,
  Grid,
  Container,
  Paper,
  Button,
  Drawer,
  Typography,
  IconButton
} from "@material-ui/core";
import AndroidIcon from "@material-ui/icons/Android";
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import { connect } from "react-redux";
//  Import action
import { sendMessage, userMessage } from "../../actions/useAPICall";

const Chat = ({ chat, userMessage, sendMessage }) => {
  // Handle Users Message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"2a0e9618835dae7d73d5aab9c8e62a3a2","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
  },[])

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const scrollToBottom = () => {
    endOfMessages?.current?.scrollIntoView(false);
  };
  useEffect(scrollToBottom, [chat]);

  //  Function that handles user submission
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <>
    {["right"].map((anchor) => (
    <IconButton onClick={toggleDrawer(anchor, true)} color="primary" aria-label="upload picture" component="span">
      <ChatBubbleTwoToneIcon />
      <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => setState({'right': false })}
          >
            <Container>
              <Typography variant="h4" component="h2" style={{backgroundColor:'#5461f0', color: 'white', padding:'20px'}}>
                ChatBot
              </Typography>
              <Grid item xs={12} >
                <Grid container className="messageArea" style={{backgroundColor:'#d6ddef'}}>
                  <Container>
                  <Grid item xs={12}>
                    <ListItemText align="right" style={{ color: "blue" }}>
                      {!chat && chat?.length === 0
                        ? ""
                        : chat?.map((msg, ind) =>
                            msg.type === "user" ? (
                              <div align="right" className={msg.type}>
                                <Avatar src="/broken-image.jpg"></Avatar>
                                {msg.message}
                              </div>
                            ) : (
                              <div align="left" className={msg.type}>
                                <Avatar>
                                  <AndroidIcon />
                                </Avatar>
                                {msg.message}
                              </div>
                            )
                          )}
                      <div ref={endOfMessages}></div>
                    </ListItemText>
                  </Grid>
                  </Container>
                </Grid>
                <Divider />
                <Grid container style={{ padding: "5px" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic-email"
                      onKeyPress={handleClick}
                      onChange={(e) => setMessage(e.target.value)}
                      label="Type Something"
                      value={message}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Drawer>
    </IconButton>))}
    </>
    
  );
};
const mapStateToProps = (state) => ({
  chat: state.chatReducer.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
