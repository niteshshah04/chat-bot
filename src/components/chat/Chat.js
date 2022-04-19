import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  ListItemText,
  TextField,
  Divider,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  Typography,
  Button,
} from "@material-ui/core";
import AndroidIcon from "@material-ui/icons/Android";
import ChatBubbleTwoToneIcon from "@material-ui/icons/ChatBubbleTwoTone";
import { connect } from "react-redux";
//  Import action
import { sendMessage, userMessage } from "../../actions/useAPICall";
import Icon from "@material-ui/core/Icon";

const Chat = ({ chat, userMessage, sendMessage }) => {
  // Handle Users Message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   (function(d, m){
  //     var kommunicateSettings =
  //         {"appId":"2a0e9618835dae7d73d5aab9c8e62a3a2","popupWidget":true,"automaticChatOpenOnNavigation":true};
  //     var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
  //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
  //     var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
  //     window.kommunicate = m; m._globals = kommunicateSettings;
  // })(document, window.kommunicate || {});
  // },[])

  //loading css
  // <div className="dotwrapper">
  //  <div className="dot0" />
  //  <div className="dot1" />
  //  <div className="dot2" />
  //</div>

  const scrollToBottom = () => {
    endOfMessages?.current?.scrollIntoView(false);
  };
  useEffect(scrollToBottom, [chat]);

  //  Function that handles user submission
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  const handleSend = async () => {
    if (message !== null && message !== "") {
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <>
      <div className="bottomright">
        <Fab onClick={handleClickOpen} color="primary" aria-label="add">
          <ChatBubbleTwoToneIcon />
        </Fab>
      </div>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <div style={{ display: "flex", backgroundColor: "#007dba" }}>
            <DialogTitle className="chatBG" id="alert-dialog-slide-title">
              <Typography variant="h5">Unika</Typography>
            </DialogTitle>
          </div>
          <Divider />
          <DialogContent>
            <Grid item xs={12}>
              <Grid
                // container
                className="messageArea"
                style={{ backgroundColor: "#e1eff5" }}
              >
                <Container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      style={{ color: "rgb(0, 62, 93)" }}
                    >
                      {!chat && chat?.length === 0
                        ? ""
                        : chat?.map((msg, ind) =>
                            msg.type === "user" ? (
                              <div align="right" className={msg.type}>
                                <Avatar src="/broken-image.jpg"></Avatar>
                                {msg.message}
                                <h6 className="timeStyle">
                                  {new Date().toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    hour12: true,
                                    minute: "numeric",
                                  })}
                                </h6>
                              </div>
                            ) : (
                              <div align="left" className={msg.type}>
                                <Avatar>
                                  <AndroidIcon />
                                </Avatar>
                                {msg.message}
                                <h6 className="timeStyle">
                                  {new Date().toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    hour12: true,
                                    minute: "numeric",
                                  })}
                                </h6>
                              </div>
                            )
                          )}
                      <div ref={endOfMessages}></div>
                    </ListItemText>
                  </Grid>
                </Container>
              </Grid>
              <Divider />
              <Grid container>
                <Grid style={{ color: "white" }} item xs={10}>
                  <TextField
                    id="outlined-basic-email"
                    onKeyPress={handleClick}
                    onChange={(e) => setMessage(e.target.value)}
                    label="Type Something"
                    value={message}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    className="sendButton"
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    endIcon={<Icon fontSize="large">send</Icon>}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  chat: state.chatReducer.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
