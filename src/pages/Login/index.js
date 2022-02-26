import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { storeData } from '../../utils/localStorage';


export default function ({ navigation, route }) {

  const item = route.params;





  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      <Text style={{
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 10,
        color: colors.black,

      }}>
        {item.lema}{item.sublema}<Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          fontWeight: '400',
          color: colors.black,
        }}>/{item.lafal}/</Text>
      </Text>
      <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 20,
        color: colors.danger,
      }}>{item.kelas} <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 20,
        color: colors.black,
      }}>{item.definisi}: <Text style={{ fontStyle: 'italic' }}>{item.contoh}</Text> {item.terjemah}</Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
