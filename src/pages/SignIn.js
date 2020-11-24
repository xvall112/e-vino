import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInWithGoogle, auth } from "../firebase/firebase.utils";
/* components */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  googleSignInStart,
  emailSignInStart
} from "../redux/user/user.actions";

const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("Jejda máte špatný tvar emailu")
    .required("Email není vyplňen"),
  password: yup.string("Vložte heslo").required("Heslo není vyplňeno")
});

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      emailSignInStart(values.email, values.password);

      formik.resetForm({});
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
        <p>Přihlášení</p>
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
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <CircularProgress />
                      ) : (
                        "Přihlásit se"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Grid container justify="center" alignItems="center">
                <span>nebo</span>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={googleSignInStart}
                >
                  Přihlásit přes Google
                </Button>
              </Grid>
            </CardContent>
          </Card>
          <div className="register-button">
            <span>Nemáš účet? </span>
            <Link to="signUp"> Registrovat se</Link>
          </div>
        </Grid>
      </MainGrid>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

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
export default connect(null, mapDispatchToProps)(SignIn);
