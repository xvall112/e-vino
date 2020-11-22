import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

/* components */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("Jejda máte špatný tvar emailu")
    .required("Email není vyplňen"),
  password: yup
    .string("Vložte heslo")
    .min(6, "Heslo musí mít nejméně 6 znaků")
    .required("Heslo není vyplňeno"),
  passwordConfirmation: yup
    .string()
    .required("Hesla nesouhlasí")
    .oneOf([yup.ref("password"), null], "Hesla nesouhlasí"),
  name: yup.string("Vložte jméno").required("Jméno není vyplňeno")
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirmation: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );

        await createUserProfileDocument(user, {
          displayName: JSON.stringify(values.name, null, 2)
        });

        formik.resetForm({});
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <Wrapper>
      <MainGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>E-víno</h1>
        <p>Registrace</p>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      name="name"
                      label="Jméno"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      name="password"
                      label="Heslo"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      label="Ověření hesla"
                      type="password"
                      value={formik.values.passwordConfirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.passwordConfirmation &&
                        Boolean(formik.errors.passwordConfirmation)
                      }
                      helperText={
                        formik.touched.passwordConfirmation &&
                        formik.errors.passwordConfirmation
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <CircularProgress />
                      ) : (
                        "Registrovat se"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          <div className="register-button">
            <span>Máš účet? </span>
            <Link to="signIn"> Přihlásit se</Link>
          </div>
        </Grid>
      </MainGrid>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .register-button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const MainGrid = styled(Grid)`
  min-height: 90vh;
`;
export default SignUp;
