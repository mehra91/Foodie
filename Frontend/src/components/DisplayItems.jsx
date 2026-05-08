import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext';
import TopFoodItems from './TopFoodItems'
// import { food_list } from '../assets/frontend_assets/assets';


const DisplayItems = ({ category }) => {
  const{food_list} = useContext(StoreContext);
  return (
    <div className='  h-auto w-5xl flex flex-col items-start justify-between gap-y-5 '>
      <h2 className='text-2xl capitalize font-bold tracking-wide'>
        top dishes near you
      </h2>
      <div className='flex items-center justify-start   flex-wrap gap-y-8  gap-x-15  '>
        {food_list.map((Items, idx) => {
          if (category === 'All' || category ===Items.category ) {
            return (
              <TopFoodItems key={idx} id={Items._id} name={Items.name} img={Items.image} price={Items.price} description={Items.description} category={Items.category} />
            )
          }


        })}


      </div>

    </div>
  )
}

export default DisplayItems