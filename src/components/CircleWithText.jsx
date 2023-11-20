import React, { useRef, useEffect, useState } from "react";
import { Circle, Group, Text } from "react-konva";

const MAX_WORD_LENGTH = 10;
const getRandomCoordinates = () => {
    // Generate random x and y coordinates within the canvas area
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    return { x, y };
  };

const CircleWithText = ({item, whileDragging, onDragStop, deleteArea, setOnDelete}) => {
    const textRef = useRef(null);
    const [center, setCenter] = useState();
    const fontSize = 16;
    const [position, setPosition] = useState(getRandomCoordinates())

    useEffect(() => {
        if(textRef.current) {
            const textNode = textRef.current;
            const width = textNode.width();
            const height = textNode.height();
            setCenter({
                x: position.x + width/2,
                y: position.y + height/2,
                radius: width/2 + 10
            })
        }
    }, [textRef])

    const onDragEnd = (e) => {
            const x = e.target.x();
            const y = e.target.y();
            // Calculate the minimum distance between the edges of the components
            if(!deleteArea) {
                return;
            }
            const distance = Math.sqrt(Math.pow(deleteArea.x - x, 2) + Math.pow(deleteArea.y - y, 2));
            // Define a threshold value for approximate overlap
            const threshold = 350; // Adjust as needed
        
            if (distance < threshold) {
                console.log('In Delete Area');
                setOnDelete(true);
                // Perform actions when the components are in close proximity
            } else {
                setOnDelete(false);
            }
            onDragStop();
    }

    return <Group draggable={true}
    onDragStart={whileDragging}
      onDragEnd={onDragEnd}
      >
    {center && <Circle 
    x={center.x} 
    y={center.y} 
    radius={center.radius} 
    fill="lightblue" 
    />}
        <Text
        ref={textRef}
        x={position.x} 
        y={position.y} 
        text={item.message}
        width={item.size}
        fontSize={fontSize}
        wrap={"word"}
        fill="black"
        align="center"
      />
  </Group>
  }
  
export default CircleWithText;
