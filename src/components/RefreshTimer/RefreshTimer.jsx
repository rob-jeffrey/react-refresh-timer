import React, { useEffect, useRef} from 'react'
import PropTypes from 'prop-types';

const RefreshTimer = ({ isActive, refreshInterval, onRefresh, component }) => {

    const timer = useRef();

    useEffect(() => { 
        if(isActive) {
            //console.log('initial start')
            onRefresh();
        }
     }, [])

    useEffect(() => {

        if(isActive) {
            //console.log('isActive changed to TRUE')
            timer.current = setInterval(() => { onRefresh(); }, refreshInterval);
        } else {
            //console.log('isActive changed to FALSE')
            clearInterval(timer.current);
        }

    }, [isActive])

    return (
    <>
    {
        component &&
        component
    }
    </>
    )
}

RefreshTimer.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    isActiver: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
    component: PropTypes.element
}

export default RefreshTimer
