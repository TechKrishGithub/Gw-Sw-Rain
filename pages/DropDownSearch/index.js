import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

const DropDownSearch = (props) => {
  const {
    placeholderText,
    data,
    label,
    handleChange,
    selectedValue,
    maxHeight,
    width,
  } = props;
  const [value, setValue] = useState(selectedValue ? selectedValue : null);
  const [isFocus, setIsFocus] = useState(false);
  const onSelect = (item) => {
    setValue(item.value);
    setIsFocus(false);
    //child to parent passing selected Value
    handleChange(item.value);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          { width: width ? width : "" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus ? (placeholderText ? placeholderText : "Select Item") : "..."
        }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelect(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropDownSearch;