import React from 'react';
import './App.css';
import NewsList from './components/News/newsList'
import NewsDetail from './components/News/newsDetail'
import MyPagenation from './components/pagination'

function App() {
  return (

      <div>
          <NewsList />
          <MyPagenation />
          <NewsDetail />
      </div>
  );
}

export default App;
