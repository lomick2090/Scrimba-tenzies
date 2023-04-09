import React from 'react';

export default function Die(props) {
    return (
        <div className={`die ${(props.held) ? 'held' : ''}`} onClick={() => props.toggleHold(props.id)}>
            {props.value}
        </div>
    )
}