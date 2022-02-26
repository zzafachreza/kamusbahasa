import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
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

  const [data, setData] = useState([]);
  const [foto, setfoto] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {


    if (isFocused) {


      getDataKamus();



    }

  }, [isFocused])



  const getDataKamus = (x) => {
    axios.post('https://zavalabs.com/kamus_bahasa/api/index.php', {
      key: x
    }).then(res => {
      console.log(res.data)
      setData(res.data);
    })
  }


  const IndonesiaTgl = (tgl) => {

    var bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    var _tanggal = new Date(tgl).getDate();
    var _bulan = new Date(tgl).getMonth();
    var _tahun = new Date(tgl).getFullYear();


    return `${_tanggal} ${bulan[_bulan]} ${_tahun}`
  }

  const GetUmur = (tgl) => {
    var today = new Date();
    var birthday = new Date(tgl);
    var year = 0;
    if (today.getMonth() < birthday.getMonth()) {
      year = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
      year = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - year;

    if (age < 0) {
      age = 0;
    }

    return age;
  }

  const GetPensiun = (tgl) => {
    var today = new Date();
    var birthday = new Date(tgl);
    var year = 0;
    if (today.getMonth() < birthday.getMonth()) {
      year = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
      year = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - year;
    var pensiun = '';

    if (age < 0) {
      age = 0;
    }


    if (age > 56) {
      pensiun = 'Anda Sudah Pensiun';
    } else {
      pensiun = (56 - age);
    }

    return pensiun;
  }


  const MyTable = ({ label, value }) => {
    return (
      <View style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 23,
          color: colors.black
        }}>{label}</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 23,
          color: colors.black
        }}>{value}</Text>
      </View>
    )
  }


  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 10
        }}>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ height: 80, resizeMode: 'contain', aspectRatio: 1 }}
            />

            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.black,
              marginBottom: 10,
            }}>Kamus Bahasa Serua</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.black
            }}>Indonesia





            </Text>
          </View>



        </View>


        <View style={{ paddingHorizontal: 10 }}>
          <MyInput label="Pencarian Kata Kunci" iconname="search" onChangeText={val => getDataKamus(val)} />
        </View>
        <ScrollView>
          {data.map(item => {


            return (
              <TouchableOpacity onPress={() => navigation.navigate('Login', item)} style={{
                marginHorizontal: 10,
                marginVertical: 2,
                // borderWidth: 1,
                padding: 20,
              }}>
                <Text>{item.lema}</Text>
                <Text>{item.sublema}</Text>
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
