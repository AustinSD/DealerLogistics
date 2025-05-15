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
    const [role, setRole] = useState("");

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
            await Meteor.callAsync("createUserForCompany",
                username,
                password,
                email,
                user.profile.company,
                role
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
        } else if (name === "role") {
            setRole(value);
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
                <FloatingLabel
                controlId="formRoleSelect"
                label="Role"
                className="mb-3"
                >
                    <Form.Select
                        required
                        size="sm"
                        name="role"
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="Advisors">Advisors</option>
                        <option value="Porters">Porters</option>
                    </Form.Select>
                </FloatingLabel>
                <Button type="submit">Create User</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Form>
        </>
    );
}