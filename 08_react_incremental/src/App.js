import './App.css';
import {useEffect, useRef, useState} from "react";

const timeOut = null;

const template = [
    {name: "Scrap", actionName: "Scavange"},
    {name: "Scavanger", actionName: "Build Scavanger", cost: 5},
    {name: "Scavanger Builder", actionName: "Assemble Builder", cost: 10},
    {name: "Builder Factory", actionName: "Construct Factory", cost: 50},
    {name: "Factory Factory", actionName: "Construct Factory^2", cost: 100},
    {name: "General Purpose Manipulator",actionName: "Develop General Purpose Manipulator", cost: 200},
    {name: "Fulfillment",actionName: "Achieve Fulfillment", cost: 1000}
]


const update = (state, setState) => {
    const newState = {...state.current}
    if (newState.stopUpdate) {
        return
    }
    for (let i = 0; newState.resources.length - 1 > i; i++) {
        newState.resources[i] += newState.resources[i+1];
    }

    if (template.length > newState.resources.length  &&
        newState.resources[newState.resources.length-1] * 2 > template[newState.resources.length].cost) {
        newState.resources[newState.resources.length] = 0;
    }
    setState(newState);
}


function App() {
    const [state, setState] = useState({resources : [0]})
    const stateRef = useRef(null);

    stateRef.current = state;

    useEffect(() => {
        const interval = setInterval(() => update(stateRef, setState), 500  )

        return () => clearTimeout(interval);
    }, []);

    const action = (actionIndex, count = 1) => {
        const newState = {...state}
        if (actionIndex === 0) {
            newState.resources[0]+=count;
        } else {
            if (newState.resources[actionIndex-1] >= template[actionIndex].cost * count) {
                newState.resources[actionIndex-1] -= template[actionIndex].cost * count;
                newState.resources[actionIndex]+=count;

                if (template[actionIndex].name === 'Fulfillment') {
                    newState.stopUpdate = true
                    newState.victory = true
                }
            }
        }

        setState(newState)
    }

    return (
        <div className="background">
            <div className={"victory-div " + (state.victory === true ? "" : "hidden")}>
                Congratulations!<br/>You have achived Fulfillment!
            </div>
            <div className="main">
                <div className="table">
                {template.map((resource, index) => {
                    if (index === 0) {
                        const count = state?.resources[index]
                        // const {name, actionName} = resource

                        return (<div key = {"_"+index} className="resource">
                            <div className="buy-buttons">
                                <button className="first-buy" onClick={() => action(index)}>{template[index].actionName}</button>
                            </div>
                            <div className="count-div"><div>{template[index].name}: </div><div>{String(count).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</div></div>
                        </div>)
                    } else if (state?.resources[index] !== undefined) {
                        const count = state?.resources[index]
                       // const {name, actionName} = resource
                        const canBuyCount = state?.resources[index-1] / template[index].cost
                        return (<div key = {"_"+index} className="resource">
                            <div className="buy-buttons">
                                <button className="first-buy" onClick={() => action(index)}>{template[index].actionName} | cost: {template[index].cost}</button>
                                <button onClick={() => action(index, 10)}>x10</button>
                                <button onClick={() => action(index, 100)}>x100</button>
                                <button onClick={() => action(index, Math.ceil(canBuyCount / 2))}>Half Max</button>
                                <button onClick={() => action(index, Math.floor(canBuyCount))}>Max</button>
                            </div>
                            <div className="count-div"><div>{template[index].name}: </div><div>{(String(count).replace(/(.)(?=(\d{3})+$)/g,'$1,'))}</div></div>
                        </div>)
                    } else {
                        return "";
                    }
                })}
                </div>
            </div>
        </div>
    );
}

export default App;
