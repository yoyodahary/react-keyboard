function TextBox({data}) {
    console.log("data", data)
    return (
        <div className="text-box">
            {data.map((item, index) => {
                return <span style={{
                    color: item.color,
                    fontFamily: item.font,
                    fontSize: item.fontSize
                }} key={index}>{item.letter}</span>
            })}
        </div>
    );
};

export default TextBox;