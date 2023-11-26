import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import * as routine_api from '../../actions/api/routines'
import Dashboard_create_routine from './Dashboard_create_routine';

const component = (
    <Provider store={store}>
        <Router>
            <Dashboard_create_routine />
        </Router>
    </Provider>
)
const exercises = [
    {
        "id": 4,
        "name": "Pike Push Ups",
        "img_url": "www.imgurls.com"
    },
    {
        "id": 5,
        "name": "Squats",
        "img_url": "www.imgurl1.com"
    }
]

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('should render the available exercises', async () => {
    vi.spyOn(routine_api, 'get_exercises').mockImplementationOnce(() => {
        return Promise.resolve({
            data: exercises,
            error: false
        })
    });
    render(component)

    const available_exercise1 = await screen.findByText(exercises[0].name)
    const available_exercise2 = await screen.findByText(exercises[1].name)
    expect(available_exercise1).toBeDefined()
    expect(available_exercise2).toBeDefined()
})

test('should render the routine name input', async () => {
    vi.spyOn(routine_api, 'get_exercises').mockImplementationOnce(() => {
        return Promise.resolve({
            data: exercises,
            error: false
        })
    });
    render(component)

    const routine_name = await screen.findByPlaceholderText('name')
    expect(routine_name).toBeDefined()
})

test('should render the routine description input', async () => {
    vi.spyOn(routine_api, 'get_exercises').mockImplementationOnce(() => {
        return Promise.resolve({
            data: exercises,
            error: false
        })
    });
    render(component)

    const routine_description = await screen.findByPlaceholderText('description')
    expect(routine_description).toBeDefined()
})