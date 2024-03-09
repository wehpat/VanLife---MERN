import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:3000/host/vans")
            .then((res) => {
                console.log(res.data.data)
                setVans(res.data.data)
                setLoading(false)
                
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        // async function loadVans() {
        //     setLoading(true)
        //     try {
        //         const data = await getHostVans()
        //         setVans(data)
        //     } catch (err) {
        //         setError(err)
        //     } finally {
        //         setLoading(false)
        //     }
        // }
        // loadVans()
    }, [])

    const hostVansEls = vans.map(van => (
        <Link
            to={van._id}
            key={van._id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageURL} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
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