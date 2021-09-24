import { useContext } from 'react';
import { default as filterContext, FilterContext } from '../FilterContext';

const useFilterContext = (): FilterContext => useContext(filterContext);

export default useFilterContext;
