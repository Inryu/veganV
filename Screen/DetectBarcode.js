import React, {useState} from 'react';
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
} from 'react-native';

import {CameraKitCameraScreen} from 'react-native-camera-kit';
import Loader from '../Component/Loader';

const DetectBarcode = ({navigation}) => {
  const key = require('../Keys/key');
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState('8801019306587');
  const [opneScanner, setOpneScanner] = useState(false);
  const [reportNum, setReportNum] = useState('');
  const [rawmt, setRawmt] = useState([]);

  //바코드 번호로 품목보고번호 얻기
  //http://openapi.foodsafetykorea.go.kr/api/mykey/C005/json/1/5/BAR_CD=
  const getRepotNo = async () => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' +
        key.openAPIkey +
        '/C005/json/1/5/BAR_CD=' +
        qrvalue,
      {
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const responseJson = await response.json();
      console.log('==품목보고정보==');
      console.log(responseJson.C005.row[0].PRDLST_REPORT_NO);
      return responseJson.C005.row[0].PRDLST_REPORT_NO;
    } else {
      return 0;
      // throw new Error('unable to get');
    }
  };

  //품목보고번호로 원재료명 얻
  //http://openapi.foodsafetykorea.go.kr/api/2817c726abd24d5cb28b/C002/json/1/5/PRDLST_REPORT_NO=
  const getRawmt = async (reportnum) => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' +
        key.openAPIkey +
        '/C002/json/1/5/PRDLST_REPORT_NO=' +
        reportnum,
      {
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const responseJson = await response.json();
      console.log('==원재료 정보==');
      console.log(responseJson.C002.row[0].RAWMTRL_NM);
      return responseJson.C002.row[0].RAWMTRL_NM;
    } else {
      return 0;
      // throw new Error('unable to get');
    }
  };

  const getdataFUll = async () => {
    setLoading(true);
    const report_num = await getRepotNo();
    setReportNum(report_num);
    const raw_mt = await getRawmt(report_num);
    // setRawmt(raw_mt);

    //쉼표 기준으로 잘라서 배열 만들
    var mt = raw_mt.split(',');
    var mtarr = [];

    for (var i = 0; i < mt.length; i++) {
      mtarr.push(mt[i]);
    }

    setLoading(false);
    navigation.navigate('BarcodeResult', {
      report_num: report_num,
      raw_mt: mtarr,
    });
  };

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    getdataFUll();
    setOpneScanner(false);
    // alert(qrvalue);
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />

      {opneScanner ? (
        <View style={{flex: 1}}>
          <CameraKitCameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.ToptxtArea}>
            <Text
              style={{
                fontSize: wp(4.5),
                fontFamily: 'NanumSquareR',
                paddingBottom: wp(2),
              }}>
              바코드를 스캔하여
            </Text>
            <Text style={{fontSize: wp(4.5), fontFamily: 'NanumSquareR'}}>
              원재료와 비건 여부를 확인하세요 🌱
            </Text>
          </View>

          <View style={styles.btnArea_round}>
            <TouchableOpacity style={styles.btn_round} onPress={getdataFUll}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp(6),
                  fontFamily: 'NanumSquareR',
                }}>
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoArea: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: wp(15),
  },
  btnArea_round: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: wp(5),
    alignItems: 'center',
  },
  btn_round: {
    width: wp(30),
    height: wp(30),
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',

    shadowColor: '#000',

    elevation: 7,

    ...Platform.select({
      ios: {
        overflow: 'visible',
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        overflow: 'visible',
      },
    }),
  },

  btnoutline: {
    flex: 1,
    width: wp(75),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2E7D32',
  },

  ToptxtArea: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: wp(5),
    flex: 0.6,
  },
});
export default DetectBarcode;
