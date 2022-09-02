import { Card } from "react-bootstrap";
import "./MoviesPage.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const DisplayCards = (props) => {
    try {
        return (
            <>
                {

                    props.list.map((item, index) => {
                        // if item.known for exists then return empty string
                        return (
                            <div className="card-body col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center" key={item.id}>
                                <Link to={`/cardsingle/${item.id}`} key={index} style={{ textDecoration: "none" }}>
                                    <Card style={{ width: "16rem" }} className="card-body">
                                        <LazyLoadImage src={item.image || `https://image.tmdb.org/t/p/original${item.poster_path}`} alt={`Card image for ${item.name || item.name}`} />
                                        <Card.Body >
                                            <Card.Title className="text-center">{item.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    catch (err) {
        return ""
    }

}
export default DisplayCards;