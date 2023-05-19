import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Checkbox = ({ isChecked, onPress, title }) => {
  const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="#00bf80" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#000',
    marginLeft: 5,
  },
});
