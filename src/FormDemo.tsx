import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  TextField,
  MenuItem,
  Box,
  FormGroup,
} from "@material-ui/core";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { object, string, number, boolean, array } from 'yup';

const initialValues = {
  fullName: "",
  initialInvestment: undefined,
  investmentRisk: [],
  commentAboutInvestmentList: "",
  acceptedTermsAndConditions: false,
};

const validationSchema = object({
  fullName: string().required().min(2).max(100).trim(),
  initialInvestment: number().required().min(0).max(100),
  investmentRisk: array(string().oneOf(['high', 'medium' ,'low'])).min(1),
  dependents:number().required().min(0).max(5),
  acceptedTermsAndConditions: boolean().oneOf([true])
})

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}
export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    value: props.value,
    type: "checkbox",
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
// 참고자료 : https://blog.doitreviews.com/development/2020-05-05-formik-tutorial/

export default function FormDemo() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>
        <Formik 
        validationSchema={validationSchema}
        initialValues={initialValues} onSubmit={() => alert("formik!")}>
          {(
            { values, errors, touched } // values에는 initialValues가 그대로 전달된다
          ) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="fullName" as={TextField} label="full name" helperText={touched.fullName && errors.fullName} error={touched.fullName && errors.fullName}/>
                {/* 에러를 명확하게 나타내기 위해 error 속성 및 helperText 속성을 사용할 수 있다 */}
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="initialInvestment"
                    type="number"
                    as={TextField}
                    label="Intiail Investment"
                  />
                <ErrorMessage name="initialInvestment" />
                {/* ErrorMessage 컴포넌트를 사용하면 간단하게 에러를 처리할 수 있다*/}
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name="investmentRisk"
                    value="high"
                    label="high - super risky"
                  />
                  <MyCheckbox
                    name="investmentRisk"
                    value="medium"
                    label="medium - risky"
                  />
                  <MyCheckbox
                    name="investmentRisk"
                    value="low"
                    label="low - safe"
                  />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    label="comment about investment risk"
                    as={TextField}
                    multiline
                    rows={3}
                    rowsMax={10}
                  />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="dependents"
                    label="dependents"
                    as={TextField}
                    select
                  >
                    <MenuItem value={-1}>Select one</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name="acceptedTermsAndConditions"
                    label="Accept terms and conditions"
                  />
                </FormGroup>
              </Box>
              
              <Button type="submit">Submit</Button>
              <pre>{JSON.stringify(errors, null, 2)}</pre> 
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
