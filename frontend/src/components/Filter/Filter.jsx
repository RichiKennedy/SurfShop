import React, { useEffect } from 'react';
import './Filter.scss';
import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';


const Filter = ({ onselectedSubCatChange, setSort, selectedSubCat }) => {
  const { category, subCategory } = useParams();
  const viewAllSubCats = `/sub-categories?[filters][categories][title][$eq]=${category}`;
  const subCatFit = `/fits?[filters][sub_categories][title][$eq]=${subCategory}`;
  const isViewAll = subCategory === 'view-all';
  const apiUrl = isViewAll ? viewAllSubCats : subCatFit;

  const { data: smallSubCat } = useFetch(apiUrl);
  useEffect(() => {
    console.log('Fetching data from API:', apiUrl);
  }, [apiUrl]);
  
  console.log('smallSubCat', smallSubCat)
  const handleRadioChange = (index) => {
    const selectedValue = smallSubCat && smallSubCat[index] ? smallSubCat[index].attributes.title : '';
    onselectedSubCatChange(selectedValue);
  };
 
  return (
     <div className="filter">
        <ul className="form-control-container">
          <h6>sort by</h6>
          <li className='form-control'>
              <input type='radio' value='lowToHigh' name='sort-by' id='lowToHigh'onChange={e => setSort('asc') } />
            <label htmlFor='asc'> Price (Low to High)</label>
          </li>
          <li className='form-control'>
              <input type='radio' value='highToLow' name='sort-by' id='highToLow' onChange={e => setSort('desc')} />
            <label htmlFor='desc'> Price (High to Low)</label>
          </li>
        </ul>
        
        <ul className="form-control-container">
        <h6>type of product</h6>
        {smallSubCat?.map((subCats, index) => (
          <li className='form-control' id={subCats.id} key={subCats.id}>
            <input
              type='radio'
              name='subCategory'
              id={subCats.id}
              value={subCats.id}
              onChange={() => handleRadioChange(index)}
              checked={subCategory === subCats.attributes.title}
            />
            <label htmlFor={subCats.attributes.title}> {subCats.attributes.title} </label>
          </li>
        ))}
        <li className='form-control'>
          <input
            type='radio'
            name='subCategory'
            id='allProducts'
            value=''
            onChange={() => handleRadioChange(-1)}
            checked={!subCategory} 
          />
          <label htmlFor='allProducts'> All Products</label>
        </li>
      </ul>
      </div> 
  )
}
export default Filter;