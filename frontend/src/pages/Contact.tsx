import React  from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { forwardRef, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { CREATE_CONTACT_MESSAGE } from "../Graphql/Mutation";

import "../styles/Contact.css";
import { useMutation } from "@apollo/client";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [successResponseMsg, setSuccessResponseMsg] = useState("");
    const [errorResponseMsg, setErrorResponseMsg] = useState("");
    const [createContactMessage, { error }] = useMutation(CREATE_CONTACT_MESSAGE);

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
        <Grid item xs={2}>
            <></>
        </Grid>
        <Grid item xs={6}>
            <div>
                <div className="contact-heading">
                    <h1>Send us a message:</h1>
                </div>

                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="input-name"
                            label="Full Name"
                            value={name}
                            onChange={(event: any) => {
                                setName(event.target.value);
                            }}
                            variant="outlined"
                        />
                        <div className="break-line-form"></div>
                        <TextField
                            id="input-email"
                            label="Email"
                            value={email}
                            onChange={(event: any) => {
                                setEmail(event.target.value);
                            }}
                            variant="outlined"
                        />
                        <div className="break-line-form"></div>
                        <TextField
                            id="input-message"
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={12}
                            value={message}
                            onChange={(event: any) => {
                                setMessage(event.target.value);
                            }}
                        />
                        <div className="break-line-form"></div>
                        <Button
                            type="submit"
                            onClick={() => {
                                setErrorResponseMsg("");
                                setSuccessResponseMsg("");
                                createContactMessage({ variables: { name: name, email: email, message: message } })
                                .then((r) => {
                                  if (r.data.createContactMessage.successful === true) {
                                    setSuccessResponseMsg(r.data.createContactMessage.message);
                                  } else {
                                    setErrorResponseMsg(r.data.createContactMessage.message);
                                  }
                                  handleClick();
                                  setEmail("");
                                  setName("");
                                  setMessage("");
                                })
                                .catch((r) => {
                                  setErrorResponseMsg(r.toString());
                                  handleClick();
                                });
                            }}
                            variant="contained"
                        >Send</Button>
                    </form>
                </div>
            </div>
        </Grid>
        <Grid item xs={2}>
            <></>
        </Grid>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {errorResponseMsg !== "" ? (
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {errorResponseMsg}
            </Alert>
            ) : (
            <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
            >
                {successResponseMsg}
            </Alert>
            )}
        </Snackbar>
        </>
    );
};

export default Contact;
