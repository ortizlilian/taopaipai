import React  from 'react';
import { useMutation } from "@apollo/client";
import { CREATE_NEWSLETTER } from "../Graphql/Mutation";
import { forwardRef, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import "../styles/components/Newsletter.css";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Newsletter = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [successResponseMsg, setSuccessResponseMsg] = useState("");
    const [errorResponseMsg, setErrorResponseMsg] = useState("");

    const [createNewsletter, { error }] = useMutation(CREATE_NEWSLETTER);

    if (error) {
        console.log(error);
    }

    const handleClick = () => {
        setOpen(true);
    };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div id="component-newsletter">
        <div className="newsletter-form">
          <p>Join our email list:</p>
          <form onSubmit={handleSubmit}>
            <TextField
              id="newsletter-name"
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(event: any) => {
                setName(event.target.value);
              }}
            />
            <div className="break-line-form"></div>
            <TextField
              id="newsletter-email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(event: any) => {
                setEmail(event.target.value);
              }}
            />
            <div className="break-line-form"></div>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                setErrorResponseMsg("");
                setSuccessResponseMsg("");
                createNewsletter({ variables: { name: name, email: email } })
                  .then((r) => {
                    if (r.data.createNewsletter.successful === true) {
                      setSuccessResponseMsg(r.data.createNewsletter.message);
                    } else {
                      setErrorResponseMsg(r.data.createNewsletter.message);
                    }
                    handleClick();
                    setEmail("");
                    setName("");
                  })
                  .catch((r) => {
                    setErrorResponseMsg(r.toString());
                    handleClick();
                  });
              }}
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {successResponseMsg !== "" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successResponseMsg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorResponseMsg}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default Newsletter;
