import React from 'react'
import { routine } from '../../../interfaces/routine'

const Card_routine: React.FC<routine> = ({ id, name, time, description, exercise_number }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg bg-gray-600 hover:bg-gray-500">
                <div className="px-6 pt-4">
                    <div className="font-bold text-xl mb-2">{name}</div>
                    <p className="text-white text-base">
                        {description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"duration: "+time}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"number exercises: "+exercise_number}</span>
                    
                </div>
        </div>
    )
}

export default Card_routine