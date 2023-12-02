
import React from 'react';

import axis from '../assets/images/AxisBank.png'
import icici from '../assets/images/icici.jpg'
import sbi from '../assets/images/sbi.png'
import kotak from '../assets/images/kotak.png'
import union from '../assets/images/union.png'
import hdfc from '../assets/images/hdfc.png'
import canara from '../assets/images/canara.png'
import citibank from '../assets/images/citibank.jpg'
import bandan from '../assets/images/bandhanbank.jpg'
import post from '../assets/images/Indianpost.png'
import syndicate from '../assets/images/syndicate.png'
import tgb from '../assets/images/telangana.png'



const data=[
    {
        id:1,
        name:'Axis Bank',
        image:axis
    },{
        id:2,
        name:'ICICC',
        image:icici
    },{
        id:3,
        name:'SBI Bank',
        image:sbi
    },{
        id:4,
        name:'Kotak Bank',
        image:kotak
    },{
        id:5,
        name:'Union Bank',
        image:union
    },{
        id:6,
        name:'HDFC Bank',
        image:hdfc
    },{
        id:7,
        name:'Canara Bank',
        image:canara
    },{
        id:8,
        name:'Citi Bank',
        image:citibank
    },{
        id:9,
        name:'Bandan Bank',
        image:bandan
    },{
        id:10,
        name:'PostOffice Bank',
        image:post
    },{
        id:11,
        name:'Syndicate Bank',
        image:syndicate
    },{
        id:12,
        name:'Telangana Bank',
        image:tgb
    },
]

function Partners(props) {
    return (
        <div className='partner-block mt-5'>
            <h3 className='text-center mt-5'>Our Partners</h3>
           <div className='partners-img'>
                {data.map((part)=>{        
                    const {id,image,name}=part;
                    return <>
                        <div className='partners' key={id}>
                            <img src={image} className='' alt={name} width='180px' height='120px'></img>
                        </div>
                    </>
                })}
            </div>
        </div>
    );
}

export default Partners;