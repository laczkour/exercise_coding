import './App.css';
import {useEffect, useRef, useState} from "react";

const timeOut = null;

const template = [
    {name: "Scrap", actionName: "Scavange"},
    {name: "Scavanger", actionName: "Build Scavanger", cost: 20},
    {name: "Scavanger Builder", actionName: "Assemble Builder", cost: 100},
    {name: "Builder Factory", actionName: "Construct Factory", cost: 500},
    {name: "Factory Factory", actionName: "Construct Factory^2", cost: 10000},
    {name: "General Purpose Manipulator",actionName: "Develop General Purpose Manipulator", cost: 100000},
    {name: "Fulfillment",actionName: "Achieve Fulfillment", cost: 1000000}
]


const update = (state, setState) => {
    const newState = {...state.current}

    for (let i = 0; newState.resources.length - 1 > i; i++) {
        newState.resources[i] += newState.resources[i+1];
    }
    console.log(newState)
    console.log(template.length, newState.resources.length, newState.resources[newState.resources.length-1] * 2)

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
        const interval = setInterval(() => update(stateRef, setState), 1000)

        return () => clearTimeout(interval);
    }, []);

    const action = (actionIndex, count = 1) => {
        const newState = {...state}
        if (actionIndex === 0) {
            newState.resources[0]+=count;
        } else {
            console.log(actionIndex, count, newState.resources[actionIndex-1])
            if (newState.resources[actionIndex-1] >= template[actionIndex].cost * count) {
                newState.resources[actionIndex-1] -= template[actionIndex].cost * count;
                newState.resources[actionIndex]+=count;
            }
        }
        setState(newState)
    }

    return (
        <div className="background">
            <div className="main">
                {template.map((resource, index) => {
                    if (state?.resources[index] !== undefined) {
                        const count = state?.resources[index]
                       // const {name, actionName} = resource

                        return (<div key = {"_"+index}>
                            <button onClick={() => action(index)}>{template[index].actionName}</button>
                            <span>{template[index].name}: <span>{count}</span></span>
                        </div>)
                    } else {
                        return "";
                    }
                })}
            </div>
        </div>
    );
}

export default App;
