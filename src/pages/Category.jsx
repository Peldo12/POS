import { useState, useEffect, useContext } from 'react'

import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import customFetch from '../utils/api'

const Category = ({setToast}) => {
  const [isLoading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await customFetch("/api/category")
        setCategories(data.data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [])
  return (
    <>
      <Navbar />
      {isLoading && <Loading /> ||
      <div className="mt-16">
        <div className="grid grid-cols-[1fr_2fr_1fr]">
          <span className="text-center text-lg bold">ID</span>
          <span className="text-center text-lg bold">Category</span>
          <span className="text-center text-lg bold">Sub</span>
        </div>
        {categories.map(el => {
          return <div key={el.id} className="grid grid-cols-[1fr_2fr_1fr] px-2.5">
            <span className="">{el.id}</span>
            <span className="text-center">{el.name}</span>
            <span className="text-center">{el.sub}</span>
          </div>
        })
        }</div>  
      }
    </>
  )
}

export default Category