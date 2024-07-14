import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();
  console.log(van)
  
  React.useEffect(() => {
    setLoading(true);
    const fetchVan = async () => {
      try {
        const res = await fetch(`/api/getVan/${id}`)
        if (res.ok) {
          const data = await res.json();
          setVan(data);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchVan();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>There is an error: {error.message}</h1>
  }
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  return (
    <div className='van-detail-container'>
      <Link to={`..${search}`} relative='path' className='back-button'>
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van && (
          <div className='van-detail'>
            <img src={van.imageURL}/>
            <i className={`van-type ${van.type} selected`}>
              {van.type}
            </i>
            <h2>{van.name}</h2>
            <p className='van-price'><span>${van.price}/day</span></p>
            <p>{van.description}</p>
            <button className='link-button'>Rent this van</button>
          </div>
        )}
    </div>
  )
}
