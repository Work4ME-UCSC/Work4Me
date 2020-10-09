import React from "react";
import { View, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useSelector } from "react-redux";

import url from "../constants/url";

const MessageScreen = ({ route }) => {
  const chatClient = new StreamChat(url.apiKey);
  const user = route.params.user;
  const channel = route.params.channel;
  const token = useSelector((state) => state.auth.streamToken);

  chatClient.setUser(user, token);

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel client={chatClient} channel={channel}>
          <View style={{ display: "flex", height: "100%" }}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

export default MessageScreen;
