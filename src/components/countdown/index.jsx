import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
    state = {
        days: undefined,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const days = then.diff(now, 'days')
            this.setState({ days });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days } = this.state;
        if (!days) {
            return null;
        }
        return (
            <div style={{height: "5rem"}}>
                <div className="countdown-wrapper">
                    {days && (
                        <div className="countdown-item">
                            {days}
                            <span>jours avant les JO's</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Countdown;