// import React from 'react'

// const Alert = (props) => {
//   return (
//     <div>
//         <div className="alert alert-primary" role="alert">
//             {props.message}
//         </div>
//     </div>
//   )
// }

// export default Alert


import React from 'react'

export default function Alert(props) {
  return (
    <div style={{ height: '50px' }}>

      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">

        {/* <strong>{props.alert.type}</strong>: */}
        {props.alert.msg}

      </div>}
    </div>
  )
}
