import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, ChannelPreviewMessenger, ChannelList } from "stream-chat-expo";
import { useSelector } from "react-redux";

import url from "../constants/url";

const chatClient = new StreamChat(url.apiKey);

const MessageListScreen = ({ navigation }) => {
  const userID = useSelector((state) => state.auth.userID);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const avatar = useSelector((state) => state.auth.profilePic);
  const token = useSelector((state) => state.auth.streamToken);

  const user = {
    id: userID,
    name: `${firstName} ${lastName}`,
    image: avatar,
  };

  useEffect(() => {
    chatClient.setUser(user, token);

    return () => chatClient.disconnect();
  });

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <View style={{ display: "flex", height: "100%", padding: 10 }}>
          <ChannelList
            filters={{
              type: "messaging",
              members: { $in: [`${userID}`] },
            }}
            sort={{ last_message_at: -1 }}
            Preview={ChannelPreviewMessenger}
            onSelect={(channel) =>
              navigation.navigate("messageScreen", {
                channel,
                user,
              })
            }
          />
        </View>
      </Chat>
    </SafeAreaView>
  );
};

export default MessageListScreen;
