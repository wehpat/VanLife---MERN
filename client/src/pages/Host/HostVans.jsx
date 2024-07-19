import React from 'react'
import { Link } from 'react-router-dom';

export default function HostVans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setErorr] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const fetctVans = async () => {
      try {
        const res = await fetch(`/api/getVans`);
        if (res.ok) {
          const data = await res.json();
          setVans(data.data);
          setLoading(false)
        }
      } catch (err) {
        setErorr(err.message);
        setLoading(false);
      }
    }
    fetctVans();
  }, []);

  const hostVansEls = vans.map(van => (
    <Link to={van._id} key={van._id} className='host-van-link-wrapper'>
      <div className='host-van-single' key={van._id}>
        <img src={van.imageURL} alt={van.name}/>
        <div className='host-van-info'>
          <h3>{van.name}</h3>
          <p>${van.price}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
        {
          vans.length > 0 ? (
            <section>
              {hostVansEls}
            </section>
          ) : (
            <h2>Loading...</h2>
          )
        }
      </div>
    </section>
  )
}
