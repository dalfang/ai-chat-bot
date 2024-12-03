import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
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
      <TextInput
        placeholder="prompt"
        value={query}
        onChangeText={setQuery}
        style={{
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
    padding: 10,
  },
});
