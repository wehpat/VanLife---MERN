import React from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  console.log(currentVan);

  React.useEffect(() => {
    setLoading(true);
    const fetchSelectedVan = async () => {
      try {
        const res = await fetch(`/api/getVan/${id}`)
        if (res.ok) {
          const data = await res.json();
          setCurrentVan(data);
          setLoading(false);
        } else {
          setError('Failed to fetch van data');
        }
      } catch(err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedVan();
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>There was an error...: {error}</h1>
  }

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  return (
    <section>
      <Link to='..' relative='path' className='back-button'>
        &larr; <span>Back to all vans</span>
      </Link>
      {
        currentVan &&
          <div className='host-van-detail-layout-container'>
            <img src={currentVan.imageURL} alt={currentVan.name}/>
            <div className='host-van-detail-info-text'>
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}</h4>
            </div>
            
            <nav className='host-van-detail-nav'>
              <NavLink to='.' end style={({isActive}) => isActive? activeStyles : null}>
                Details
              </NavLink>
              <NavLink to='pricing' style={({isActive}) => isActive? activeStyles : null}>
                Pricing
              </NavLink>
              <NavLink to='photos' style={({isActive}) => isActive? activeStyles : null}>
                Photos
              </NavLink>
            </nav>
            <Outlet context={{currentVan}}/>
          </div>
      }
    </section>
  )
}
