import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import Feed from './components/Feed/Feed';
import FeedArticles from './components/NewsDetails/NewsDetails';

function App() {
  return (

      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/feeds" element={<Feed />} />
            <Route path="/feeds/:id" element={<FeedArticles />} />
        </Routes>
      </Router>
  );
}

export default App;
