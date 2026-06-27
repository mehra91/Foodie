import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md"

const List = ({url}) => {
  
  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error fetching list')
    }
  }

  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id })
    if (response.data.success) {
      toast.success('Food deleted ')
      fetchList()
    } else {
      toast.error('Delete failed ')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='p-3 sm:p-6 w-full overflow-x-auto'>
      <p className='text-base sm:text-xl font-medium mb-4 sm:mb-6'>All food items</p>

      <div className='border border-gray-200 rounded-xl overflow-x-auto'>
        <table className='w-full text-xs sm:text-sm min-w-max'>

          <thead className='bg-gray-50'>
            <tr className='bg-gray-200'>
              <th className='text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium'>Image</th>
              <th className='text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium'>Name</th>
              <th className='text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium'>Category</th>
              <th className='text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium'>Price</th>
              <th className='text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium'>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item._id} className='border-t border-gray-100 hover:bg-gray-50'>
                <td className='px-2 sm:px-4 py-2 sm:py-3'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-8 sm:w-12 h-8 sm:h-12 rounded-lg object-cover'
                  />
                </td>
                <td className='px-2 sm:px-4 py-2 sm:py-3 font-medium'>{item.name}</td>
                <td className='px-2 sm:px-4 py-2 sm:py-3'>
                  <span className='bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full'>
                    {item.category}
                  </span>
                </td>
                <td className='px-2 sm:px-4 py-2 sm:py-3 font-semibold'>₹{item.price}</td>
                <td className='px-2 sm:px-4 py-2 sm:py-3'>
                  <button
                    onClick={() => removeFood(item._id)}
                    className='flex items-center gap-1 text-red-500 border border-red-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-red-50 cursor-pointer text-xs sm:text-sm'
                  >
                    <MdDelete size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default List