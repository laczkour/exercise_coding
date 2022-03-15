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
    if (newState.hello === undefined) {
        newState.hello = 0;
        newState.resources = {Scrap: 0};
    }

    newState.scrap += newState.scavanger;
    newState.hello += 1
    console.log(newState.hello)

    setState(newState);
}


function App() {
    const [state, setState] = useState(null)
    const stateRef = useRef(null);

    stateRef.current = state;

    useEffect(() => {
        const interval = setInterval(() => update(stateRef, setState), 1000)

        return () => clearTimeout(interval);
    }, []);

    const action = (actionType) => {
        const newState = {...state}
        if (actionType === "scavange") {
            newState.scrap++
        }
        if (actionType === "build scavanger") {
            if (newState.scrap > 20) {
                newState.scrap -= 20;
                newState.scavanger += 1;
            }
        }

        setState(newState)
    }

    return (
        <div className="background">
            <div className="main">
                {template.map(resource => {
                    if (state?.resources[resource.name] != null) {
                        const count = state?.resources[resource.name].count
                       // const {name, actionName} = resource

                        return (<div>
                            <button onClick={() => action("scavange")}>{resource.actionName}</button>
                            <span>{resource.name}: <span>{count}</span></span>
                        </div>)
                    }
                })}
            </div>
        </div>
    );
}

export default App;
