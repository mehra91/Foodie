import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext';
import TopFoodItems from './TopFoodItems'



const DisplayItems = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className='  h-auto w-5xl flex flex-col items-start justify-between gap-y-5 '>
      <h2 className='text-2xl capitalize font-bold tracking-wide'>
        top dishes near you
      </h2>
      <div className='flex items-center w-full justify-start flex-wrap gap-y-8 gap-x-15'>

        {/* Loading state */}
        {food_list.length === 0
          ? <p className='text-gray-400 text-sm font-medium'>Loading dishes...</p>

          : food_list.filter(item => category === 'All' || category === item.category).length === 0
            ? (
              // No dishes in selected category
              <div className='flex flex-col items-center justify-center  w-full h-auto   gap-3'>
              
                <p className='text-lg font-bold text-gray-700'>No dishes available</p>
                <p className='text-base text-gray-400 '>
                  No items found 
                  
                </p>
              </div>
            )
            : food_list.map((Items, idx) => {
              if (category === 'All' || category === Items.category) {
                return (
                  <TopFoodItems
                    key={idx}
                    id={Items._id}
                    name={Items.name}
                    img={Items.image}
                    price={Items.price}
                    description={Items.description}
                    category={Items.category}
                  />
                )
              }
            })
        }

      </div>

    </div>
  )
}

export default DisplayItems