import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "../../Axios/axios";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./TinderCards.css";

function TinderCards() {
  const [{ user }, dispatch] = useStateValue();

  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/cards");
      setPeople(req.data);
    }
    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("Removing" + nameToDelete);
    //setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen");
  };

  return (
    <div className="tindercards">
      <div className="tindercards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
          >
            {/* <div
              className="tindercards__card"
              //style={{ backgroundImage: `url(http://localhost:8001/${person.profile.filename})` }}
              style={{ backgroundImage: `url(${!person.profile ? `http://localhost:8001/noprofilepictureicon.png` : `http://localhost:8001/${person.profile?.filename}`})` }}
            >
              <h3>{person.name}</h3>
            </div> */}
            <div className="tindercards__pCard">
              <div
                className="tindercards__pCard_up"
                style={{
                  backgroundImage: `url(${
                    !person.profile
                      ? `http://localhost:8001/noprofilepictureicon.png`
                      : `http://localhost:8001/${person.profile?.filename}`
                  })`,
                }}
              ></div>
              <div className="tindercards__pCard_down">
                <div className="tindercards__pCard_down_div">
                  <p>{person.name}</p>
                  <p>{person.age}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
