import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import { useState, useEffect } from 'react';
import '../../styles/services/service.scss';
import ServiceForm from '../../components/ServiceForm';
import { useSpring, animated } from 'react-spring';

const Services = () => {
  const imageNames = [
    'tire-small.png', 
    'allign-small.png', 
    'battery-small.png',
    'brakes-small.png',
    'muffler.png',
    'catalytic.png'
  ];
  const nameMap = {
    'tire-small.png': 'Tires',
    'allign-small.png': 'Alignment',
    'battery-small.png': 'Battery',
    'brakes-small.png': 'Brakes',
    'muffler.png': 'Mufflers',
    'catalytic.png': 'Catalytic Converter'
  };

  const [images, setImages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const filename of imageNames) {
        try {
          const response = await fetch(`/images/${filename}`);
          if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
          const blob = await response.blob();
          newImages[filename] = URL.createObjectURL(blob);
        } catch (error) {
          console.error(`Failed to fetch ${filename}:`, error);
        }
      }
      setImages(newImages);
    };

    fetchImages();
  }, []);

  const handleForm = (serviceName) => {
    setActiveService(serviceName);
    setShowModal(true);
  }

  return (
    <Container className="service-container">
      <Row className="service-row">
        <Col className="service-col">
          <h2 className="h2 title">Professional Tire Services <span className="more-tag">... and more!</span></h2>
              {imageNames.map((filename, index) => (
                <ServiceCard 
                  key={index}
                  icon={null}
                  image={images[filename] || ''}
                  name={nameMap[filename] || ''}
                  onClick={() => handleForm(nameMap[filename])}
                />
              ))}
              {
                showModal && 
                  <ServiceForm 
                    show={showModal}
                    service={activeService}
                    onHide={() => setShowModal(false)}
                  />
              }                
        </Col>
      </Row>
    </Container>
  );
};

export default Services;