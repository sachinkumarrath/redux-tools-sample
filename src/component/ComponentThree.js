import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { createSelector } from 'reselect';
import { incrementThree } from '../features/app/appSlice';
import { fetchMockData } from '../features/pull-refresh/pullRefreshSlice';

const fetchDataForComponent = createSelector(
  state => state.app.counter.counter3,
  state => state.auth.email,
  state => state.auth.userName,
  state => state.pullRefresh.isPullRefresh,
  (counter3, email, userName, isPullRefresh) => ({counter3, email, userName, isPullRefresh})
);

const ComponentThree = () => {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
  });
  const dispatch = useDispatch();
  const { counter3, email, userName, isPullRefresh } = useSelector(fetchDataForComponent);
  // const { counter3, email, userName, isPullRefresh } = useSelector((state) => ({
  //   counter3: state.app.counter.counter2,
  //   email: state.auth.email,
  //   userName: state.auth.userName,
  //   isPullRefresh: state.pullRefresh.isPullRefresh,
  // }));

  useEffect(() => {
    if (isPullRefresh) {
      dispatch(fetchMockData({ timeout: 3000, componentId: 'COMP3' }));
      // setTimeout(() => {
      //   dispatch(removeFromComponentList('COMP3'))
      // }, 3000);
    }
  }, [isPullRefresh]);


  return (
      <>
        <h4>Component Three</h4>
        <div>Render count : {renderCount.current}</div>
        <div>Counter : {counter3}<button onClick={() => dispatch(incrementThree())}>Increment</button></div>
        <div>
          <p>Email : {email}</p>
          <p>Username : {userName}</p>
        </div>
      </>  
    );
};

export default React.memo(ComponentThree);