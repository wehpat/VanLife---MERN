import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'


export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null); 

  const typeFilter = searchParams.get('type');

  React.useEffect(() => {
    const fetchVans = async() => {
      try {
        const res = await fetch(`/api/getVans`)
        if(res.ok) {
          const data = await res.json();
          setVans(data.data);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchVans();
  }, [])
  const displayedVans = typeFilter ? vans.filter(van=> van.type === typeFilter) : vans
  const vanElements = displayedVans.map(van => (
    <div key={van._id} className='van-tile'>
      <Link
        to={van._id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter
        }}
        >
          <img src={van.imageURL} />
          <div className='van-info'>
            <h3>{van.name}</h3>
            <p>{van.price}</p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))
  const handleFilterChange = (key, value) => {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    }); 
  };
  
  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>There is an error: {error.message}</h1>
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list-filter-button'>
        <button
        onClick={() => handleFilterChange('type', 'simple')} 
        className={`van-type simple ${typeFilter === 'simple'? 'selected' : ''}`}>
          Simple
        </button>
        <button
        onClick={() => handleFilterChange('type', 'luxury')} 
        className={`van-type luxury ${typeFilter === 'luxury'? 'selected' : ''}`}>
          Luxury
        </button>
        <button
        onClick={() => handleFilterChange('type', 'rugged')} 
        className={`van-type rugged ${typeFilter === 'rugged'? 'selected' : ''}`}>
          Rugged
        </button>
      </div>
      <div className='van-list'>
        {vanElements}
      </div>
    </div>
  )
}
