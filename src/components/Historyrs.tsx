import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


type Details = {
    time: {
        updated: string;
        updatedISO: string;
        updateduk: string;
    }
    disclaimer: string;
    bpi: Record<string, number> | null;

}


const Historyrs = () => {
    const [date, setDate] = useState<Details | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const query = new URLSearchParams(useLocation().search);
    let startDate = query.get('start');
    let endDate = query.get('end');

    useEffect(() => {
        setLoading(true);
        axios.get<Details>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${startDate}&end=${endDate}`)
            .then(resp => {
                console.log(resp.data);
                setDate(resp.data);
                setLoading(false);
                setError(false);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
            })
    }, [])

    const render = () => {
        if (loading) {
            return <p className='text-2xl'>Loading ...</p>
        } else if (error) {
            return <p className='text-xl text-red-500'>There was an error. Please try again later.</p>
        } else {
            type ployBobo = {
                key: string;
                value: number;
            }

            const dateList: ployBobo[] = [];
            if (date?.bpi) {
                for (const [key, value] of Object.entries(date?.bpi)) {
                    dateList.push({ key, value });
                }
            }

            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> ( From {startDate} To {endDate} )</p>
                    <ul>
                        {dateList.map((e) => <li className='text-xl' key={e.key}>{e.key} - {e.value.toLocaleString()} THB</li>)}
                    </ul>
                </div>
            )
        }


    }
    return (
        <div className='text-center space-y-3'>
            {render()}
        </div>

    )
}

export default Historyrs;

