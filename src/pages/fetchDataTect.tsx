import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabase'

const fetchDataTect = () => {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: roomsData, error: roomsError } = await supabase
                    .from('rooms')
                    .select('*')

                if (roomsError) {
                    throw roomsError
                }
                setData(roomsData || null);
                console.log(roomsData);
            } catch (error) {
                console.log('error', error)
                setData([])
            }
        }

        fetchData();
    }, [])



    return (
        <>

        </>
    )
}

export default fetchDataTect