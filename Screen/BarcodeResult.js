import React, {useState, useEffect, useLayoutEffect} from 'react';
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
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';

const BarcodeResult = ({route, navigation}) => {
  const {report_num, raw_mt} = route.params;

  useEffect(() => {
    console.log('===params===');
    console.log(report_num);
    console.log(raw_mt);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text
          style={{
            fontSize: wp(4),
            fontFamily: 'NanumSquareR',
          }}>
          원재료명
        </Text>
      ),
    });
  }, []);
  //flat list item
  const rawItems = ({item, index}) => {
    return (
      <View style={styles.tablerow}>
        <View style={styles.tablecol_l}>
          <Text style={{fontSize: wp(4), fontFamily: 'NanumSquareR'}}>
            {item}
          </Text>
        </View>
        <View style={styles.tablecol_r}>
          {/*<Image*/}
          {/*  source={require('../assets/vegan.png')}*/}
          {/*  style={{resizeMode: 'contain', width: wp(25)}}*/}
          {/*/>*/}
          <Image
            source={require('../assets/non-vegan.png')}
            style={{resizeMode: 'contain', width: wp(25)}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          data={raw_mt}
          renderItem={rawItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(10),
    paddingRight: wp(10),
  },
  list: {
    // backgroundColor: 'grey',
    // paddingLeft: wp(3),
    //     // paddingRight: wp(3),
  },
  tablerow: {
    paddingLeft: wp(1),
    paddingRight: wp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    height: hp(7),
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  tablecol_l: {
    flex: 2,
    justifyContent: 'center',
  },
  tablecol_r: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  vegan: {
    borderRadius: 400,
    backgroundColor: '#8BC34A',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  Text: {
    fontFamily: 'NanumSquareR',
  },
});

export default BarcodeResult;
