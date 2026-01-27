import { useState } from "react";
import "../styles/poducts.css"


const Shipment = () => {
    const [selected, setSelected] = useState("Nairobi")
    const deliveryPlace = [
        "Kisumu",
        "Nairobi",
        "Kakamega",
    ]
    const cityPlace = new Map([["Kisumu", ['Lake basin', 'Mega city']], ["Nairobi", ["GPO", "CBD", "Westlands"]]])
    function HandleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target
        setSelected(value)
    }
  return (
    <div className="ship-main">
      <div>
        <p>Select your area of delivery</p>
        <select name="city" id="" onChange={(e)=>HandleSelect(e)}>
            {deliveryPlace.map((city)=>
              <option value={city}>{city}</option>
            )}
        </select>
        <select name="" id="">
            {cityPlace.get(selected)?.map((area)=> <option>{area || "No delivery bay"}</option>)}
        </select>
        <p>Delivery fee: {selected === "Nairobi" ? "FREE":"Kshs 200"}</p>
        <p>Waiting period: 2 weeks</p>
      </div>
      <div></div>
    </div>
  );
};

export default Shipment;
