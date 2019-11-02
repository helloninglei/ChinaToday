import React from 'react';
import './App.css';
import NewsList from './components/News/newsList'
import MyPagenation from './components/pagination'

function App() {
  return (
      <div>
          <NewsList />
          <MyPagenation />
      </div>
  );
}

export default App;
