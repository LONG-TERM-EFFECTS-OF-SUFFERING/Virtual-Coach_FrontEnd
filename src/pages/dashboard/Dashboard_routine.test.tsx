import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as routine_api from '../../actions/api/routines'
import Dashboard_routine from './Dashboard_routine';

const component = (
    <Dashboard_routine />
)

const routine = {
    "id": 13,
    "time": 14,
    "exercises_number": 1,
    "name": "Push Routine",
    "description": "Only push exercises baby oh yeah",
    "exercise": [
        {
            "id": 17,
            "repetitions": 12,
            "series": 4,
            "rest": 2,
            "exercise": {
                "id": 1,
                "name": "Push up",
                "img_url": "imgurld"
            }
        },
        {
            "id": 40,
            "repetitions": 8,
            "series": 4,
            "rest": 2,
            "exercise": {
                "id": 4,
                "name": "Pike Push Ups",
                "img_url": "IMGURLS"
            }
        }
    ]
}

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('should render the routine information', async () => {

    vi.spyOn(routine_api, 'get_routine').mockImplementationOnce(() => {
        return Promise.resolve({
            data: routine,
            error: false
        })
    })
    render(component)

    const name = await screen.findByText(routine.name)
    const description = await screen.findByText(routine.description)
    expect(name).toBeDefined()
    expect(description).toBeDefined()
})

test('should change to edit mode when edit button is clicked', async () => {

    vi.spyOn(routine_api, 'get_routine').mockImplementationOnce(() => {
        return Promise.resolve({
            data: routine,
            error: false
        })
    })
    render(component)

    const edit_button = await screen.findByText('Edit Routine')
    edit_button.click()

    const accept_button = await screen.findByText('Accept')
    const cancel_button = await screen.findByText('Cancel')
    const input_name = await screen.findByDisplayValue(routine.name)
    const input_description = await screen.findByDisplayValue(routine.description)
    expect(accept_button).toBeDefined()
    expect(cancel_button).toBeDefined()
    expect(input_name).toBeDefined()
    expect(input_description).toBeDefined()
})

test('should render routine exercises', async () => {

    vi.spyOn(routine_api, 'get_routine').mockImplementationOnce(() => {
        return Promise.resolve({
            data: routine,
            error: false
        })
    })
    render(component)

    const exercises = routine.exercise.map(exercise => exercise.exercise.name)
    for (const exercise of exercises) {
        const exercise_name = await screen.findByText(exercise)
        expect(exercise_name).toBeDefined()
    }
    
})