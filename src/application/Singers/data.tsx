import React, { useReducer, createContext } from 'react';
import { fromJS } from 'immutable';

type ContextProps = {
  data: any;
  dispatch: any;
};

// 实现一个简单的redux

// context
export const CategoryDataContext = createContext<Partial<ContextProps>>({});

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

const reducer = (state: any, action: { data: any; type: string }) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHANGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
};

// Provider组件
export const Data = (props: any) => {
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({ category: '', alpha: '' })
  );

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};
