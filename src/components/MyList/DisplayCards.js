import { Card } from "react-bootstrap";
import "./MyList.scss";
import { Link } from "react-router-dom";

const DisplayCards = (props) => {
    try {
        return (
            <>
                {

                    props.list.map((item, index) => {
                        // if item.known for exists then return empty string
                        if (item.poster_path) {
                            return (
                                <div className="card-body col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center" key={item.imdbId}>
                                    <Link to={`/cardsingle/${item.imdbId}`} key={index} style={{ textDecoration: "none" }}>
                                        <Card style={{ width: "16rem" }} className="card-body">
                                            <Card.Img variant="top" src={item.image || `https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                            <Card.Body >
                                                <Card.Title className="text-center">{item.title || item.original_name || item.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            )
                        }
                        else {
                            return ""
                        }
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