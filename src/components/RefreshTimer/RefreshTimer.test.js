import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import RefreshTimer from '.'

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.useRealTimers();
})


it('Should update counter correctly when component is initially active', () => {
    
    // Arrange
    let counter = 0;    
    const mockUpdateCounter = jest.fn()
        .mockImplementation(() => { 
        counter = counter + 1; 
    });


    // Act    
    render(<RefreshTimer component={<div id="p-counter">{counter}</div>} onRefresh={mockUpdateCounter} refreshInterval={3000} isActive={true} />, container);
        
    // Assert
    expect(mockUpdateCounter).toHaveBeenCalledTimes(1);
    expect(counter).toBe(1);

    // Move the timer forward by less than the refresh interval
    jest.advanceTimersByTime(100);
    expect(mockUpdateCounter).toHaveBeenCalledTimes(1);
    expect(counter).toBe(1);

    // Move the timer forward by the refresh interval
    jest.advanceTimersByTime(3000);
    expect(mockUpdateCounter).toHaveBeenCalledTimes(2);
    expect(counter).toBe(2);

    jest.useRealTimers();

});

it('Should not update counter when component is initially inactive', () => {
    
    // Arrange
    let counter = 0;    
    let timerIsActive = false
    const mockUpdateCounter = jest.fn()
        .mockImplementation(() => { 
        counter = counter + 1; 
    });


    // Act    
    render(<RefreshTimer component={<div id="p-counter">{counter}</div>} onRefresh={mockUpdateCounter} refreshInterval={3000} isActive={false} />, container);
        
    // Assert
    expect(counter).toBe(0);

    jest.advanceTimersByTime(4000);

    expect(counter).toBe(0);
    expect(mockUpdateCounter).not.toHaveBeenCalled();

    jest.useRealTimers();
});
