import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe("🚀 random 테스트 케이스", () => {
    test("Random의 pickNumberInRange 메소드를 사용하여 랜덤값을 생성해야합니다.", () => {
        const random = global.MissionUtils.Random.pickNumberInRange;
        render(<App/>);
        expect(random.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});

describe("✅ input 테스트 케이스", () => {
    test("text input의 입력값에 맞게 입력값이 변해야합니다.", () => {
        const { container } = render(<App/>);
        const $input = container.querySelector("#text-input");
        fireEvent.change($input, { target: { value: "rase" } });
        const textInput = screen.getByDisplayValue("rase");
        expect(textInput.value).toBe("rase");
    });
    test("자동차의 이름은 (,)로 구분하며 버튼을 누른 경우 각각의 자동차이름이 6글자 이상일 경우 경고창으로 나타내야 합니다.", () => {
        const alertMock = jest.spyOn(window, "alert");
        const { container } = render(<App/>);
        const $input = container.querySelector("#text-input");
        const $button = container.querySelector("#text-button");
        fireEvent.change($input, { target: { value: "a,ab,abc,abcd,abcdf" } });
        fireEvent.click($button);
        fireEvent.change($input, { target: { value: "a,ab,abc,abcd,abcdfe" } });
        fireEvent.click($button);
        expect(alertMock).toBeCalledTimes(1);
    });
    test("number input의 입력값에 맞게 입력값이 변해야합니다.", () => {
        const { container } = render(<App/>);
        const $input = container.querySelector("#number-input");
        fireEvent.change($input, { target: { value: '9' } });
        const $numberInput = screen.getByDisplayValue('9');
        expect($numberInput.value).toBe("9");
    });
    test("버튼을 누를 경우 이동하는 입력값이 0이 들어올 경우 경고창으로 나타내야 합니다.", () => {
        const mockAlart = jest.spyOn(window, "alert");
        const { container } = render(<App/>);
        const $input = container.querySelector("#number-input");
        const $button = container.querySelector("#number-button");
        fireEvent.change($input, { target: { value: '0' } });
        fireEvent.click($button);
        expect($input.value).toBe('0');
        expect(mockAlart).toHaveBeenCalledTimes(1);
    });
});

describe("🏎 자동차 테스트 케이스", () => {
    test("자동차의 개수에 맞게 화면에 자동차가 출력되어야 합니다.", () => {});
    test("전진하는 조건은 pickNumberInRange 메소드를 사용하여 4 이상인 경우에만 전진합니다.", () => {});
    test("게임이 종료된 뒤에 화면에 우승자가 출력되어야 합니다.", () => {});
});

describe("🎊 승리 테스트 케이스", () => {
    test("우승자가 여러명일 경우 쉼표(,)를 이용하여 구분하여 출력되어야 합니다.", () => {});
});