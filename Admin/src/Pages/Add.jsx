import React, { useEffect, useState } from 'react'
import { assets, url } from '../assets/admin_assets/assets'
import { Form } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
   
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"

  })
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }))
  }

  const submithandler = async (e) => {
    e.preventDefault();
    // console.log(data);    //  is data is actual coming or not

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"

      })
      setImage(false)
      toast.success(response.data.message);

    } else {
      toast.error( response.data.message)
    }


  }


  return (
    <div className='p-6'>
      <p className='text-xl font-medium mb-6'>
        Add food item
      </p>

      <form
        onSubmit={submithandler}
        className='flex flex-col gap-5'>

        <div>
          <p className='text-sm font-medium text-gray-600 mb-2'>
            Upload image
          </p>
          <label
            className='w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden'>
            <img
              src={image
                ?
                URL.createObjectURL(image)
                :
                assets.upload_area} alt="" className='w-full h-full object-cover' />
            <input
              type="file"
              id='image'
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </div>

        <div>
          <p
            className='text-sm font-medium text-gray-600 mb-2'>
            Product name
          </p>
          <input
            onChange={onChangeHandle}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none'
            type="text"
            name='name'
            value={data.name}
            placeholder='Type here'
            required />
        </div>

        <div>
          <p
            className='text-sm font-medium text-gray-600 mb-2'>
            Product description
          </p>
          <textarea
            onChange={onChangeHandle}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none'
            rows="4"
            placeholder='Add content'
            name='description'
            value={data.description}
            required />
        </div>

        <div
          className='flex gap-4'>
          <div
            className='flex-1'>
            <p
              className='text-sm font-medium text-gray-600 mb-2'>
              Price ($)
            </p>
            <input
              onChange={onChangeHandle}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none'
              type="number"
              placeholder='20'
              name='price'
              value={data.price}
              required />
          </div>
          <div
            className='flex-1'>
            <p
              className='text-sm font-medium text-gray-600 mb-2 '>
              Category
            </p>
            <select
              onChange={onChangeHandle}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none '
              name='category'
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
        </div>

        <button
          type='submit'
          className='bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-lg w-fit text-sm font-medium cursor-pointer'>
          Add item
        </button>

      </form>
    </div>
  )
}

export default Add;