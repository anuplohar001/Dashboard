import React from 'react';

function HoverText({ x, y, data }) {
    
    const xCoordinate = x; 
    const yCoordinate = y;

    return (
            <div        
                style={{
                    position: 'fixed',
                    left: `${xCoordinate+10}px`,
                    top: `${yCoordinate+10}px`,
                    width: 'fit-content',
                    height: 'fit-content',
                    padding: '5px',
                    borderRadius: '5px',
                    backgroundColor: '#212121ea',
                    color: 'white',
                    zIndex: '1000'
                }}
            >
                {data}
        </div>
    );
}

export default HoverText;