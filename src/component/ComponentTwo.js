import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { incrementTwo } from '../features/app/appSlice';
import { removeFromComponentList } from '../features/pull-refresh/pullRefreshSlice';
import { setUserName } from '../features/auth/authSlice';

const fetchDataForComponent = createSelector(
  state => state.app.counter.counter2,
  state => state.auth.email,
  state => state.pullRefresh.isPullRefresh,
  (counter2, email, isPullRefresh) => ({counter2, email, isPullRefresh})
);

const ComponentTwo = () => {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
  });

  const { counter2, email, isPullRefresh } = useSelector(fetchDataForComponent);
  // const { counter2, email, isPullRefresh } = useSelector((state) => ({
  //   counter2: state.app.counter.counter2,
  //   email: state.auth.email,
  //   isPullRefresh: state.pullRefresh.isPullRefresh,
  // }));

  const dispatch = useDispatch();
  const [userName, setStateUserName] = useState('');
  
  useEffect(() => {
    if (isPullRefresh) {
      setTimeout(() => {
        dispatch(removeFromComponentList('COMP2'));
      }, 2000);
    }
    
  }, [isPullRefresh]);

  const handleUsernameChange = (event) => {
    setStateUserName(event.target.value);
  };

  const saveUsername = () => {
    dispatch(setUserName(userName))
  };

  return (
      <>
        <h4>Component Two</h4>
        <div>Render count : {renderCount.current}</div>
        <div>Counter : {counter2}<button onClick={() => dispatch(incrementTwo())}>Increment</button></div>
        <div>
          <p>Email : {email}</p>
          Username : <input value={userName} onChange={handleUsernameChange} />
          <button onClick={saveUsername}>Save username</button>
        </div>
      </>  
    );
};

export default React.memo(ComponentTwo);