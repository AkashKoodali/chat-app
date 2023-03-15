import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { DocMsg, LinkMsg, MediaMeg, ReplyMesg, TextMsg, TimeLine } from "./MsgTypes";

const Message = ({menu}) => {
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
                        return <MediaMeg el={el} menu={menu} />
                        case "doc":
                        // doc msg
                        return <DocMsg el={el} menu={menu} />
                        
                        case "link":
                        // link msg
                        return <LinkMsg el={el} menu={menu} />
                
                        case "reply":
                        // replay msg
                        return <ReplyMesg el={el} menu={menu}  />
                    default:
                        // text mesg
                        return <TextMsg el={el} menu={menu}  />
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
