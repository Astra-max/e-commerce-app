import { useSelector } from "react-redux"
import "../styles/app.css"
import { authSelector } from "../store/authSlice"

const Subscribe = () => {
    const { userId } = useSelector(authSelector)
    function HandleSubscribe() {
        if (userId) return alert('successfully subscribed to westmart product news & promotion')
    }
  return (
    <div className="sub-main">
        <div>
            <div className="sub-cont">
                <p className="sub-top">westmart amazing alerts</p>
                <p className="sub-ttl">
                    Subscribe To The New
                </p>
                <p className="dis-alert">Be aware of all discounts and bargains. Don't miss out a moment</p>
                <button className="sub-btn" onClick={HandleSubscribe}>subscribe now!!</button>
            </div>
        </div>
        <div className="sub-img-cont"> 
            <img  className="sub-image" src="/prophesional.jpg" alt="subscribe image" loading="lazy" />
        </div>
    </div>
  )
}

export default Subscribe