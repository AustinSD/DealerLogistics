import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/imports/api/carsMethods.js';
import '../imports/api/companyMethods.js';
import "../imports/api/shuttleMethods.js";
import '../imports/api/tasksMethods.js';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App />);
});