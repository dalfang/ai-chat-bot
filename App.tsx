import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import supabase from "./src/lib/supabase";

export default function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const runPrompt = async () => {
    setMessages((current) => [{ message: query, isUser: true }, ...current]);
    setQuery("");
    const { data, error } = await supabase.functions.invoke("prompt", {
      body: { query },
    });
    if (error) {
      console.log("Failed");
      console.log(error);
    }
    setMessages((current) => [{ ...data }, ...current]);
  };

  console.log(messages);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              { marginLeft: item.isUser ? 50 : 0 },
            ]}
          >
            <Text>{item.message}</Text>
            <Text style={{ fontWeight: "bold", margintop: 20 }}>
              Read more:
            </Text>
            {item.docs?.map((doc) => (
              <Text style={styles.link}>{doc.title}</Text>
            ))}
          </View>
        )}
      />
      <TextInput
        placeholder="prompt"
        value={query}
        onChangeText={setQuery}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: "gainsboro",
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <Button title="Run" onPress={runPrompt} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  messageContainer: {
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 5,
  },
});
