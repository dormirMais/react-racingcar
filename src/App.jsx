import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';





class Car {
  constructor(name){
    this.name = name
    this.runRecord = 0
  }
  paintRecord = () =>{
    this.result = "";
    for(let i=0; i< this.runRecord; i++){
      this.result += "-";
    }
    return `${this.name} : ${this.result} \n `
  }

}

function App() {
  /* API 호출 상수 */
  const Random = global.MissionUtils.Random;
  console.log(Random);
  /* API 예시 입니다. 확인하시고 지우시면 됩니다. */
  

  const [carList, setCarList] = useState(null);//달릴 자동차들의 리스트를 담아줍니다.
  const [tryNum, setTryNum] = useState(null);//시도할 횟수를 상태로 관리해줍니다.
  const [isReady, setIsReady] = useState(false);// 위의 2가지 상태를 확인하여 준비가 되어있다면 실행을 합니다.  
  const [resultText, setResultText] = useState(null); //달리기 값을 텍스트로 저장
  const [result, setResult] = useState(null); //우승자 결과를 담아준다. 
  const [carListValue, setCarListValue] = useState('');
  const [tryNumValue, setTryNumValue] = useState(null);

  console.log(carList);
  console.log(tryNum);
  console.log(isReady);
  console.log("=======================================")

  useEffect(() =>{
    if(carList && tryNum) setIsReady(curr => !curr);
  }, [carList, tryNum])

  if(isReady){
    racingStart(carList, tryNum);
  }
  
  function racingStart(carList, tryNum){
    let highRecord = 0;
    let resultText = "";

    const winnerList = [];
    for(let i=0; i<tryNum; i++){//tryNum의 숫자만큼 레이싱을 한다.
      carList.forEach(car => {  //한 번의 레이싱마다 각각의 차들은 랜덤한 숫자로 달릴지 여부를 결정한다. 결정이되면 runrecord를 올려준다. 
        const randomNum = Random.pickNumberInRange(1, 10); 
        if(randomNum >= 4) car.runRecord += 1;
        if(highRecord < car.runRecord) highRecord = car.runRecord; 
        console.log(car.paintRecord());
        resultText += `${car.paintRecord()}`
      }
      );
      resultText += "\n"
      console.log("=============================\n");
    }
    carList.forEach(car => {
      if(car.runRecord === highRecord) winnerList.push(car.name);
    })
    console.log(winnerList);
    setResult(winnerList);
    setResultText(resultText);
    setIsReady(curr => !curr);

    return;
  }



  const registerCarList = (e) =>{
    e.preventDefault();
    const cars = []; //자동차들을 담아둘 리스트를 만듭니다. 리스트안에는 입력된 이름으로 만들어진 자동차들의 인스턴스가 답깁니다.
    const inputList = e.target.CarList.value.split(",");//현재 input에는 문자열이 들어있기 때문에 split으로 쪼개서 차동차 이름의 문자열로 구성된 배열을 만듭니다.
    for(let i=0; i<inputList.length; i++){
      if(inputList[i].length >5) {
        alert("각 자동차의 이름은 5자 이하여야 합니다. ");
        return ;
      }
      
    }
    inputList.map(el => cars.push(new Car(el))); //윗줄에서 만든 배열에 있는 자동차 이름들을 이용해서 Car인스턴스를 만들고 cars배열에 넣어줍니다.
    setCarList(cars) // 만든 배열을 carList에 세팅해줍니다.
  }



//횟수가 들어온다.
//횟수를 가지고 와서...for문으로 해당 횟수만큼 돌려준다
//각각의 횟수에서 수행할것은 달리기이다. 
//달리기에서는 각각의 차들이 한번씩 달리기 여부를 결정한다. 이는 랜덤 함수를 이용해 주사위를 굴린 후 4 이상이 나오면 적용한다.
// 4이상이 나오는 경우 객체에 있는 run record를 ++해준다. 아닌 경우 그냥 반환한다.
// 루프문이 끝나면 그중에서 높은 숫자를 가진 아이들을 조사한다. 
// 반환한다. 
  const setTryNumber = (e) =>{  //tryNum을 설정해주는 함수. 
    e.preventDefault();
    if(e.target.tryNumber.value <= 0) {
      alert("숫자는 양의 정수여야 합니다.");
      return;
    }
    setTryNum(e.target.tryNumber.value);
  }

  console.log(result);

  /* 코드 작성 구역 */
  const onCarListChange = e => setCarListValue(e.target.value);

  return (
    <div id="app">
      <h1>🏎️ 자동차 경주 게임</h1>
      <p>
        자동차 이름을 <strong>5자 이하로</strong> 콤마로 구분하여 입력해주세요.
        <br />
        올바른 예) east,west,south,north <br />
      </p>
      <form onSubmit={registerCarList}>
        <input type="text" name='CarList'  onChange={onCarListChange} value={carListValue}/>
        <button type="submit">확인</button>
      </form>
      <h4>시도할 횟수를 입력해주세요.</h4>
      <form onSubmit={setTryNumber}>
        <input type="number" name='tryNumber'/>
        <button type="submit">확인</button>
      </form>
      <h4>📄 실행 결과</h4>
      <p style={{whiteSpace: "pre-line"}}>{resultText}</p> 
      <p>최종 우승자: {result} </p>
    </div>
  );
}

export default App;