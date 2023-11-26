import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard_MyRutines from './Dashboard_MyRutines';
import * as routine_api from '../../actions/api/routines'

let component = (
    <Provider store={store}>
        <Router>
            <Dashboard_MyRutines />
        </Router>
    </Provider>
)

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('should render loading alert', async () => {
    vi.spyOn(routine_api, 'user_routines').mockImplementationOnce(() => {
        return Promise.resolve({
            data: [],
            error: false
        })
    })

    render(<Provider store={store}>
        <Router>
            <Dashboard_MyRutines />
        </Router>
    </Provider>)

    expect(screen.getByText('Loading...')).toBeDefined();
});

test('should render no routines alert', async () => {

    vi.spyOn(routine_api, 'user_routines').mockImplementationOnce(() => {
        return Promise.resolve({
            data: [],
            error: false
        })
    });

    render(component)

    const noRoutineAlert = await screen.findAllByText("You don't have any routine yet")
    expect(noRoutineAlert[0]).toBeDefined();
});

test('should render routines', async () => {
    const routines = [{
        "id": 13,
        "time": 14,
        "exercises_number": 2,
        "name": "Push Routine",
        "description": "Only push exercises baby oh yeah",
        "exercise": [
            1,
            4
        ]
    },
    {
        "id": 14,
        "time": 24,
        "exercises_number": 2,
        "name": "Legs and Chest Routine",
        "description": "For improve your legs and  chest",
        "exercise": [
            5,
            1
        ]
    }]
    vi.spyOn(routine_api, 'user_routines').mockImplementationOnce(() => {
        return Promise.resolve({
            data: routines,
            error: false
        })
    });
    render(component)

    const routine1 = await screen.findAllByText("Push Routine")
    const routine2 = await screen.findAllByText("Legs and Chest Routine")
    expect(routine1).toBeDefined();
    expect(routine2).toBeDefined();
});