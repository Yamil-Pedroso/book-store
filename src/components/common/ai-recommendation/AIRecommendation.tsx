import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaLongArrowAltUp, FaStop } from "react-icons/fa";
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from "react-icons/md";

import { Window, InputContainer, InputField, MessageContent } from "./styles"; // Importa tus estilos como lo tienes
import { avatar } from "../../../assets/images";

const baseUrl = "http://localhost:5000/api/v1/";

interface IAIRecommendation {
  showBorderDynamic: boolean;
  setShowBorderDynamic: React.Dispatch<React.SetStateAction<boolean>>;
  zoomWindow: boolean;
  setZoomWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const IAAnswers = [
  "Valancy Stirling, a 29-year-old woman oppressed by her family, receives a fatal diagnosis and decides to finally live without fear. She rebels against her relatives, moves out to care for Cissy Gay, a shunned young woman, and falls in love with Barney Snaith, a mysterious man with a bad reputation. Believing she has little time left, she proposes to Barney, and they build a happy life together. However, she later discovers that her diagnosis was a mistake and that Barney has a surprising secret.",
  "A structural pattern is a type of design pattern in software engineering that focuses on how classes and objects are composed to form larger structures. It simplifies the design by identifying a simple way to realize relationships between entities. Structural patterns ensure that if one part of a system changes, the entire system does not need to be modified. Examples include the Adapter, Decorator, and Composite patterns, which help in organizing code and objects in a flexible and efficient way.",
  "A behavioral pattern is a type of design pattern in software engineering that focuses on how objects interact with each other. It describes the patterns of communication between objects y cómo colaboran para lograr un objetivo común. Los patrones de comportamiento ayudan a definir la comunicación entre los objetos, haciendo que el sistema sea más flexible y eficiente. Ejemplos incluyen los patrones Observer, Strategy, y Command, que ayudan a definir el comportamiento de los objetos y sus interacciones.",
];

const AIRecommendation: React.FC<IAIRecommendation> = ({
  showBorderDynamic,
  setShowBorderDynamic,
  zoomWindow,
  setZoomWindow,
}) => {
  const [greetings, setGreetings] = useState("");
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clickedUpArrow, setClickedUpArrow] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const shouldStopTyping = useRef(false);

  const handleZoomWindow = () => {
    setZoomWindow((prev) => !prev);
  };

  const handleClickedUpArrow = () => {
    if (textValue.trim()) {
      setClickedUpArrow(true);
      setIsTyping(true);
      shouldStopTyping.current = false;
      handleKeyPress({ key: "Enter" } as React.KeyboardEvent<HTMLInputElement>);
    }
  };

  const handleStopClick = () => {
    shouldStopTyping.current = true; // Detener la escritura
    setMessages((prevMessages) => prevMessages.slice(0, -1)); // Cortar el último mensaje en progreso
    messages.pop(); // Eliminar el último mensaje en

    // Restablecer el estado
    setIsTyping(false);
    setClickedUpArrow(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get(`${baseUrl}/message`);
        setGreetings(response.data.message);
      } catch (error) {
        console.error("Error al llamar a la API de OpenAI", error);
        setGreetings("Error en la respuesta");
      }
    };

    fetchGreeting();
  }, []);

  const simulateTyping = async (responseMessage: string) => {
    setIsTyping(true);
    setShowBorderDynamic(true);
    for (let i = 0; i < responseMessage.length; i++) {
      if (shouldStopTyping.current) {
        // Si shouldStopTyping es true, detén la escritura y regresa el control
        setIsTyping(false);
        setClickedUpArrow(false);
        return;
      }

      // Actualiza el mensaje en progreso
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "AI", text: responseMessage.slice(0, i + 1) },
      ]);

      await new Promise((resolve) => setTimeout(resolve, 10)); // Controla la velocidad de escritura
    }
    setIsTyping(false);
    setClickedUpArrow(false);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && textValue.trim() && !shouldStopTyping.current) {
      setShowBorderDynamic(false);
      // Agregar el mensaje del usuario
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", text: textValue },
      ]);

      let responseMessage = "";

      if (textValue.toLowerCase().includes("the blue castle")) {
        responseMessage = IAAnswers[0];
      } else if (textValue.toLowerCase().includes("structural")) {
        responseMessage = IAAnswers[1];
      } else if (textValue.toLowerCase().includes("behavioral")) {
        responseMessage = IAAnswers[2];
      }

      // Mostrar la respuesta con un retraso de 5 segundos
      setTimeout(async () => {
        if (responseMessage && !shouldStopTyping.current) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "AI", text: "" }, // Comienza con un mensaje vacío para simular la escritura
          ]);
          await simulateTyping(responseMessage);
        } else if (!shouldStopTyping.current) {
          try {
            const response = await axios.post(`${baseUrl}/openai`, {
              prompt: textValue,
            });

            const aiResponse = response.data.choices[0].message.content.trim();
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "AI", text: "" }, // Comienza con un mensaje vacío para simular la escritura
            ]);
            await simulateTyping(aiResponse);
          } catch (error) {
            console.error("Error al llamar a la API de OpenAI", error);
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "AI", text: "Arregla tu pregunta, por favor" }, // Mensaje de error
            ]);
          }
        }
      }, 5000);
      setTextValue("");
    }
  };

  return (
    <div>
      <Window zoom={zoomWindow}>
        {zoomWindow ? (
          <MdOutlineZoomInMap
            onClick={handleZoomWindow}
            className="zoom-icon-in"
          />
        ) : (
          <MdOutlineZoomOutMap
            onClick={handleZoomWindow}
            className="zoom-icon-out"
          />
        )}
        <InputContainer>
          <InputField
            value={textValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="AI Recommendation..."
            disabled={isTyping}
          />

          {isTyping ? (
            <FaStop onClick={handleStopClick} className="stop-icon" />
          ) : (
            <FaLongArrowAltUp
              onClick={handleClickedUpArrow}
              className="up-arrow"
            />
          )}
        </InputContainer>
        <MessageContent style={{ width: zoomWindow ? "47rem" : "" }}>
          {messages.map((message, index) => (
            <div key={index} className="sms-sender">
              <div className="avatar">
                {message.sender === "User" && (
                  <img src={avatar} alt="avatar-icon" className="user-avatar" />
                )}
              </div>

              <span>{message.text}</span>
            </div>
          ))}
        </MessageContent>
      </Window>
    </div>
  );
};

export default AIRecommendation;
