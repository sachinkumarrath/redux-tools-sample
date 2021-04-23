import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import ComponentOne from './ComponentOne';
import ComponentTwo from './ComponentTwo';
import ComponentThree from './ComponentThree';
// import { SET_IS_PULL_REFRESH, ADD_COMPONENT_LIST } from '../../reducer/action';
import { setIsPullRefresh, addComponentList } from '../features/pull-refresh/pullRefreshSlice';

const dataSelector = createSelector(
  state => state.pullRefresh.isPullRefresh,
  state => state.pullRefresh.componentList,
  (isPullRefresh, componentList) => ({
    isPullRefresh,
    componentList,
  })
);

const HomePage = () => {
  const { isPullRefresh, componentList } = useSelector(dataSelector);
  const dispatch = useDispatch();

  const refreshPage = () => {
    dispatch(setIsPullRefresh(true));
    dispatch(addComponentList(['COMP1', 'COMP2', 'COMP3']))
  };

  useEffect(() => {
    if (!componentList.length) {
      dispatch(setIsPullRefresh(false));
    }
  }, [componentList]);

  return (
    <>
      <button style={{marginTop: '1rem'}} onClick={refreshPage}>Refresh page</button>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </>
  );
};

export default HomePage;