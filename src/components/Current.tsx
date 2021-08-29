import axios from "axios";
import { useEffect, useState } from "react";

type Details = {
    time: {
        updated: string;
        updatedISO: string;
        updateduk: string;
    }
    disclaimer: string;
    bpi: {
        USD: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        }
        THB: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        }
    }
}




const Current = () => {
    const [task, setTask] = useState<Details | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get<Details>(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
            .then(resp => {
                console.log(resp.data);
                setTask(resp.data);
                setLoading(false);
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
            return (
                <div className='space-y-3'>
                    <p className='text-2xl'>{task?.bpi.THB.rate_float.toLocaleString()} THB</p>
                    <p> (Last updated {task?.time.updated}) </p>
                </div>
            )
        }


    }
    return (

        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Current price</p>
            {render()}

        </div>

    )

}

export default Current;