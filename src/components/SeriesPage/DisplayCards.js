import { Card } from "react-bootstrap";
import "./SeriesPage.scss";
import { Link } from "react-router-dom";

const DisplayCards = (props) => {
    return (
        <>
            {props.list.map((item, index) => {
                return (

                    <div className="card-body col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center" key={item.id}>
                        <Link to={`/cardsingle/${item.id}`} key={index} style={{ textDecoration: "none" }}>
                            <Card style={{ width: "16rem" }} className="card-body">
                                <Card.Img variant="top" src={item.image} alt="" />
                                <Card.Body >
                                    <Card.Title className="text-center">{item.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}
export default DisplayCards;