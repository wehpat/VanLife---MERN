import axios from "axios"
import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"


export default function HostVanDetail() {
    const [currentVan, setCurrentVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()

    React.useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:3000/host/vans/${id}`)
            .then((res) => {
                console.log(res.data.hostVan[0])
                setCurrentVan(res.data.hostVan[0])
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        // async function loadVans() {
        //     setLoading(true)
        //     try {
        //         const data = await getHostVans(id)
        //         setCurrentVan(data)
        //     } catch (err) {
        //         setError(err)
        //     } finally {
        //         setLoading(false)
        //     }
        // }

        // loadVans()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            {currentVan &&
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageURL} />
                        <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${currentVan.type}`}
                            >
                                {currentVan.type}
                            </i>
                            <h3>{currentVan.name}</h3>
                            <h4>${currentVan.price}/day</h4>
                        </div>
                    </div>

                    <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Details
                    </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Pricing
                    </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Photos
                    </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                </div>}
        </section>
    )
}
