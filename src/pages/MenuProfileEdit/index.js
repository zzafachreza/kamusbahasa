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



export default function ({ navigation }) {


    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'center'
                }}>

                <View style={{ flexDirection: 'row', padding: 10, marginTop: -100 }}>
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
                        <Text style={{
                            marginTop: 50,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 20,
                            color: colors.black,
                            textAlign: 'justify'
                        }}>
                            Kantor Bahasa Provinsi Maluku
                            Badan Pengembangan dan Pembinaan Bahasa
                            Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
                        </Text>
                    </View>


                </View>






            </SafeAreaView>

        </>
    );
}



const styles = StyleSheet.create({

})
