import { Meteor } from "meteor/meteor";
import React, { use, useEffect, useState } from 'react';
import { CompanyCollection } from "/imports/api/CompanyCollection.js";
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { CreateUserModal } from "./CreateUserModal";
import { UserTable } from "./UserTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const CompanyProfile = (props) => {
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [admin, setAdmin] = useState("");

    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("company");
    const companyId = useTracker(() => CompanyCollection.findOne({ company: user.profile.company }));

    useEffect(() => {
        if (companyId) {
            setCompany(companyId.company);
            setAddress(companyId.address);
            setPhone(companyId.phone);
            setAdmin(companyId.admin);
        }
    }, [companyId]);

    return (
        <Container>
            <h1>Company Profile</h1>
            <Row>
                <Col>
                    <div>
                        <h2>Company Name: {company}</h2>
                        <p>Address: {address}</p>
                        <p>Phone: {phone}</p>
                        <p>Admin: {admin}</p>
                    </div>
                </Col>
                <Col>
                    <div>
                        <h3>Company Users</h3>
                        <UserTable />

                        {/* Add logic to display users associated with the company */}
                    </div>
                </Col>
            </Row>
        </Container>

    );
}