import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe("๐ random ํ์คํธ ์ผ์ด์ค", () => {
    test("Random์ pickNumberInRange ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ๋๋ค๊ฐ์ ์์ฑํด์ผํฉ๋๋ค.", () => {
        const random = global.MissionUtils.Random.pickNumberInRange;
        render(<App/>);
        expect(random.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});

describe("โ input ํ์คํธ ์ผ์ด์ค", () => {
    test("text input์ ์๋ ฅ๊ฐ์ ๋ง๊ฒ ์๋ ฅ๊ฐ์ด ๋ณํด์ผํฉ๋๋ค.", () => {
        const { container } = render(<App/>);
        const $input = container.querySelector("#text-input");
        fireEvent.change($input, { target: { value: "rase" } });
        const textInput = screen.getByDisplayValue("rase");
        expect(textInput.value).toBe("rase");
    });
    test("์๋์ฐจ์ ์ด๋ฆ์ (,)๋ก ๊ตฌ๋ถํ๋ฉฐ ๋ฒํผ์ ๋๋ฅธ ๊ฒฝ์ฐ ๊ฐ๊ฐ์ ์๋์ฐจ์ด๋ฆ์ด 6๊ธ์ ์ด์์ผ ๊ฒฝ์ฐ ๊ฒฝ๊ณ ์ฐฝ์ผ๋ก ๋ํ๋ด์ผ ํฉ๋๋ค.", () => {
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
    test("number input์ ์๋ ฅ๊ฐ์ ๋ง๊ฒ ์๋ ฅ๊ฐ์ด ๋ณํด์ผํฉ๋๋ค.", () => {
        const { container } = render(<App/>);
        const $input = container.querySelector("#number-input");
        fireEvent.change($input, { target: { value: '9' } });
        const $numberInput = screen.getByDisplayValue('9');
        expect($numberInput.value).toBe("9");
    });
    test("๋ฒํผ์ ๋๋ฅผ ๊ฒฝ์ฐ ์ด๋ํ๋ ์๋ ฅ๊ฐ์ด 0์ด ๋ค์ด์ฌ ๊ฒฝ์ฐ ๊ฒฝ๊ณ ์ฐฝ์ผ๋ก ๋ํ๋ด์ผ ํฉ๋๋ค.", () => {
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

describe("๐ ์๋์ฐจ ํ์คํธ ์ผ์ด์ค", () => {
    test("์๋์ฐจ์ ๊ฐ์์ ๋ง๊ฒ ํ๋ฉด์ ์๋์ฐจ๊ฐ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {});
    test("์ ์งํ๋ ์กฐ๊ฑด์ pickNumberInRange ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ 4 ์ด์์ธ ๊ฒฝ์ฐ์๋ง ์ ์งํฉ๋๋ค.", () => {});
    test("๊ฒ์์ด ์ข๋ฃ๋ ๋ค์ ํ๋ฉด์ ์ฐ์น์๊ฐ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {});
});

describe("๐ ์น๋ฆฌ ํ์คํธ ์ผ์ด์ค", () => {
    test("์ฐ์น์๊ฐ ์ฌ๋ฌ๋ช์ผ ๊ฒฝ์ฐ ์ผํ(,)๋ฅผ ์ด์ฉํ์ฌ ๊ตฌ๋ถํ์ฌ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {});
});