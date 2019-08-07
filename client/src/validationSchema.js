import * as yup from "yup";

export default () => {
    let rules = {
        userInput: yup
            .number()
            .max(1111111, "Checking number should not be larger than 1111111")
            .integer()
            .strict()
            .positive()
            .required()
            .label("User input"),
    };

    return yup.object().shape(rules);
};
