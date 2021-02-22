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
  const {report_num, raw_mt, is_vegan_flag, food_name} = route.params;

  useEffect(() => {
    console.log('===params===');
    console.log(report_num);
    console.log(raw_mt);
    console.log(is_vegan_flag);
    console.log(food_name);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text
          style={{
            fontSize: wp(4),
            fontFamily: 'NanumSquareR',
          }}
        />
      ),
    });
  }, []);
  //flat list item
  const rawItems = ({item, index}) => {
    return (
      <View style={styles.tablerow}>
        <View style={styles.tablecol_l}>
          <Text
            style={{
              fontSize: wp(4),
              fontFamily: 'NanumSquareR',
            }}>
            {item.rmt_name}
          </Text>
        </View>
        <View style={styles.tablecol_r}>
          {item.is_vegan == 1 && (
            <Image
              source={require('../assets/vegan.png')}
              style={{resizeMode: 'contain', width: wp(25)}}
            />
          )}
          {item.is_vegan == 0 && (
            <Image
              source={require('../assets/non-vegan.png')}
              style={{resizeMode: 'contain', width: wp(25)}}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.result_container}>
        <View style={{alignItems: 'center', paddingTop: hp(3)}}>
          <Text
            style={{
              fontSize: wp(5),
              fontFamily: 'NanumSquareB',
            }}>
            {food_name}
          </Text>
        </View>
        <View style={styles.result_img2}>
          {is_vegan_flag == 1 && (
            <Image
              source={require('../assets/vegan-mark-fill.png')}
              style={{height: hp(5), resizeMode: 'contain'}}
            />
          )}

          {is_vegan_flag == 0 && (
            <Image
              source={require('../assets/non-vegan-mark-fill.png')}
              style={{height: hp(5), resizeMode: 'contain'}}
            />
          )}
        </View>

        <View style={styles.result_txt2}>
          {is_vegan_flag == 1 && (
            <Text
              style={{
                fontSize: wp(5),
                fontFamily: 'NanumSquareB',
              }}>
              vegan
            </Text>
          )}

          {is_vegan_flag == 0 && (
            <Text
              style={{
                fontSize: wp(5),
                fontFamily: 'NanumSquareB',
              }}>
              non-vegan
            </Text>
          )}
        </View>
      </View>
      <View style={styles.flat_container}>
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
  },
  result_container: {
    // height: hp(6),
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    paddingBottom: hp(2),
    // margin: wp(7),
    // borderRadius: 400,

    // backgroundColor: '#2E7D32', //green
    // backgroundColor: 'dimgrey',
  },
  result_txt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  result_txt2: {
    marginTop: hp(-1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  result_container_inner: {
    flex: 1,
    flexDirection: 'row',
  },

  result_container_inner_l: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(30),
    // paddingLeft: wp(20),
    // borderRightWidth: 1,
    borderColor: 'black',
  },

  result_container_inner_r: {
    flex: 1,
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat_container: {
    paddingLeft: wp(10),
    paddingRight: wp(10),
  },
  result_img: {
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },

  result_img2: {
    height: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
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
