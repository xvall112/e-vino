import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

/* components */

import {
  Grid,
  Box,
  CircularProgress,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

import ForgetPassword from "../components/forgetPassword";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  googleSignInStart,
  emailSignInStart,
} from "../redux/user/user.actions";
import { selectLoad } from "../redux/loading/loading.selector";

const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("špatný tvar emailu")
    .required("Email není vyplňen"),
  password: yup.string("Vložte heslo").required("Heslo není vyplňeno"),
});

const SignIn = ({ googleSignInStart, emailSignInStart, loading }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      emailSignInStart(values.email, values.password);
      formik.resetForm({});
    },
  });

  return (
    <Wrapper>
      <MainGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062"
          alt="wine"
          style={{ height: "12vh" }}
        />
        <h3>Přihlášení</h3>
        <Grid item xs={11} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
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
            </Box>
          </Paper>
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
  loading: selectLoad,
});

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
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
