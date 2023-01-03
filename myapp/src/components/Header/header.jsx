import React from 'react'
import { useEffect, useRef } from 'react';

import "./header.css";

function Header(props) {
    // reference k lye use hota hai
    const resultRef = useRef();
    const expressionRef = useRef();


    useEffect(() => {
        // .current se us element ka reference mil jae ga
        // scrollintoview func se ye view mai mtlb samne aa jae ga automatically, agr view se bahir hoga to
        resultRef.current.scrollIntoView()
    }, [props.history]);

    useEffect(() => {
        // .current se us element ka reference mil jae ga
        // scrollintoview func se ye view mai mtlb samne aa jae ga automatically, agr view se bahir hoga to
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [props.expression]);


    return (
        <div className='header custom-scroll'>
            <div className='header_history'>
                {props.history &&
                    props.history?.map((item) => (
                        <p key={item + "" + Math.random() * 44} >{item} </p> //key unique ho islye random func dya
                    ))
                }


            </div>
            <br/>
            <div ref={expressionRef} className='header_expression custom-scroll'>
                <p>{props.expression}</p>
            </div>
            {/* refresh hone pe automatic scrolldown k lye js element tk scroll krwana h usko ref dya  */}
            <p ref={resultRef} className='header_result'>{props.result} </p>
            
        </div>
    )
}

export default Header