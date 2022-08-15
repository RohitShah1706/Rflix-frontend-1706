import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardImg, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./ListCard.scss";

const ListCard = (props) => {
    const RenderCard = (movies) => {
        if (movies) {
            return movies.map((item, index) => {
                return (
                    <Link to={props.movie ? `/cardsingle/${item.id}` : `/cardsingle/series/${item.id}`} key={item.id}>
                        <Card style={{ width: '10rem' }} className='list-card'>
                            <CardImg variant="top" src={item.image || `https://image.tmdb.org/t/p/original${item.poster_path}`} alt={`Card image for ${item.title || item.name}`} />
                        </Card>

                    </Link>
                )
            }
            )
        }
        else {
            return <div>Loading...</div>
        }
    }
    return (
        <Container fluid>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 7,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2.5,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {RenderCard(props.list)}

            </Carousel>
        </Container>

    )
}
export default ListCard;