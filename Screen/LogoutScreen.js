import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

function LogoutScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1.5}} />
      <View style={{flex: 2}}>
        <View style={styles.logoArea}>
          <Image
            source={require('../assets/logo-with-text.png')}
            style={{width: wp(55), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btnoutline}
            onPress={() => navigation.navigate('DetectBarcode')}>
            <Text
              style={{
                color: '#2B8E1B',
                fontSize: 17,
                fontFamily: 'NanumSquareB',
              }}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'NanumSquareB',
              }}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoArea: {
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: wp(15),
  },
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: wp(75),
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
  },
  btnoutline: {
    flex: 1,
    width: wp(75),
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
  },
});
export default LogoutScreen;
