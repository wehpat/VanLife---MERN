import React from 'react'
import { Link } from 'react-router-dom';


export default function Dashboard() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchVans = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getVans`);
        if (res.ok) {
          const data = await res.json();
          setVans(data.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.messsage);
        setLoading(false)
      }
    };
    fetchVans();
  }, [])

  // function renderVanElement(vans) {
  //   const hostVansEls = vans.map((van) => (
  //     <div className='host-van-single' key={van._id}>
  //       <img src={van.imageURL} alt={van.name}/>
  //       <div className='host-van-info'> 
  //         <h3>{van.name}</h3>
  //         <p>{van.price}</p>
  //         <Link to={`vans/${van._id}`}>View</Link>
  //       </div>
  //     </div>
  //   ))
    
  //   return (
  //     <div className='host-vans-list'>
  //       <section>{hostVansEls}</section>
  //     </div>
  //   )
  // }

  // Arrow Function doesn't work*
  const renderVanElement =  (vans) => {
    const hostVansEls = vans.map((van) => (
      <div className='host-van-single' key={van._id}>
        <img src={van.imageURL} alt={`Photo of ${van.name}`}/>
        <div className='host-van-info'>
          <h3>{van.name}</h3>
          <p>${van.price}</p>
        </div>
      </div>
    ))
    return hostVansEls;
  }

  return (
    <>
      <section className='host-dashboard-earnings'>
        <div className='info'>
          <h1>Welcome!</h1>
          <p>Income last <span>30 days</span></p>
          <h2>$2,260</h2>
        </div>
        <Link to='income'>Details</Link>
      </section>
      <section className='host-dashboard-vans'>
        <div className='top'>
          <h2>Your listed vans</h2>
          <Link to='vans'>View all</Link>
        </div>
        {
          loading && !vans ? <h1>Loading...</h1> :
          (
            <>
              {renderVanElement(vans)}
            </>
          )
        }
      </section>
    </>
  )
}
