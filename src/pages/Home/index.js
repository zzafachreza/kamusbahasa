import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { fonts, windowWidth, colors } from '../../utils';
import { MyButton, MyGap, MyInput, MyHeader } from '../../components';

import RNExitApp from 'react-native-exit-app';
import { getData, storeData } from '../../utils/localStorage';
import { color } from 'react-native-elements/dist/helpers';
import 'intl';
import { useIsFocused } from "@react-navigation/native";
import 'intl/locale-data/jsonp/en';
import axios from 'axios';

const DataKategori = ({ icon, nama, onPress, img = require('../../assets/hospital.png') }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.white,
        padding: 5,
        borderRadius: 20,
        width: windowWidth / 5,
        elevation: 5,
      }}>
      <View style={{ width: windowWidth / 6, overflow: 'hidden', height: 60, backgroundColor: colors.white, borderRadius: 40, justifyContent: 'center', alignContent: 'center' }}>
        <Image source={img} style={{
          width: 40,
          height: 40,
          alignSelf: 'center'
        }} />
      </View>
      <View>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: windowWidth / 42,
            textAlign: 'center',
          }}>
          {nama}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default function Home({ navigation }) {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const [data, setData] = useState([]);
  const [jumlah, setJumlah] = useState(0);
  const [foto, setfoto] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        console.log('buka')
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        console.log('tutup')
      }
    );
    getDataKamus();

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };

  }, [])



  const getDataKamus = (x) => {
    axios.post('https://zavalabs.com/kamus_bahasa/api/index.php', {
      key: x
    }).then(res => {
      console.warn(res.data);
      setJumlah(res.data.length);
      setData(res.data);
    })
  }





  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}>

        {!isKeyboardVisible && <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ height: 200, resizeMode: 'contain', aspectRatio: 1 }}
            />

          </View>
        </View>
        }


        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <MyInput label="Pencarian Kata Kunci" iconname="search" onChangeText={val => getDataKamus(val)} />
        </View>
        {jumlah == 0 && (
          <View style={{ padding: 15 }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: colors.black
            }}>Data tidak ditemukan, silahkan cari kata yang lain...</Text>
          </View>
        )}

        <ScrollView>


          {data.map(item => {

            let test = item.lema;
            let sup = test.substring(0, 1);
            let jenis = 0;

            if (sup === '1' || sup === '2') {
              jenis = 1;
            } else {
              jenis = 0;
            }



            return (
              <TouchableOpacity onPress={() => navigation.navigate('Login', item)} style={{
                marginHorizontal: 10,
                marginVertical: 2,
                // borderWidth: 1,
                padding: 20,
              }}>
                <View style={{ flexDirection: 'row' }}>
                  {jenis > 0 && <Text style={{ fontSize: windowWidth / 30, lineHeight: 18, color: colors.black }}>{sup}</Text>}
                  {jenis == 0 && <Text style={{
                    fontFamily: fonts.primary.normal,
                    fontSize: windowWidth / 20,
                    color: colors.black
                  }}>{sup}</Text>}
                  <Text style={{
                    fontFamily: fonts.primary.normal,
                    fontSize: windowWidth / 20,
                    color: colors.black
                  }}>

                    {test.substring(1, test.length)}</Text>
                </View>
                <Text style={{
                  fontFamily: fonts.secondary.normal,
                  fontSize: windowWidth / 20,
                  color: colors.black
                }}>{item.sublema}</Text>
                <Text style={{
                  fontFamily: fonts.secondary.normal,
                  fontSize: windowWidth / 20,
                  color: colors.black
                }}>{item.definisi}</Text>
              </TouchableOpacity>
            )


          })}
        </ScrollView>

      </SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 60, padding: 10, backgroundColor: colors.primary, borderTopWidth: 2, borderTopColor: colors.primary }}>

        <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="ionicon" name="home" color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 35,
            color: colors.white
          }}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Petunjuk')} style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="ionicon" name="book-outline" color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 35,
            color: colors.white
          }}>Petunjuk</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('MenuProfileEdit')} style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="ionicon" name="alert-circle-outline" color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 35,
            color: colors.white
          }}>Tentang Kami</Text>
        </TouchableOpacity>



      </View>
    </>
  );
}



const styles = StyleSheet.create({

})
