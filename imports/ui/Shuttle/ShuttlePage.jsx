import React, {useState} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ShuttleTable } from "./ShuttleTable";

export const ShuttlePage = () => {
    const [activeTab, setActiveTab] = useState("dropoff");

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    return (
        <>
        <h1>Shuttle Management - {activeTab} </h1>
        <Tabs
            defaultActiveKey="dropoff"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            onSelect={handleSelect} // Optional: handle tab change
            >
            <Tab eventKey="Dropoff" title="Dropoff">
                <ShuttleTable direction="dropoff" />
            </Tab>
            <Tab eventKey="Pickup" title="Pickup">
                <ShuttleTable direction="pickup" />
            </Tab>
        </Tabs>
        </>
    );
};