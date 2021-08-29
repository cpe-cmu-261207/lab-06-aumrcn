import { useState } from "react"
import { useHistory } from "react-router-dom";

const Historysl = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [lastDate, setEndDate] = useState<string | null>(null);
    let history = useHistory();

    const checkDate = () => {
        var start = null;
        var end = null;
        if (startDate != null) {
            start = new Date(startDate);
        }
        if (lastDate != null) {
            end = new Date(lastDate);
        }
        if (start === null || end === null) {
            alert("Please select start date and end date correctly")
        } else if (start?.getTime() > end?.getTime() && start != null && end != null) {
            alert("Please select start date and end date correctly")
        } else {
            history.push(`/history/result?start=${startDate}&end=${lastDate}`);
        }

    }

    return (
        <div className='my-5'>
            <div className='text-center space-y-3 space-x-3'>
                <p className='text-2xl font-semibold'>Select historical range</p>
                <span>From date</span>
                <input type='date' onChange={e => { setStartDate(e.target.value) }}></input>
                <span>To date</span>
                <input type='date' onChange={e => { setEndDate(e.target.value) }}></input>
                <br />
                <button onClick={checkDate}>Get data</button>

            </div>
        </div>
    )





}

export default Historysl