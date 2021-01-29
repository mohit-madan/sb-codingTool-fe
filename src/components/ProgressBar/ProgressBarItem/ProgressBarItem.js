function ProgressBarItem({index,progressNumber,text}){
    const highlightStyle={"backgroundColor":"#00bda7","color":"white","border":"none"}
    const textStyle={"color":"#15c5b1"}
    return (
            <div className="item">
                <div  key={index} style={progressNumber>=index ? highlightStyle : null} className="number">{progressNumber>index ? `✔`: index}</div>
                <h5  style={progressNumber>index ? textStyle : null}>{text}</h5>
                {index!==4 && <hr/>}
            </div>
    )
}

export default ProgressBarItem
