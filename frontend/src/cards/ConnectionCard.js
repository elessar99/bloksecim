
import "./ConnectionCard.css"



const ConnectionCard = ({ ownerName, votingCategory, pin }) => {

    return(
        <>
        <div className="ConnectionCard">
            <div className="ConnectionInfo">
                <div className="connectionH">Owner Name :</div>
                <div>{ownerName}</div>
            </div>
            <div className="ConnectionInfo">
                <div className="connectionH">Voting Category :</div>
                <div>{votingCategory}</div>
            </div>
            <div className="ConnectionBtn">
                <button className="buttonJ" onClick={()=>{alert(pin)}}>Join</button>
            </div>
        </div>
        </>
    );
}

export default ConnectionCard;