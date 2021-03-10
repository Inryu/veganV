## 🥦 Project Overview
DSC ewha 2021 winter Project로,
**비거니즘을 위한 플랫폼**을 구현하고자 하였습니다.

우선 winter Project 동안 구현하고자 한 기능은 음식 포장지에 있는 바코드를 카메라로 인식하면, 해당 음식의 원재료 들과 비건 / 논비건 여부를 알려주는 기능입니다.


바코드를 인식 한 뒤의 원재료명을 알아내기 위해 [**식품의약품안전처 데이터활용서비스**](https://www.foodsafetykorea.go.kr/apiMain.do) 의 open API를 사용하였습니다.

<br>

### 사용기술
- React Native
- react-native-camera-kit
- Node.js + Express + Sequelize
- Mysql 

<br>

### APIs
[**식품의약품안전처 데이터활용서비스**](https://www.foodsafetykorea.go.kr/apiMain.do)
- 바코드연계제품정보
- 식품(첨가물)품목제조보고(원재료)
<br>
<br>
  

  
## 🥦 결과화면
<image src="https://user-images.githubusercontent.com/55133794/110107590-71ced180-7dee-11eb-9eac-9422dfe48c64.gif" width="250" ></image>

<center>
앱 진입 (로그인 기능 구현 보류)</center>

<image src="https://user-images.githubusercontent.com/55133794/110107942-e570de80-7dee-11eb-8040-1d01d7b5530e.gif" width="250" ></image>
<center>
바코드 인식 & 결과 화면</center>
<br>
<br>
<br>



>🧤 백엔드 repository<br/>
https://github.com/Inryu/veganV-server <br/><br/>
🧤 구현 관련 자세한 사항은 아래 블로그를 참고해주세요 :> 
https://velog.io/@inryu/series/Vegan-V



