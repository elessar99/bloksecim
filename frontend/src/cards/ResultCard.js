
import "./ResultCard.css"



const ResultCard = ({ title, description, options, voteCounts }) => {

    return(
        <>
        <div className="resultCard">
            <div className="cardInfo">
                <h2>Başlık: {title}</h2>
                <p>Açıklama: {description}</p>
            </div>
            <div className="allVoteResult">
                {options.map((option, index) => {
                    console.log(voteCounts[index])
                    return(
                        <div className="voteResult" key={index} >
                            <span className="option">{option}</span>
                            <span className="vote">{parseInt(voteCounts[index])}</span>
                        </div>
                    )

                })}
            </div>
        </div>
        </>
    );
}

export default ResultCard;