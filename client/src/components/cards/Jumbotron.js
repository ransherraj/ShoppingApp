
import React from 'react';
import jumbotronbg from '../../images/book.png'

export default function Jumbotron({title, subtitle}) {  //destructuring
    return <>
        <div className='container-fluid jumbotron text-dark' style={{backgroundImage:`url(${jumbotronbg})`, height:'185.5px'}}>
            <div className='row'>
                <div className='container bg-secondary bg-opacity-50 flex-wrap'>
                <div className='col text-center p-5 ' >
                    <h1 className="text-capitalize">{title}</h1>
                    <p className="text-capitalize">{subtitle}</p>
                </div>
                </div>
            </div>
        </div>
    </>;
}

// export default function Jumbotron(props) {
//     return <>
//         <div className='container-fluid bg-primary'>
//             <div className='row'>
//                 <div className='col text-center p-5 bg-light'>
//                     <h1>{props.title}</h1>
//                     <p>{props.subtitle}</p>
//                 </div>
//             </div>
//         </div>
//     </>;
// }