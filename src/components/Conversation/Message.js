import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { DocMsg, LinkMsg, MediaMeg, ReplyMesg, TextMsg, TimeLine } from "./MsgTypes";

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
                // timeline
               return <TimeLine el={el} />
              case "msg":
                switch (el.subtype) {
                    case "img":
                        return <MediaMeg el={el} />
                        case "doc":
                        // doc msg
                        return <DocMsg el={el}/>
                        
                        case "link":
                        // link msg
                        return <LinkMsg el={el}/>
                
                        case "reply":
                        // replay msg
                        return <ReplyMesg el={el} />
                    default:
                        // text mesg
                        return <TextMsg el={el} />
                }
            
            default:
              return <></> ;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
