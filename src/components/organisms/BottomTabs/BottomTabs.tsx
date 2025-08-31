import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@components/atoms";
import { Button } from "@components/molecules";
import { BottomTabsProps, TabItem } from "./BottomTabs.types";
import Input from "@components/molecules/Input/Input";

export default function BottomTabs({ tabs, onTabPress }: BottomTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Button onPress={() => onTabPress(tab.key)} style={styles.button} key={tab.key}>
          <Icon library={tab.iconProps?.library ?? "ionicons"} name={tab.iconProps?.name ?? ""} />
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopColor: "#eee",
    borderTopWidth: 1,
  },
  button: {
    alignItems: "center",
  },
  labelActive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
