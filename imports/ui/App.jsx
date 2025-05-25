// import React from 'react';
// import { useTracker } from 'meteor/react-meteor-data';
// import { CarsTable } from './Cars/CarsTable.jsx';
// import { LoginForm } from './LoginForm';

// export const App = () => {
//   const user = useTracker(() => Meteor.user());

//   return (
//   <div>
//     <h1>Welcome to Meteor!</h1>
//     {user ? (
//       <div>
//         <h2>Hello, {user.username}</h2>
//         <CarsTable></CarsTable>
//       </div>
//     ) : (
//       <LoginForm />
//     )}

//   </div>
// )};

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { CarsTable } from './Cars/CarsTable.jsx';
import { CreateCompanyForm } from './Admin/CreateCompanyForm.jsx';
import { AdminLayout } from './Admin/AdminLayout';
import { AdminRoutes } from './AdminRoutes.jsx';
import { TasksTable } from './Tasks/TasksTable';
import { ShuttlePage } from './Shuttle/ShuttlePage';
import { ShuttleTable } from './Shuttle/ShuttleTable';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CarsTable />} />
          <Route path="/cars" element={<CarsTable />} />
          <Route path="/tasks" element={<TasksTable />} />
          <Route path="/shuttle" element={<ShuttlePage />} />
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminLayout />} />
          </Route>
        </Route>
        
      </Routes>
    </Router>
  );
}

