import { Card } from "react-bootstrap";
import "./SeriesPage.scss";
import { Link } from "react-router-dom";

const DisplayCards = (props) => {
    return (
        <>
            {
                props.list.map((item, index) => {
                    if (item.poster_path != null) {
                        return (
                            <div className="card-body col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center" key={item.id}>
                                <Link to={`/cardsingle/series/${item.id}`} key={index} style={{ textDecoration: "none" }}>
                                    <Card style={{ width: "16rem" }} className="card-body">
                                        <Card.Img variant="top" src={item.image || `https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                        <Card.Body >
                                            <Card.Title className="text-center">{item.title || item.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        )
                    }
                    else {
                        return ""
                    }
                })}
        </>
    )
}
export default DisplayCards;