
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
import punjab from '../assets/images/punjab.png'
import tgb from '../assets/images/telangana.png'



const data=[
    {
        id:1,
        name:'Axis Bank',
        image:axis,
        link:'https://www.axisbank.com/'
    },{
        id:2,
        name:'ICICC',
        image:icici,
        link:'https://www.icicibank.com/'
    },{
        id:3,
        name:'SBI Bank',
        image:sbi,
        link:'https://www.onlinesbi.sbi'
    },{
        id:4,
        name:'Kotak Bank',
        image:kotak,
        link:'https://www.kotak.com/en/home.html'
    },{
        id:5,
        name:'Union Bank',
        image:union,
        link:'https://www.unionbankofindia.co.in/english/home.aspx'
    },{
        id:6,
        name:'HDFC Bank',
        image:hdfc,
        link:'https://www.hdfcbank.com/'
    },{
        id:7,
        name:'Canara Bank',
        image:canara,
        link:'https://canarabank.com/'
    },{
        id:8,
        name:'Citi Bank',
        image:citibank,
        link:'https://www.online.citibank.co.in/'
    },{
        id:9,
        name:'Bandan Bank',
        image:bandan,
        link:'https://bandhanbank.com/'
    },
    {
        id:10,
        name:'PostOffice Bank',
        image:post,
        link:'https://www.ippbonline.com/'
    },{
        id:11,
        name:'Punjab Bank',
        image:punjab,
        link:'https://www.pnbindia.in/'
    },{
        id:12,
        name:'Telangana Bank',
        image:tgb,
        link:'https://tgbhyd.in/'
    },
]

function Partners(props) {
    return (
        <div className='partner-block mt-0'>
            <h3 className='text-center mt-0'>Our Partners</h3>
           <div className='partners-img'>
                {data.map((part)=>{        
                    const {id,image,name,link}=part;
                    return <>
                        <div className='partners' key={id}>
                            <a href={link} target='_blank' rel="noreferrer">
                            <img src={image} className='' alt={name} width='100px' height='50px'></img>
                            </a>
                        </div>
                    </>
                })}
            </div>
        </div>
    );
}

export default Partners;