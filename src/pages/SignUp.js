import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

import { connect } from "react-redux";
import { signUpStart } from "../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectLoad } from "../redux/loading/loading.selector";

/* components */

import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";

const BoxLink = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& a": {
      textDecoration: "underline",
      color: theme.palette.primary.main,
    },
  },
}))(Box);

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
  name: yup.string("Vložte jméno").required("Jméno není vyplňeno"),
});

const SignUp = ({ singUpStart, loading }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const displayName = values.name;
      const { email, password } = values;
      singUpStart({ email, password, displayName });
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
        <h3>Registrace</h3>
        <Grid item xs={11} md={4}>
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
                      disabled={!formik.isValid || loading}
                    >
                      {loading ? <CircularProgress /> : "Registrovat se"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
          <BoxLink>
            <span>Máš účet? </span>
            <Link to="signIn"> Přihlásit se</Link>
          </BoxLink>
        </Grid>
      </MainGrid>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoad,
});

const mapDispatchToProps = (dispatch) => ({
  singUpStart: (userCredential) => dispatch(signUpStart(userCredential)),
});

const Wrapper = styled.section`
  margin-top: 40px;
  .register-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      text-decoration: underline;
      color: blue;
    }
  }
`;
const MainGrid = styled(Grid)`
  min-height: 90vh;
`;
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
