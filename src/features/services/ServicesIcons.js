import React, { useState } from "react";
import { Card, CardImg } from "reactstrap";
import { useSpring, animated } from "@react-spring/web";
import { Tooltip} from 'reactstrap';
import "../../styles/services/service.scss";
import icons from "../../db.json";

const ServicesIcons = () => {
    const [iconData] = useState(icons.icons);
    const [flipped, setFlipped] = useState({});
    const [openToolTip, setOpenToolTip] = useState({});

    const flipAnimation = useSpring({
        transform: `rotateY(180deg)`,
        config: { mass: 0.3, tension: 900, fricition: 80}
    });

    const handleHover = (event) => {
        const iconId = event.currentTarget.dataset.id;
        setFlipped((prevFlipped) => ({
            ...prevFlipped,
            [iconId]: !prevFlipped[iconId],
        }));
    };

    const handleToggle = (event) => {
        const iconId = event.target.dataset.id;
        setOpenToolTip((prevToolTip) => ({
            ...prevToolTip,
            [iconId]: !prevToolTip[iconId],
        }))
    }

    const serviceIcons = iconData.map(({ id, name, image, icon, message}) => {
        const isFlipped = flipped[id] || false;
        const isOpenTool = openToolTip[id] || false;
        return (
            <>
                <Card 
                    className='card-container'
                    data-id={id}
                    key={id}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    id={`icon-${id.toString()}`}
                >
                    <animated.div
                        className='card-front'
                        style={{ ...flipAnimation}}
                        data-id={id}
                    >
                        <CardImg data-id={id} src={image} alt={name} className='icon-image'/>
                    </animated.div>
                    <animated.div
                        className='card-back'
                        style={{ ...flipAnimation, transform: `rotateY(${isFlipped ? 0 : 180 }deg)`}}
                        data-id={id}
                    >
                        <CardImg data-id={id} src={icon} alt={name} className='icon-image'/>
                    </animated.div>
                    <Tooltip
                        className='tool-tip'
                        isOpen={isOpenTool}
                        placement='top'
                        target={`icon-${id}`}
                        transition={{ timeout: 3000}}
                        toggle={(event) => handleToggle(event)}
                    >
                        {message}
                    </Tooltip>
                </Card>
            </>
        )
    })

    return (
        <>
            {serviceIcons}
        </>
        
    )
};

export default ServicesIcons;