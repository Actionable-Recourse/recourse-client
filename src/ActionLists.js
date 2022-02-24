import {
    List, ListItemButton, ListSubheader, ListItemText,
    Typography,
    popoverClasses
} from '@mui/material';

let clickTableResult = (featureKey, required) => {
    let elemList = document.getElementsByName(featureKey)
    
    if (elemList.length == 1){
        elemList[0].value = required;
    } else {
        elemList[required].click();
    }
}


// Create a set of actions that can be taken to revert the decision.
function ActionSet(props) {
    const data = props.data;
    const features = data['Features to Change'];
    const keys = Object.keys(features);

    const rows = [];
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const current = data['Current Value'][key];
        const required = data['Required Value'][key];
        const label = (current < required) ? "Increase": "Decrease";
        const item_text = `${label} ${features[key]} from ${current} to ${required}`;
        rows.push(
            <ListItemButton key={features[key] + i + props.index}
            onClick={() => clickTableResult(features[key], required)}>
                <ListItemText primary={item_text}/>
            </ListItemButton>
        );
    }

    return (
        <List>
            <ListSubheader component="div" id="nested-list-subheader">
                Action Set {props.index}
            </ListSubheader>
            {rows}
        </List>
    );
}

// Create a list of sets of actions that can be taken.
export default function ActionLists(props) {
    const actions = props.actions;
    // Check if there are possible action sets
    console.log(actions)
    if (actions.length === 0) {
        return (<p>There is no possible action to revert the decision.</p>);
    } else {
        const rows = [];
        for (var i = 0; i < actions.length; i++) {
            rows.push(<ActionSet key={i} index={i+1} data={actions[i]}/>);
        }

        return (
            <div>
                <Typography variant='h6'>Here are the <b>{actions.length} possible ways</b> to revert the prediction.
                <br />Note: you are able to select the desired option to change the form input.</Typography>
                {rows}
            </div>
        );
    }
}