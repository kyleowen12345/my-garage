import React from 'react'
import { Select } from 'antd';
import {  useDispatch,useSelector } from "react-redux";
import { getStoreType } from '../../actions/storeActions';
import {useHistory} from 'react-router-dom'

const StoreTypeSort = () => {
    const { Option } = Select;
    const storeType = useSelector((state) => state.storeType);
    const { loader } = storeType;
    const history=useHistory()
    const dispatch = useDispatch();
    
    const handleSelect=(value)=>{
        dispatch(getStoreType(value,history))
         
       }
    return (
        <div className="sorter">
            <h2>Select Store-type</h2>
          <Select defaultValue="Click here to select" style={{ width:"50vw", minWidth:300}} showSearch onChange={handleSelect} loading={loader} placeholder="Select a Store Type">
      <Option value="Automotive">Automotive</Option>
      <Option value="Baby & Toddler">Baby & Toddler</Option>
      <Option value="Clothing & Shoes">Clothing & Shoes</Option>
      <Option value="Computers">Computers</Option>
      <Option value="Electronics">Electronics</Option>
      <Option value="Entertainment & Arts">Entertainment & Arts</Option>
      <Option value="Food & Gifts">Food & Gifts</Option>
      <Option value="Health & Beauty">Health & Beauty</Option>
      <Option value="Home & Garden">Home & Garden</Option>
      <Option value="Personal & Home Services">Personal & Home Services</Option>
      <Option value="Restaurants & Dining">Restaurants & Dining</Option>
      <Option value="Software">Software</Option>
      <Option value="Sports & Outdoors">Sports & Outdoors</Option>
      <Option value="Travel">Travel</Option>
      <Option value="Office & Professional Services">Office & Professional Services</Option>
    </Select>
        </div>
    )
}

export default StoreTypeSort
