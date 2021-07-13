function ProgressBarItem({index,progressNumber,text}){
    const highlightStyle={"backgroundColor":"#00a8cc","color":"white","border":"none"}
    const textStyle={"color":"#00a8cc"}
    return (
            <div className="item">
                <div  key={index} style={progressNumber>=index ? highlightStyle : null} className="number">{progressNumber>index ? `✔`: index}</div>
                <h5  style={progressNumber>index ? textStyle : null}>{text}</h5>
                {index!==5 && <hr/>}
            </div>
    )
}

export default ProgressBarItem
