import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from 'react';
import { CompanyCollection } from "/imports/api/CompanyCollection.js";
import { PorterTable } from "./PorterTable";
import { DriverTable } from "./DriverTable";
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
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
            <Row>
                <Col xs={2}>
                    <div>
                        <h2>Company Name: </h2>
                        <h4>{company}</h4>
                        <p>Address: {address}</p>
                        <p>Phone: {phone}</p>
                        <p>Admin: {admin}</p>
                    </div>
                </Col>
                <Col></Col>
                <Col>
                    <div>
                        <h3>Company Users</h3>
                        <UserTable />
                    </div>
                </Col>
                <Col>
                    <div>
                        <h3>Company Porters</h3>
                        <PorterTable />
                    </div>
                </Col>
                <Col>
                    <div>
                        <h3>Company Drivers</h3>
                        <DriverTable />
                    </div>
                </Col>
            </Row>
        </Container>

    );
}