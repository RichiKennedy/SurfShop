import React from 'react';
import './Filter.scss';
import useFetch from '../../Hooks/useFetch';


const Filter = ({catId, selectedSubCat, onselectedSubCatChange, setSort}) => {
  const {data} = useFetch(`/sub-categories?[filters][categories][title][$eq]=${catId}`);

  const handleRadioChange = (index) => {
    const selectedValue = data && data[index] ? data[index].id : '';
    onselectedSubCatChange(selectedValue);
  };
 
  return (
     <div className="filter">
        <ul className="form-control-container">
          <h6>sort by</h6>
          {/* POSSIBLE FILTER START */}
          {/* <li className='form-control'>
              <input type='radio' name='sort-by' id='Newest'/>
            <label htmlFor='Newest'> Newest</label>
          </li> */}
          {/* POSSIBLE FILTER ENDS*/}
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
        {data?.map((subCats, index) => (
          <li className='form-control' id={subCats.id} key={subCats.id}>
            <input
              type='radio'
              name='subCategory'
              id={subCats.id}
              value={subCats.id}
              onChange={() => handleRadioChange(index)}
              checked={selectedSubCat === subCats.id}
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
            checked={!selectedSubCat} 
          />
          <label htmlFor='allProducts'> All Products</label>
        </li>
      </ul>
      </div> 
  )
}

export default Filter;