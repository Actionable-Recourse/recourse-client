import {
    List, ListItemButton, ListSubheader, ListItemText,
    Typography
} from '@mui/material';

// Create a set of actions that can be taken to revert the decision.
function ActionSet(props) {
    const data = props.data;
    const features = data['Features to Change'];
    const keys = Object.keys(features);

    var rows = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var current = data['Current Value'][key];
        var required = data['Required Value'][key];
        var label = (current < required) ? "Increase": "Decrease";
        var item_text = `${label} ${features[key]} from ${current} to ${required}`;

        rows.push(
            <ListItemButton>
                <ListItemText primary={item_text} />
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
    if (actions.length === 0) {
        return (<p>There is no possible action to revert the decision.</p>);
    } else {
        var rows = [];
        for (var i = 0; i < actions.length; i++) {
            rows.push(<ActionSet index={i+1} data={actions[i]}/>);
        }

        return (
            <div>
                <Typography variant='h6'>Here are the {actions.length} possible ways to revert the prediction.</Typography>
                {rows}
            </div>
        );
    }
}