import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { createSelector } from 'reselect';
import { incrementOne } from '../features/app/appSlice';
import { setEmail } from '../features/auth/authSlice';
import { removeFromComponentList } from '../features/pull-refresh/pullRefreshSlice';

const fetchDataForComponent = createSelector(
  state => state.app.counter.counter1,
  state => state.auth.userName,
  state => state.pullRefresh.isPullRefresh,
  (counter1, userName, isPullRefresh) => ({counter1, userName, isPullRefresh})
);

const ComponentOne = () => {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
  });

  const { counter1, userName, isPullRefresh } = useSelector(fetchDataForComponent);
  // const { counter1, userName, isPullRefresh } = useSelector((state) => ({
  //   counter1: state.app.counter.counter1,
  //   userName: state.auth.userName,
  //   isPullRefresh: state.pullRefresh.isPullRefresh,
  // }));
  const dispatch = useDispatch();
  const [email, setEmailState] = useState('');

  useEffect(() => {
    if (isPullRefresh) {
      setTimeout(() => {
        dispatch(removeFromComponentList('COMP1'))
      }, 1000);
    }
  }, [isPullRefresh]);

  const handleEmail = (event) => {
    setEmailState(event.target.value);
  };

  const saveEmail = () => dispatch(setEmail(email));

  return (
    <>
      <h4>Component One</h4>
      <div>Render count : {renderCount.current}</div>
      <div>Counter : {counter1}<button onClick={() => dispatch(incrementOne())}>Increment</button></div>
      <div>
        <p>Username : {userName}</p>
        Email : <input value={email} onChange={handleEmail} />
        <button onClick={saveEmail}>Save Email</button>
      </div>
    </>  
  );
};

export default React.memo(ComponentOne);