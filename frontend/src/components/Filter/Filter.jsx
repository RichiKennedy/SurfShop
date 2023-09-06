import React, { useEffect, useState } from 'react'
import './Filter.scss'
import useFetch from '../../Hooks/useFetch'


const Filter = ({catId, selectedSubCat, onselectedSubCatChange}) => {
  const [sort, setSort] = useState(null)
  const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][title][$eq]=${catId}`)

  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     const isChecked = e.target.checked;
    
  //     const updatedselectedSubCat = isChecked
  //     ? [...selectedSubCat, value]
  //     : selectedSubCat.filter((item) => item !== value);

  //   onselectedSubCatChange(updatedselectedSubCat);
  // };

  const handleRadioChange = (index) => {
    const selectedValue = data && data[index] ? data[index].id : '';
    onselectedSubCatChange(selectedValue);
  };
 
console.log(selectedSubCat)
  return (
     <div className="filter">
        <ul className="form-control-container">
          <h6>sort by</h6>
          <li className='form-control'>
              <input type='radio' name='sort-by' id='Newest'/>
            <label htmlFor='Newest'> Newest</label>
          </li>
          <li className='form-control'>
              <input type='radio' value='highToLow' name='sort-by' id='highToLow' onChange={e => setSort('highToLow')} />
            <label htmlFor='highToLow'> Price (High to Low)</label>
          </li>
          <li className='form-control'>
              <input type='radio' value='lowToHigh' name='sort-by' id='lowToHigh'onChange={e => setSort('lowToHigh') } />
            <label htmlFor='lowToHigh'> Price (Low to High)</label>
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
            value='' // Set it to the default value
            onChange={() => handleRadioChange(-1)}
            checked={!selectedSubCat} // Check if no sub-category is selected
          />
          <label htmlFor='allProducts'> All Products</label>
        </li>
      </ul>
      </div> 
  )
}

export default Filter