import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { createStructuredSelector } from "reselect";

/* components */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForgetPassword from "../components/forgetPassword";

import {
  googleSignInStart,
  emailSignInStart
} from "../redux/user/user.actions";

import { selectLoad } from "../redux/loading/loading.selector";

const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("špatný tvar emailu")
    .required("Email není vyplňen"),
  password: yup.string("Vložte heslo").required("Heslo není vyplňeno")
});

const SignIn = ({ googleSignInStart, emailSignInStart, loading }) => {
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
        <h3>Přihlášení</h3>
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
                      disabled={loading ? true : false}
                    >
                      {loading ? <CircularProgress /> : "Přihlásit se"}
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
                  disabled={loading ? true : false}
                >
                  {loading ? <CircularProgress /> : "Přihlásit přes Google"}
                </Button>
              </Grid>
            </CardContent>
          </Card>
          <div className="register-button">
            <div className="register-button_registrovat">
              <span>Nemáš účet? </span>
              <Link to="signUp"> Registrovat se</Link>
            </div>
            <ForgetPassword />
          </div>
        </Grid>
      </MainGrid>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoad
});

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const Wrapper = styled.section`
  margin-top: 40px;
  .register-button {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a {
      text-decoration: underline;
      color: blue;
    }
  }
  .register-button_registrovat {
    display: flex;
    flex-direction: column;
  }
  .forgotPassword {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
`;
const MainGrid = styled(Grid)`
  min-height: 90vh;
`;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
