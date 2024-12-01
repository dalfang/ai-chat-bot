import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import supabase from "./src/lib/supabase";

export default function App() {
  const [query, setQuery] = useState("");

  const runPrompt = async () => {
    const { data, error } = await supabase.functions.invoke("prompt", {
      body: { query, name: "dalin" },
    });

    if (error) {
      console.log(error);
    }
    console.log(data);
  };

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
