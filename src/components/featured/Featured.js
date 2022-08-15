import { Carousel } from 'react-bootstrap';
import { MdOutlinePlayArrow, MdInfoOutline } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import './Featured.scss';
// USED IMDB API FOR THIS ONE 
import { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { featured_get } from './featured_get';
const Featured = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        featured_get()
            .then(result => {
                setFeatured(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const RenderFeaturedList = featured.map((movie, index) =>
        < Carousel.Item key={movie.id} >
            <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`Featured image for movie - ${movie.title}`}
            />
            {/* BROWSER VIEW - means render only on browsers */}
            <BrowserView>
                <Carousel.Caption>
                    <h3>{movie.title || movie.name}</h3>
                    <p>{movie.overview}</p>
                    <div className='buttons'>
                        <Link to={`/featured/${movie.id}`} ><Button variant="outline-dark" className='button'><MdOutlinePlayArrow style={{ color: "white", fontSize: "1.5em" }} /></Button></Link>
                        <Link to={`/featured/${movie.id}`}><Button variant="outline-dark" className='button'><MdInfoOutline style={{ color: "white", fontSize: "1.5em" }} /></Button></Link>
                    </div>
                </Carousel.Caption>
            </BrowserView>
            <MobileView>
                <Carousel.Caption>
                    <h6 >{movie.title || movie.name}</h6>
                    <div className='buttons'>
                        <Link to={`/featured/${movie.id}`} ><Button variant="outline-dark" className='button'><MdOutlinePlayArrow style={{ color: "white", fontSize: "1.5em" }} /></Button></Link>
                        <Link to={`/featured/${movie.id}`}><Button variant="outline-dark" className='button'><MdInfoOutline style={{ color: "white", fontSize: "1.5em" }} /></Button></Link>
                    </div>
                </Carousel.Caption>
            </MobileView>
        </Carousel.Item >
    );
    return (
        < Carousel className='featured' >
            {RenderFeaturedList}
        </Carousel >

    );
}
export default Featured;