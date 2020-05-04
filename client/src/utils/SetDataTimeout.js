const TIMEOUT = 1000;

const SetDataTimeout = ({data, setData, setLoadedState}) => {
    if(data && setData) {
        setTimeout(() => {
            setData(data);
            setLoadedState(true);
        }, TIMEOUT)
    } else {
        setTimeout(() => {
            setLoadedState(true);
        }, TIMEOUT)
    }
}

export default SetDataTimeout;