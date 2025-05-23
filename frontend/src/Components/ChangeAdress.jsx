import React, { useState } from 'react'

function ChangeAdress({setAddress, setIsModelOpen}) { 
    const [newAddress, setNewAddress] = useState ("");
    const onClose = () => {
        setAddress(newAddress)
        setIsModelOpen(false)
    }
  return (
    <div className="bg-transparent">
        <input type='text'
        placeholder='Enter new address'
        className='border p-2 w-full mb-4'
        onChange={(e) => setNewAddress(e.target.value)}/>
        <div className='flex justify-end'>
            <button className='bg-gray-500 text-white py-2 px-4 rounded mr-2'
            onClick={()=>setIsModelOpen(false)}>
                Cancel</button> 
                <button className='bg-blue-500 text-white py-2 px-4 rounded'
                onClick={onClose}>
                    Save Address</button>
        </div>
    </div>
  )
}

export default ChangeAdress