import { Meteor } from "meteor/meteor";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useTracker } from 'meteor/react-meteor-data';

export const CreateUserForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);

    const user = useTracker(() => Meteor.user());

    const handleClose = () => {
        props.handleClose();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity()) {
            await Meteor.callAsync("createUserForCompanyAdvisor",
                username,
                password,
                email,
                user.profile.company
            );
            handleClose();
        } else {
            console.log("Form is not valid");
            return;
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    }
    const handleCreateUser = async (event) => {
        event.preventDefault();
        if (username && password) {
            try {
                await Meteor.callAsync("createUser", { username, password });
                console.log("User created successfully");
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } else {
            console.log("Username and password are required");
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <FloatingLabel
                    controlId="formUsername"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        autoFocus
                        size="sm"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="formPassword"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        size="sm"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="formEmail"
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        size="sm"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <Button type="submit">Create User</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Form>
        </>
    );
}