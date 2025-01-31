import { _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

describe("_saveQuestion", () => {
    it("should return an object if save question is successful", async() => {
        var data = {
            optionOneText: "Ice Cream Party",
            optionTwoText: "Pizza Party",
            author: "sarahedo"
        };
        var result = await _saveQuestion(data);
        expect(typeof result).toEqual("object");
    });

    it("should throw an error if the parameters are invalid", async() => {
        var data = {
            optionOneText: "Ice Cream Party",
            optionTwoText: "Pizza Party"
        };
        var result = await _saveQuestion(data).catch((e) => e);
        expect(result).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_saveQuestionAnswer", () => {
    it("should return true after saving new question answer", async() => {
        const response = await _saveQuestionAnswer({authedUser: "sarahedo", qid: "vthrdm985a262al8qx3do", answer: "optionOne"});

        expect(response).toBeTruthy();
    });

    it("should throw an error if the parameters are invalid", async() => {
        const response = await _saveQuestionAnswer({authedUser: "sarahedo", qid: undefined, answer: "optionOne"}).catch((e) => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});